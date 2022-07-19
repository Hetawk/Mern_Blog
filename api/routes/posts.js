const router = require("express").Router();

const User = require("../models/User");
const Post = require("../models/Post");

// const e = require("express");

// Create New Post
// update using user id
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Update Post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, 
                    {
                    $set: req.body,
                }, {
                    new: true
                });
                return res.status(200).json(updatedPost);
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(401).json({
                status_msg: "You can update only your post!"
            })
        }

    } catch (err) {
        return res.status(500).json(err);
    }
});
//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          return res.status(200).json("Post has been deleted...");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

// Get Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        // console.log(err)
        return res.status(500).json(err)
    }
});

// GET ALL POST for user
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if (username) {
            // if username is given, find all by username
            posts = await Post.find({ username })
        } else if (catName) {
            // if category is given, find all by category
            posts = await Post.find({
                catgories: {
                    $in: [catName],
                },
            });
        } else {
            // find all post
            posts = await Post.find();
        }
        // console.log(posts);
        return res.status(200).json(posts);
    } catch (err) {
        // console.log(err)
        return res.status(500).json(err)
    }
});

module.exports = router;
