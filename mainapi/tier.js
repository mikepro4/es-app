const express = require("express");
const router = express.Router();
const passport = require('passport');
const requireSignin = passport.authenticate('jwt', { session: false });
const passportService = require('../services/passport');
const _ = require("lodash");
const mongoose = require("mongoose");

const Tiers = require("../models/Tier");
const Shapes = require("../models/Shape");


// ===========================================================================



router.post("/calculatePercentage", async (req, res) => {
    try {
        const tierId = mongoose.Types.ObjectId(req.body.tierId); // Ensure this is a valid ObjectId
        const tierLetter = req.body.tierLetter; // The tier letter to match

        // Aggregate query to find all Shapes with the specific tier and tierLetter
        const matchingShapes = await Shapes.aggregate([
            {
                $match: { status: "approved" }
            },
            {
                $unwind: "$tiers"
            },
            {
                $match: {
                    "tiers.tier": tierId,
                    "tiers.tierLetter": tierLetter
                }
            },
            {
                $group: {
                    _id: null, // Grouping by null to count all documents
                    count: { $sum: 1 } // Count the number of documents
                }
            }
        ]);

        const totalShapes = await Shapes.countDocuments({ status: "approved" });

        // If there are no matching shapes, the aggregation will return an empty array
        const count = matchingShapes.length > 0 ? matchingShapes[0].count : 0;
        const percentage = totalShapes > 0 ? (count / totalShapes) * 100 : 0;

        res.json({ count, percentage: percentage.toFixed(2), total: totalShapes });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



// ===========================================================================


router.post("/create", requireSignin, async (req, res) => {
    console.log(req.body, req.user)
    try {
        const count = await Tiers.countDocuments();
        const tierName = `New Tier ${count + 1}`;
        const Tier = await new Tiers({
            name: tierName,
            author: req.user._id,
            created: new Date()
        }).save();
        if (Tier) {
            let query = await Tiers.findOne({ _id: Tier._id })
                .populate("author")

            res.json(query);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});


// ===========================================================================


router.post("/search", requireSignin, async (req, res) => {
    const { criteria, sortProperty, offset, limit, order } = req.body;

    const query = Tiers.find(buildQuery(criteria))
        .sort({ [sortProperty]: order })
        .skip(offset)
        .limit(limit);

    return Promise.all(
        [
            query,
            Tiers.find(buildQuery(criteria)).countDocuments(),
            Tiers.find().countDocuments()
        ]
    ).then(
        results => {
            return res.json({
                all: results[0],
                count: results[1],
                offset: offset,
                limit: limit,
                total: results[2]
            });
        }
    );
});


// ===========================================================================


router.post("/delete", async (req, res) => {
    Tiers.remove({ _id: req.body.tierId })
        .then(info => {
            res.json({ success: "true", info: info });
        })
        .catch(err => {
            res.status(400).send({ error: "true", error: err });
        });
});


// ===========================================================================


router.post("/item", async (req, res) => {
    const query = await Tiers.findOne({ _id: req.body.id })
        .populate("author")

    res.json(query);
});

// ===========================================================================


router.post("/duplicateItem", async (req, res) => {
    try {
        // Retrieve the original item by ID
        const originalItem = await Tiers.findOne({ _id: req.body.tierId })

        if (!originalItem) {
            return res.status(404).send("Item not found");
        }

        // Clone the original item and modify its name
        const duplicatedItem = new Tiers({
            ...originalItem.toObject(),  // Convert the Mongoose document to a plain object
            _id: undefined,  // Remove the original _id so MongoDB assigns a new one
            name: `${originalItem.name} Copy`,  // Append "Copy" to the name
            created: new Date()
        });

        // Save the duplicated item
        const savedItem = await duplicatedItem.save();

        // Return the saved duplicated item
        res.json(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// ===========================================================================

router.post("/updateItem", async (req, res) => {
    try {
        const tierId = req.body._id;  // Extract the ID from the request body
        const updateData = req.body;  // Entire Tier object received in the request body

        // Ensure that updateData has an _id property
        if (!tierId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Tier object in the database
        const updatedTier = await Tiers.findByIdAndUpdate(
            tierId,
            updateData,
            { new: true }  // Return the updated object
        ).populate("author");

        // If the Tier object is not found
        if (!updatedTier) {
            return res.status(404).send("Tier not found");
        }

        // Send back the updated Tier object
        res.json(updatedTier);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// ===========================================================================

router.post("/nextItem", async (req, res) => {
    try {
        const { id, sortProperty, order, criteria } = req.body;

        // Build the additional query criteria
        const additionalQuery = buildQuery(criteria);

        // Find the current item
        const currentItem = await Tiers.findById(id);
        if (!currentItem) {
            return res.status(404).send("Item not found");
        }

        // Determine the sorting order and condition
        let sortCondition;
        if(order === "1") {
            // Ascending order: find the first item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the first item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        }

        // Find the next item
        const nextItem = await Tiers.findOne(sortCondition)
            .sort({ [sortProperty]: order })
            .exec();

        if (!nextItem) {
            return res.status(404).send("Next item not found");
        }

        res.json(nextItem);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// ===========================================================================

router.post("/previousItem", async (req, res) => {
    try {
        const { id, sortProperty, order, criteria } = req.body;

        // Build the additional query criteria
        const additionalQuery = buildQuery(criteria);

        // Find the current item
        const currentItem = await Tiers.findById(id);
        if (!currentItem) {
            return res.status(404).send("Item not found");
        }

        // Determine the sorting order and condition
        let sortCondition;
        if(order === "1") {
            // Ascending order: find the last item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the last item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        }

        // Find the previous item
        const previousItem = await Tiers.findOne(sortCondition)
            .sort({ [sortProperty]: order === "1" ? -1 : 1 }) // Invert the sorting order
            .exec();

        if (!previousItem) {
            return res.status(404).send("Previous item not found");
        }

        res.json(previousItem);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/updateMany", requireSignin, async (req, res) => {
    const { criteria, updateData } = req.body;

    try {
        // Build the query based on criteria
        const query = buildQuery(criteria);

        // Update multiple documents that match the query
        const result = await Tiers.updateMany(query, updateData);

        res.json({
            success: true,
            modifiedCount: result.nModified
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// ===========================================================================


const buildQuery = criteria => {
    const query = {};

    if (criteria && criteria.search) {
        _.assign(query, {
            name: {
                $regex: criteria.search,
                $options: 'i'
            }
        });
    }

    if (criteria && criteria.status) {
        _.assign(query, {
            "status": {
                $eq: criteria.status,
            }
        });
    }
    return query
};

module.exports = router;
