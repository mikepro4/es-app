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
        [query, Tests.find(buildQuery(criteria)).countDocuments()]
    ).then(
        results => {
            return res.json({
                all: results[0],
                count: results[1],
                offset: offset,
                limit: limit
            });
        }
    );
});


// ===========================================================================


const buildQuery = criteria => {
    const query = {};

    if (criteria && criteria.name) {
        _.assign(query, {
            name: {
                $regex: criteria.name,
                $options: 'i'
            }
        });
    }
    return query
};

module.exports = router;
