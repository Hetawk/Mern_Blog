// initialization of express server
const express = require("express");
const app = express();
// Mongoose and env
const mongoose = require("mongoose");
const dotenv = require("dotenv");
/* authentitcating users by creating, deleting, updating, searching their content 
like creating new category and searching for them, creating user or post, deleting
or serching for them and so on*/
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
// import image library
const multer = require("multer");
// to gain access with cors and request
// const request = require("request")
const cors = require("cors")
// path
const path = require("path")

//initializing proxy
const { createProxyMiddleware } = require('http-proxy-middleware');
// const { createProxyMiddleware, Filter, Options, RequestHandler } = require('http-proxy-middleware');




// test is whether nodemon is working
// console.log("hi, i am listening for changes")

// // try application in browser with request and response
// app.use("/", (req,res)=>{
//     // note that it is not a good practice to use this operation in indext.js, always create another files for that
//     console.log("hey, this is main url");
// })


// using env file
dotenv.config();
// to use json
app.use(express.json());



// images
const storage = multer.diskStorage({
    // set storage destination
    destination: (req, file, cb) => {
        cb(null, "img");
    }, filename: (req, file, cb) => {
        // sent file name to react app
        // image to be uploaded
        cb(null, req.body.name);
        // image to be uploaded
        // cb(null, "image.jpg");

    },
});
// uploading file
const upload = multer({ storage: storage });

// give permission
app.post("/api/upload", upload.single("file"), (req, res) => {
    return res.status(200).json("File has been uploaded");
});
// making image folder public => PF = public folder
app.use("/img", express.static(path.join(__dirname, "img")));




// to give access to the frontend
const corsOptions = process.env.corsOptions || {
    origin: 'http://127.0.0.1:7000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use(cors()) and request
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:7000/api/');
//     next();
//   });
// app.get('/api/', (req, res) => {
//     res.status(500).json();
//   });
// app.use(cors())

// connect to mongoose using the url from env
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL, {
    // useFindAndModify: false, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,

}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!')
});

//  auth
app.use("/api/auth", authRoute)
// user
app.use("/api/users", userRoute)
// post
app.use("/api/posts", postRoute)
// categories
app.use("/api/categories", categoryRoute)

if (process.env.NODE_ENV === "production") {
    // app.use(express.static("/build"));
    app.use(express.static("/build"));
    app.get("*", (req, res) => {
        // res.sendFile(path.join(__dirname, "/", "build", "index.html")); //related path
        res.sendFile(path.join(__dirname, "/", "build", "index.html")); //related path
    });
}

// //proxy
app.use(createProxyMiddleware({ 
    // pathFilter: '/api', 
    target: "http://localhost:7000/api"
}));

//proxy
// module.exports = function (app) {
    // app.use(
    //     // '/api',
    //     createProxyMiddleware('/api', {
    //         target: 'http://localhost:7000/api',
    //         changeOrigin: true,
    //         pathFilter: '/api',
    //         headers: {
    //             "Connection": "keep-alive"
    //         },
    //     })
    // );
// };

// const apiProxy = createProxyMiddleware({
//     target: 'http://localhost:7000/api',
//     changeOrigin: true,
//   });
//   app.use('/api', apiProxy);


// set port number so that the server to connect to
app.listen("7000", () => {
    console.log("EKD blog backend is running...");
});



