const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireSignin = passport.authenticate("jwt", { session: false });
const passportService = require("../services/passport");
const _ = require("lodash");

const Planets = require("../models/Planet");

// ===========================================================================

router.post("/create", requireSignin, async (req, res) => {
  console.log(req.body, req.user);
  try {
    const count = await Planets.countDocuments();
    const planetName = `New Planet ${count + 1}`;
    const Planet = await new Planets({
      display_name: planetName,
      author: req.user._id,
      created: new Date(),
    }).save();
    if (Planet) {
      let query = await Planets.findOne({ _id: Planet._id });

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

  const query = Planets.find(buildQuery(criteria))
    .sort({ [sortProperty]: order })
    .skip(offset)
    .limit(limit);

  return Promise.all([
    query,
    Planets.find(buildQuery(criteria)).countDocuments(),
    Planets.find().countDocuments(),
  ]).then((results) => {
    return res.json({
      all: results[0],
      count: results[1],
      offset: offset,
      limit: limit,
      total: results[2],
    });
  });
});

// ===========================================================================

router.post("/delete", async (req, res) => {
  Planets.remove({ _id: req.body.planetId })
    .then((info) => {
      res.json({ success: "true", info: info });
    })
    .catch((err) => {
      res.status(400).send({ error: "true", error: err });
    });
});

// ===========================================================================

router.post("/item", async (req, res) => {
  const query = await Planets.findOne({ _id: req.body.id });

  res.json(query);
});

// ===========================================================================

router.post("/duplicateItem", async (req, res) => {
  try {
    // Retrieve the original item by ID
    const originalItem = await Planets.findOne({ _id: req.body.planetId });

    if (!originalItem) {
      return res.status(404).send("Item not found");
    }

    // Clone the original item and modify its display_name
    const duplicatedItem = new Planets({
      ...originalItem.toObject(), // Convert the Mongoose document to a plain object
      _id: undefined, // Remove the original _id so MongoDB assigns a new one
      display_name: `${originalItem.display_name} Copy`, // Append "Copy" to the display_name
      created: new Date(),
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
    const planetId = req.body._id; // Extract the ID from the request body
    const updateData = req.body; // Entire Planet object received in the request body

    // Ensure that updateData has an _id property
    if (!planetId) {
      return res.status(400).send("No ID provided");
    }

    // Update the Planet object in the database
    const updatedPlanet = await Planets.findByIdAndUpdate(
      planetId,
      updateData,
      { new: true } // Return the updated object
    );

    // If the Planet object is not found
    if (!updatedPlanet) {
      return res.status(404).send("Planet not found");
    }

    // Send back the updated Planet object
    res.json(updatedPlanet);
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
    const currentItem = await Planets.findById(id);
    if (!currentItem) {
      return res.status(404).send("Item not found");
    }

    // Determine the sorting order and condition
    let sortCondition;
    if (order === "1") {
      // Ascending order: find the first item that has a greater sortProperty value
      sortCondition = {
        ...additionalQuery,
        [sortProperty]: { $gt: currentItem[sortProperty] },
      };
    } else {
      // Descending order: find the first item that has a lesser sortProperty value
      sortCondition = {
        ...additionalQuery,
        [sortProperty]: { $lt: currentItem[sortProperty] },
      };
    }

    // Find the next item
    const nextItem = await Planets.findOne(sortCondition)
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
    const currentItem = await Planets.findById(id);
    if (!currentItem) {
      return res.status(404).send("Item not found");
    }

    // Determine the sorting order and condition
    let sortCondition;
    if (order === "1") {
      // Ascending order: find the last item that has a lesser sortProperty value
      sortCondition = {
        ...additionalQuery,
        [sortProperty]: { $lt: currentItem[sortProperty] },
      };
    } else {
      // Descending order: find the last item that has a greater sortProperty value
      sortCondition = {
        ...additionalQuery,
        [sortProperty]: { $gt: currentItem[sortProperty] },
      };
    }

    // Find the previous item
    const previousItem = await Planets.findOne(sortCondition)
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
    const result = await Planets.updateMany(query, updateData);

    res.json({
      success: true,
      modifiedCount: result.nModified,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ===========================================================================

const buildQuery = (criteria) => {
  const query = {};

  if (criteria && criteria.search) {
    _.assign(query, {
      display_name: {
        $regex: criteria.search,
        $options: "i",
      },
    });
  }

  if (criteria && criteria.status) {
    _.assign(query, {
      status: {
        $eq: criteria.status,
      },
    });
  }
  return query;
};

module.exports = router;
