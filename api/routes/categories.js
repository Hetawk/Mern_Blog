const router = require("express").Router();
const Category = require("../models/Category");

// create category
router.post("/", async (req, res) =>{
    const newCat = new Category(req.body);
    try{
        const saveCat = await newCat.save();
        return res.status(200).json(saveCat);
    }catch(err){
        return res.status(500).json(err);
    }
});

// find all categories
router.get("/", async (req, res) =>{
    try{
        const cats = await Category.find();
        return res.status(200).json(cats);
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports = router;