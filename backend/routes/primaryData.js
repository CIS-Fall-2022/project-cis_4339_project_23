const express = require("express"); 
const { Types, default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router(); 

//importing data model schemas
let { primarydata, orgdata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( 
        {orgID: process.env.ORG}, //requires organization id in data
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        { _id: req.params.id, orgID: process.env.ORG },  //requires organization id in data
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id, orgID: process.env.ORG }, //requires organization id in data
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST create client
router.post("/", (req, res, next) => { 
    req.body.orgID = process.env.ORG //requires organization id in data
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else if (data.length == null) {
                res.send('The client was not added.').status(404); //error handling: no client added bc no data given
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id, orgID: process.env.ORG }, //requires organization id in data
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//DELETE a client
router.delete("/delete/:id", (req, res, next) => { 
    primarydata.findOneAndDelete( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
        
});

router.get("/info", (req, res, next) => { 
     orgdata.aggregate([
        { $match:{
             _id:  ObjectId(process.env.ORG)
            },
        }
        ], //requires organization id in data
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});
module.exports = router;