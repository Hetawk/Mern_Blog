const router = require("express").Router();

const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcrypt");
// const e = require("express");

// Update
// update using user id
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                    // update everywhere
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json({
            error_msg: "You can update only your account!",
        });
    }
});

// Delete

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try { // delete user content
            const user = await User.findById(req.params.id);

            try {
                // delete a particular post
                await Post.deleteMany({ username: user.username });
                // delete user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json({
                status_msg: "User not found!"
            });
        }

    } else {
        res.status(401).json({
            error_msg: "You can delete only your account!",
        });
    }
});

// Get User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // preventing the sending of password
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        // console.log(err)
        return res.status(500).json(err);
    }
});
module.exports = router;
