const express = require("express");
const router = express.Router();
const passport = require('passport');
const requireSignin = passport.authenticate('jwt', { session: false });
const passportService = require('../services/passport');
const _ = require("lodash");

const Tracks = require("../models/Track");


// ===========================================================================


router.post("/create", requireSignin, async (req, res) => {
    console.log(req.body, req.user)
    try {
        const count = await Tracks.countDocuments();
        const trackName = `New Track ${count + 1}`;
        const Track = await new Tracks({
            name: req.body.name,
            author: req.user._id,
            album: req.body.album ? req.body.album : null,
            songLink: req.body.songLink ? req.body.songLink : null,
            created: new Date()
        }).save();
        if (Track) {
            let query = await Tracks.findOne({ _id: Track._id })
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

    const query = Tracks.find(buildQuery(criteria))
        .sort({ [sortProperty]: order })
        .populate("album")
        .populate("hardware")
        .skip(offset)
        .limit(limit);

    return Promise.all(
        [
            query,
            Tracks.find(buildQuery(criteria)).countDocuments(),
            Tracks.find().countDocuments()
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
    Tracks.remove({ _id: req.body.trackId })
        .then(info => {
            res.json({ success: "true", info: info });
        })
        .catch(err => {
            res.status(400).send({ error: "true", error: err });
        });
});


// ===========================================================================


router.post("/item", async (req, res) => {
    const query = await Tracks.findOne({ _id: req.body.id })
        .populate("author")
        .populate("album")
        .populate("hardware")

    res.json(query);
});

// ===========================================================================


router.post("/duplicateItem", async (req, res) => {
    try {
        // Retrieve the original item by ID
        const originalItem = await Tracks.findOne({ _id: req.body.trackId })

        if (!originalItem) {
            return res.status(404).send("Item not found");
        }

        // Clone the original item and modify its name
        const duplicatedItem = new Tracks({
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
        const trackId = req.body._id;  // Extract the ID from the request body
        const updateData = req.body;  // Entire Track object received in the request body

        // Ensure that updateData has an _id property
        if (!trackId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Track object in the database
        const updatedTrack = await Tracks.findByIdAndUpdate(
            trackId,
            updateData,
            { new: true }  // Return the updated object
        ).populate("author");

        // If the Track object is not found
        if (!updatedTrack) {
            return res.status(404).send("Track not found");
        }

        // Send back the updated Track object
        res.json(updatedTrack);
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
        const currentItem = await Tracks.findById(id);
        if (!currentItem) {
            return res.status(404).send("Item not found");
        }

        // Determine the sorting order and condition
        let sortCondition;
        if (order === "1") {
            // Ascending order: find the first item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the first item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        }

        // Find the next item
        const nextItem = await Tracks.findOne(sortCondition)
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
        const currentItem = await Tracks.findById(id);
        if (!currentItem) {
            return res.status(404).send("Item not found");
        }

        // Determine the sorting order and condition
        let sortCondition;
        if (order === "1") {
            // Ascending order: find the last item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the last item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        }

        // Find the previous item
        const previousItem = await Tracks.findOne(sortCondition)
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
        const result = await Tracks.updateMany(query, updateData);

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



router.post('/createMany', requireSignin, async (req, res) => {
    try {
        const trackData = req.body; // Expecting an object with key-value pairs

        // Transform and format the data
        const tracksToCreate = Object.entries(trackData).map(([key, value]) => {
            // Replace underscores with spaces in the key to get the name
            const name = key.replace(/_/g, ' ');

            return { name, songLink: value };
        });

        // Insert the formatted data into the database
        const createdTracks = await Tracks.insertMany(tracksToCreate);

        res.json({
            success: true,
            createdTracks
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/updateDuration", async (req, res) => {
    try {
        const trackId = req.body.trackId;
        const duration = req.body.duration; 

        // Ensure that updateData has an _id property
        if (!trackId) {
            return res.status(400).send("No ID provided");
        }

        // Update the Shape object in the database
        const updatedTrack = await Tracks.findByIdAndUpdate(
            trackId,
            {
                duration: duration
            },
            { new: true }  // Return the updated object
        ).populate("album").populate("hardware");

        // If the Shape object is not found
        if (!updatedTrack) {
            return res.status(404).send("Shape not found");
        }

        // Send back the updated Shape object
        res.json(updatedTrack);
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

    if (criteria && criteria.album) {
        _.assign(query, {
            "album": {
                $eq: criteria.album,
            }
        });
    }

    if (criteria && criteria.hardware) {
        _.assign(query, {
            "hardware": {
                $in: criteria.hardware,
            }
        });
    }

    return query
};

module.exports = router;
