const express = require("express");
const router = express.Router();
const passport = require('passport');
const requireSignin = passport.authenticate('jwt', { session: false });
const passportService = require('../services/passport');
const _ = require("lodash");
const mongoose = require("mongoose");

const Shapes = require("../models/Shape");
const Track = require("../models/Track"); 


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

    // Start building the aggregation pipeline
    const aggregationPipeline = [];
    const retrievalPipeline = [];


    // Add the initial match stage
    retrievalPipeline.push({
        $match: buildQuery(criteria)
    });

    // Look up 'algo' and 'origin' as they were populated before
    // Replace 'algorithms' and 'origins' with actual collection names if different
    // retrievalPipeline.push({
    //     $lookup: {
    //         from: 'algos', // replace with the actual collection name for 'algo'
    //         localField: 'algo',
    //         foreignField: '_id',
    //         as: 'algo'
    //     }
    // });

    // retrievalPipeline.push({
    //     $lookup: {
    //         from: 'shapes', // replace with the actual collection name for 'origin'
    //         localField: 'origin',
    //         foreignField: '_id',
    //         as: 'origin'
    //     }
    // });

    // Unwind 'algo' and 'origin' if they are always single documents
    // retrievalPipeline.push({ $unwind: { path: '$algo', preserveNullAndEmptyArrays: true } });
    // retrievalPipeline.push({ $unwind: { path: '$origin', preserveNullAndEmptyArrays: true } });

    // Look up 'track' and its nested fields
    if(criteria?.hardware || criteria?.album ) {
    retrievalPipeline.push({
        $lookup: {
            from: "tracks", // replace with your actual tracks collection name
            localField: "track",
            foreignField: "_id",
            as: "track"
        }
    });
    retrievalPipeline.push({ $unwind: { path: "$track", preserveNullAndEmptyArrays: true } });

    retrievalPipeline.push({
        $lookup: {
            from: "albums", // replace with actual collection name for 'album'
            localField: "track.album",
            foreignField: "_id",
            as: "track.album"
        }
    });
    retrievalPipeline.push({ $unwind: { path: "$track.album", preserveNullAndEmptyArrays: true } });
    retrievalPipeline.push({
        $lookup: {
            from: "hardwares", // replace with actual collection name for 'hardware'
            localField: "track.hardware",
            foreignField: "_id",
            as: "track.hardware"
        }
    });
}

    // retrievalPipeline.push(
    //     {
    //         $lookup: {
    //             from: 'tiers', // The name of the collection where the tier documents are stored
    //             localField: 'tiers.tier', // The field that contains the reference ID
    //             foreignField: '_id', // The _id field in the referenced collection
    //             as: 'tiersPopulated' // The array where the joined documents will be placed
    //         }
    //     },
    // )

    // retrievalPipeline.push(
    //     {
    //         $set: {
    //             'origin': {
    //                 _id: '$origin._id',
    //                 name: '$origin.name'
    //             },
    //             tiers: {
    //                 $map: {
    //                     input: '$tiers',
    //                     as: 'tierItem',
    //                     in: {
    //                         tier: {
    //                             $arrayElemAt: [
    //                                 {
    //                                     $filter: {
    //                                         input: '$tiersPopulated',
    //                                         as: 'populatedTier',
    //                                         cond: { $eq: ['$$populatedTier._id', '$$tierItem.tier'] }
    //                                     }
    //                                 },
    //                                 0
    //                             ]
    //                         },
    //                         tierLetter: '$$tierItem.tierLetter'
    //                     }
    //                 }
    //             }
    //         }
    //     },
    // )

    // Additional match for album criteria if specified
    if (criteria && criteria.album) {
        retrievalPipeline.push({
            $match: {
                "track.album._id": mongoose.Types.ObjectId(criteria.album)
            }
        });
    }

    if (criteria && criteria.hardware) {
        retrievalPipeline.push({
            $match: {
                "track.hardware": { $elemMatch: { _id: mongoose.Types.ObjectId(criteria.hardware) } }
            }
        });
    }

    if (criteria && criteria.tierId && criteria.tierLetter) {
        retrievalPipeline.push({
            $match: {
                "tiers": {
                    $elemMatch: {
                        "tier": mongoose.Types.ObjectId(criteria.tierId),
                        "tierLetter": criteria.tierLetter
                    }
                }
            }
        });
    }


    // Add sorting, skipping, and limiting
    let sortObj = {};
    sortObj[sortProperty] = Number(order);
    retrievalPipeline.push({ $sort: sortObj });
    retrievalPipeline.push({ $skip: offset });
    retrievalPipeline.push({ $limit: limit });

    // Clone the retrieval pipeline for counting and modify it
    const countPipeline = retrievalPipeline.slice(); // Clone the retrieval pipeline

    // Remove sorting, skipping, and limiting stages from the counting pipeline
    countPipeline.splice(countPipeline.findIndex(stage => stage.$sort), 1);
    countPipeline.splice(countPipeline.findIndex(stage => stage.$skip), 1);
    countPipeline.splice(countPipeline.findIndex(stage => stage.$limit), 1);

    // Add the count stage
    countPipeline.push({ $count: "total" });
    
    try {
        // Execute the retrieval pipeline
        const shapes = await Shapes.aggregate(retrievalPipeline).exec();

        // Execute the counting pipeline
        const countResults = await Shapes.aggregate(countPipeline).exec();
        const totalCount = countResults.length > 0 ? countResults[0].total : 0;

        const totalShapes = await Shapes.countDocuments(); // Corrected this line



        return res.json({
            all: shapes,
            count: totalCount,
            offset: offset,
            limit: limit,
            total: totalShapes // or use another count if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// router.post("/search", requireSignin, async (req, res) => {
//     const { criteria, sortProperty, offset, limit, order } = req.body;

//     const query = Shapes.find(buildQuery(criteria))
//         .sort({ [sortProperty]: order })
//         .populate("algo")
//         .populate({
//             path: 'track',
//             populate: [
//                 {
//                     path: 'album'
//                 },
//                 {
//                     path: 'hardware' // populate 'hardware' within each 'track'
//                 }
//             ]
//         })
//         .populate('origin', '_id name')
//         .skip(offset)
//         .limit(limit);

//     return Promise.all(
//         [
//             query,
//             Shapes.find(buildQuery(criteria)).countDocuments(),
//             Shapes.find().countDocuments()
//         ]
//     ).then(
//         results => {
//             return res.json({
//                 all: results[0],
//                 count: results[1],
//                 offset: offset,
//                 limit: limit,
//                 total: results[2]
//             });
//         }
//     );
// });


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
        ).populate("tiers.tier").populate('origin', '_id name')
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

router.post("/updateStatus", async (req, res) => {
    try {
        const shapeId = req.body.shapeId; // Extract the ID from the request body
        const status = req.body.status; // Extract the status from the request body

        // Ensure that the shape ID and new status are provided
        if (!shapeId || !status) {
            return res.status(400).send("Shape ID and new status must be provided");
        }

        // Update the status of the Shape object in the database
        const updatedShape = await Shapes.findByIdAndUpdate(
            shapeId,
            { status: status }, // Update only the status field
            { new: true } // Return the updated object
        ).populate("tiers.tier").populate('origin', '_id name')

        // If the Shape object is not found or not updated
        if (!updatedShape) {
            return res.status(404).send("Shape not found or update failed");
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
        if (order === "1") {
            // Ascending order: find the first item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the first item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        }

        // Find the next item
        const nextItem = await Shapes.findOne(sortCondition)
            .populate("tiers.tier")
            .populate('origin', '_id name')
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
        if (order === "1") {
            // Ascending order: find the last item that has a lesser sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $lt: currentItem[sortProperty] } };
        } else {
            // Descending order: find the last item that has a greater sortProperty value
            sortCondition = { ...additionalQuery, [sortProperty]: { $gt: currentItem[sortProperty] } };
        }

        // Find the previous item
        const previousItem = await Shapes.findOne(sortCondition)
            .populate("tiers.tier")
            .populate('origin', '_id name')
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

router.post("/updateProperty", requireSignin, async (req, res) => {

    try {
        const shapeId = req.body.shapeId; // Extract the ID from the request body

        // Ensure that the shape ID and new status are provided
        if (!shapeId) {
            return res.status(400).send("Shape ID and new status must be provided");
        }

        // Update the status of the Shape object in the database
        const updatedShape = await Shapes.findByIdAndUpdate(
            shapeId,
            { [req.body.updateProperty]: req.body.value }, // Update only the status field
            { new: true } // Return the updated object
        ).populate("tiers.tier").populate('origin', '_id name');

        // If the Shape object is not found or not updated
        if (!updatedShape) {
            return res.status(404).send("Shape not found or update failed");
        }

        // Send back the updated Shape object
        res.json(updatedShape);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

    // assign track to iterations
    // try {
    //     // Build the query based on criteria (e.g., {iteration: true})
    //     const query = buildQuery(req.body.criteria);

    //     // Fetch shapes matching the query
    //     const shapes = await Shapes.find(query);

    //     // Loop through each shape
    //     for (const shape of shapes) {
    //         if (shape && shape.origin) {
    //             // Fetch the origin shape
    //             const originShape = await Shapes.findById(shape.origin);

    //             if (originShape && originShape.track) {
    //                 // Update the original shape with the track ID of its origin
    //                 await Shapes.findByIdAndUpdate(shape._id, { track: originShape.track });
    //             }
    //         }
    //     }

    //     res.json({ success: true, message: "Tracks from origin shapes assigned successfully." });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Server Error");
    // }

    // assign track to 660

    // assign track to 660 
    // try {
    //     const query = buildQuery(req.body.criteria);
    //     // Fetch all tracks
    //     const tracks = await Track.find({}).sort({ name: 1 }); // Sort by _id or another field if preferred

    //     // Fetch all shapes
    //     const shapes = await Shapes.find(query).sort({ name: 1 }); // Sort by _id or another field if preferred

    //     // Loop through shapes and assign tracks
    //     for (let i = 0; i < shapes.length; i++) {
    //         // Calculate track index (cycling through the tracks)
    //         const trackIndex = i % tracks.length;

    //         // Update the shape with the corresponding track
    //         await Shapes.findByIdAndUpdate(shapes[i]._id, { track: tracks[trackIndex]._id });
    //     }

    //     res.json({ success: true, message: "Tracks assigned to shapes successfully." });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Server Error");
    // }
    // assign track to 660

    //
    // const { criteria, updateProperty, value } = req.body;

    // // Validate input
    // if (!updateProperty || value === undefined) {
    //     return res.status(400).send("Update property and value must be provided");
    // }

    // // Build the update object dynamically
    // const update = { [updateProperty]: value };
    // // const update = { $unset: { [updateProperty]: "" } };

    // try {
    //     // Build the query based on criteria
    //     const query = buildQuery(criteria);

    //     // Update multiple documents that match the query
    //     const result = await Shapes.updateMany(query, update);

    //     res.json({
    //         success: true,
    //         modifiedCount: result.nModified
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Server Error");
    // }
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
        ).populate("tiers.tier").populate("track")

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
        const totalShapes = await Shapes.countDocuments({ status: "approved" });

        // Build the query based on field and value
        let query = { status: "approved" }; // Initial condition for status

        if (field.startsWith('params.')) {
            // For nested fields like 'params.math', 'params.colors.length'
            _.set(query, field, value);
        } else {
            // For top-level fields like 'track'
            query[field] = value;
        }

        const trackId = mongoose.Types.ObjectId(value);

        // Construct the final query using $and
        const finalQuery = {
            $and: [{
                status: "approved",
                track: trackId
            }]
        };

        // Count the number of shapes that match the query
        const matchingShapes = await Shapes.countDocuments(finalQuery);

        // Calculate the percentage
        const percentage = totalShapes > 0 ? (matchingShapes / totalShapes) * 100 : 0;

        // Send back the percentage
        res.json({ percentage: percentage.toFixed(2), count: matchingShapes }); // Rounded to two decimal places
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
        ).populate("tiers.tier").populate("track")

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

router.post("/assignIterationCounts", requireSignin, async (req, res) => {
    try {
        // Fetch all shapes
        const shapes = await Shapes.find({
            genesis: true,
            status: "approved"
        });

        for (const shape of shapes) {
            console.log(shape._id)
            // Count shapes with iteration: true, origin: current shape's ID, and status: "unverified"
            const iterationsUnverified = await Shapes.countDocuments({
                iteration: true,
                origin: shape._id,
                status: "unreviewed"
            });

            // Count shapes with iteration: true, origin: current shape's ID, and status: "approved"
            const iterationsVerified = await Shapes.countDocuments({
                iteration: true,
                origin: shape._id,
                status: "approved"
            });

            const iterationsRejected= await Shapes.countDocuments({
                iteration: true,
                origin: shape._id,
                status: "rejected"
            });

            // Update the current shape with new attributes
            await Shapes.findByIdAndUpdate(shape._id, {
                iterationsUnverified: Number(iterationsUnverified),
                iterationsVerified: Number(iterationsVerified),
                iterationsRejected: Number(iterationsRejected)
            });
        }

        res.json({ success: true, message: "Iteration counts assigned to all shapes successfully." });
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
    } else {
        _.assign(query, {
            "iteration": {
                $in: [false, null]
            }
        });
    }

    if (criteria && criteria.track) {
        const trackId = mongoose.Types.ObjectId(criteria.track);
        _.assign(query, {
            "track": {
                $eq: trackId
            },
            "iteration": {
                $in: [true, false, null]
            }
        });
    }

    if (criteria && criteria.album) {
        _.assign(query, {
            "iteration": {
                $in: [true, false, null]
            }
        });
    }

    if (criteria && criteria.hardware) {
        _.assign(query, {
            "iteration": {
                $in: [true, false, null]
            }
        });
    }

    if (criteria && criteria.genesis) {
        _.assign(query, {
            "genesis": {
                $eq: true
            }
        });
    }

    return query
};

module.exports = router;
