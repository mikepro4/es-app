const express = require("express");
const router = express.Router();
const passport = require('passport');
const Authentication = require('../controllers/authentication');

// Auth
const requireSignin = passport.authenticate('jwt', { session: false });

router.post("/signin", passport.authenticate('local', { session: false }), Authentication.signin);
router.post("/signup", Authentication.signup);

router.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/user_details", requireSignin, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
