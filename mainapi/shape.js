const express = require("express");
const router = express.Router();
const passport = require('passport');
const requireSignin = passport.authenticate('jwt', { session: false });
const passportService = require('../services/passport');
const _ = require("lodash");

const Shapes = require("../models/Shape");


// ===========================================================================


router.post("/create", requireSignin, async (req, res) => {
    console.log(req.body, req.user)
    try {
        const count = await Shapes.countDocuments();
        const shapeName = req.body.name ? req.body.name : `New Shape ${count + 1}`;
        const Shape = await new Shapes({
            name: shapeName,
            author: req.user._id,
            params: req.body.params,
            algo: req.body.algo,
            created: new Date()
        }).save();
        if (Shape) {
            let query = await Shapes.findOne({ _id: Shape._id })
                .populate("algo")
                .populate('origin', '_id name')

            res.json(query);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});

router.post("/createItemWithData", requireSignin, async (req, res) => {
    console.log(req.body)
    try {
        const Shape = await new Shapes(req.body.data).save();
        if (Shape) {
            let query = await Shapes.findOne({ _id: Shape._id })
                .populate("algo")
                .populate('origin', '_id name')

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

    const query = Shapes.find(buildQuery(criteria))
        .sort({ [sortProperty]: order })
        .populate("algo")
        .populate({
            path: 'track',
            populate: {
                path: 'album'
            }
        })
        .populate('origin', '_id name')
        .skip(offset)
        .limit(limit);

    return Promise.all(
        [
            query,
            Shapes.find(buildQuery(criteria)).countDocuments(),
            Shapes.find().countDocuments()
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
    Shapes.remove({ _id: req.body.shapeId })
        .then(info => {
            res.json({ success: "true", info: info });
        })
        .catch(err => {
            res.status(400).send({ error: "true", error: err });
        });
});


// ===========================================================================


router.post("/item", async (req, res) => {
    const query = await Shapes.findOne({ _id: req.body.id })
        .populate("algo")
        .populate({
            path: 'track',
            populate: {
                path: 'album'
            }
        })
        .populate('origin', '_id name')

    res.json(query);
});

// ===========================================================================


router.post("/duplicateItem", async (req, res) => {
    try {
        // Retrieve the original item by ID
        const originalItem = await Shapes.findOne({ _id: req.body.shapeId })

        if (!originalItem) {
            return res.status(404).send("Item not found");
        }

        // Clone the original item and modify its name
        const duplicatedItem = new Shapes({
            ...originalItem.toObject(),  // Convert the Mongoose document to a plain object
            _id: undefined,  // Remove the original _id so MongoDB assigns a new one
            name: `${originalItem.name} Copy`,  // Append "Copy" to the name
            created: new Date(),
            status: "unreviewed",
            origin: originalItem && originalItem.origin && originalItem.origin._id ? originalItem.origin._id : req.body.shapeId
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
        const shapeId = req.body._id;  // Extract the ID from the request body
        const updateData = req.body;  // Entire Shape object received in the request body

        // Ensure that updateData has an _id property
        if (!shapeId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Shape object in the database
        const updatedShape = await Shapes.findByIdAndUpdate(
            shapeId,
            updateData,
            { new: true }  // Return the updated object
        ).populate("algo").populate('origin', '_id name').populate({
            path: 'track',
            populate: {
                path: 'album'
            }
        });

        // If the Shape object is not found
        if (!updatedShape) {
            return res.status(404).send("Shape not found");
        }

        // Send back the updated Shape object
        res.json(updatedShape);
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
        const currentItem = await Shapes.findById(id);
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
        const nextItem = await Shapes.findOne(sortCondition)
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
        const currentItem = await Shapes.findById(id);
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
        const previousItem = await Shapes.findOne(sortCondition)
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
        const result = await Shapes.updateMany(query, updateData);

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

router.post("/updateTrack", async (req, res) => {
    try {
        const shapeId = req.body.shapeId;  // Extract the ID from the request body
        const track = req.body.trackId;  // Entire Shape object received in the request body

        // Ensure that updateData has an _id property
        if (!shapeId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Shape object in the database
        const updatedShape = await Shapes.findByIdAndUpdate(
            shapeId,
            {
                track: track
            },
            { new: true }  // Return the updated object
        ).populate("algo").populate("track").populate({
            path: 'track',
            populate: {
                path: 'album'
            }
        });

        // If the Shape object is not found
        if (!updatedShape) {
            return res.status(404).send("Shape not found");
        }

        // Send back the updated Shape object
        res.json(updatedShape);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/calculateParamPercentage", async (req, res) => {
    try {
        const { field, value } = req.body; // Extract the field and value from the request body

        // Ensure that field and value are provided
        if (!field) {
            return res.status(400).send("No field provided");
        }

        // Count the total number of shapes
        const totalShapes = await Shapes.countDocuments();

        // Build the query based on field and value
        let query = { status: "approved" }; // Initial condition for status
        if (field.startsWith('params.')) {
            // For nested fields like 'params.math', 'params.colors.length'
            _.set(query, field, value);
        } else {
            // For top-level fields like 'track'
            query[field] = value;
        }

        // Construct the final query using $and
        const finalQuery = { $and: [query] };

        // Count the number of shapes that match the query
        const matchingShapes = await Shapes.countDocuments(finalQuery);

        // Calculate the percentage
        const percentage = totalShapes > 0 ? (matchingShapes / totalShapes) * 100 : 0;

        // Send back the percentage
        res.json({ percentage: percentage.toFixed(2), count: matchingShapes}); // Rounded to two decimal places
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/updateGenesis", async (req, res) => {
    try {
        const shapeId = req.body.shapeId;  // Extract the ID from the request body

        // Ensure that updateData has an _id property
        if (!shapeId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Shape object in the database
        const updatedShape = await Shapes.findByIdAndUpdate(
            shapeId,
            {
                genesis: true
            },
            { new: true }  // Return the updated object
        ).populate("algo").populate("track").populate({
            path: 'track',
            populate: {
                path: 'album'
            }
        });

        // If the Shape object is not found
        if (!updatedShape) {
            return res.status(404).send("Shape not found");
        }

        // Send back the updated Shape object
        res.json(updatedShape);
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

    if (criteria && criteria.iteration) {
        _.assign(query, {
            "iteration": {
                $eq: true,
            }
        });
    } else  {
        _.assign(query, {
            "iteration": {
                $in: [false, null] 
            }
        });
    }

    return query
};

module.exports = router;
