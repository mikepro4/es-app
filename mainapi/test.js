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
    return query
};

module.exports = router;
