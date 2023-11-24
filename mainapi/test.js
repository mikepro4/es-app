const express = require("express");
const router = express.Router();
const passport = require('passport');
const requireSignin = passport.authenticate('jwt', { session: false });
const passportService = require('../services/passport');
const _ = require("lodash");

const Tests = require("../models/Test");


// ===========================================================================


router.post("/create", requireSignin, async (req, res) => {
    console.log(req.body, req.user)
    try {
        const count = await Tests.countDocuments();
        const testName = `New Test ${count + 1}`;
        const Test = await new Tests({
            name: testName,
            author: req.user._id,
            created: new Date()
        }).save();
        if (Test) {
            let query = await Tests.findOne({ _id: Test._id })
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

    const query = Tests.find(buildQuery(criteria))
        .sort({ [sortProperty]: order })
        .skip(offset)
        .limit(limit);

    return Promise.all(
        [
            query,
            Tests.find(buildQuery(criteria)).countDocuments(),
            Tests.find().countDocuments()
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
    Tests.remove({ _id: req.body.testId })
        .then(info => {
            res.json({ success: "true", info: info });
        })
        .catch(err => {
            res.status(400).send({ error: "true", error: err });
        });
});


// ===========================================================================


router.post("/item", async (req, res) => {
    const query = await Tests.findOne({ _id: req.body.testId })
        .populate("author")

    res.json(query);
});

// ===========================================================================


router.post("/duplicateItem", async (req, res) => {
    try {
        // Retrieve the original item by ID
        const originalItem = await Tests.findOne({ _id: req.body.testId })

        if (!originalItem) {
            return res.status(404).send("Item not found");
        }

        // Clone the original item and modify its name
        const duplicatedItem = new Tests({
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
        const testId = req.body._id;  // Extract the ID from the request body
        const updateData = req.body;  // Entire Test object received in the request body

        // Ensure that updateData has an _id property
        if (!testId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Test object in the database
        const updatedTest = await Tests.findByIdAndUpdate(
            testId,
            updateData,
            { new: true }  // Return the updated object
        ).populate("author");

        // If the Test object is not found
        if (!updatedTest) {
            return res.status(404).send("Test not found");
        }

        // Send back the updated Test object
        res.json(updatedTest);
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
