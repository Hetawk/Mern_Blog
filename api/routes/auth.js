const router = require("express").Router();

const User = require("../models/User");
// encrypting password
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    try {
        // bcrypt
        const salt = await bcrypt.genSalt(10);
        // hashing password
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // take a particular request from user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        // console.log(`${req.body.username} , your account created successfully`);

        // save the info as
        const user = await newUser.save();
        // when successful
        const textO = "Congratulations ";
        const textT = ", yoour account has been created successfully.";
        res.status(200)
            .json(
                textO + user + textT
            );
    

    } catch (err) {
        res.status(500).json(err);
    }
});


// Login 
// still need to do some work on returning res cuz its' not working as expected
router.post("/login", async (req, res) => {
    try {
        // checking for username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            // if username does not exist
            // !user && res.status(400).json("Wrong credentials!")
            // if username does not exist
            return res.status(400).json({ // Worked
                error_msg: "Wrong credentials!",
              });
        }
        // check and compare user password
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            // if not validated
            // !validated && res.status(400).json("Wrong credentials!")
            return res.status(400).json({ // Worked
                error_msg: "Wrong credentials!",
              });
        }
        // prevent password from displaying
        const { password, ...others} = user._doc;
        // if all is ok
        return res.status(200).json(others);
        // return;

    } catch (err) {
        res.status(500).json(err);
        // res.sendStatus(500);
        // console.log(e);
        // return;
    }
});

module.exports = router;