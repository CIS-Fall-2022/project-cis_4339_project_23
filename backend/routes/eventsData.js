const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find(
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
    eventdata.find({ _id: req.params.id, orgID: process.env.ORG }, //requires organization id in data
        (error, data) => { 
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find(
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

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
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

//POST create event
router.post("/", (req, res, next) => {
    req.body.orgID = process.env.ORG //requires organization id in data
    eventdata.create( 
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

//DELETE
router.delete("/delete/:id", (req, res, next) => {
    eventdata.findOneAndDelete(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                return res.json(error);
            }
        }
    );
});

//PUT update client
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id, orgID: process.env.ORG },
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

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed up
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee, orgID: process.env.ORG }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
});

//endpoint that creates Event Document with how many attendees that signed up for each individual event in last 2 months
router.get('/eventSignUp', (req, res, next) => {

    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 2);
    let enddate = new Date();
    console
    
    eventdata.aggregate([
        { $project : { _id : 0, eventName : 1, date : 1, numberofattendees : {$size: '$attendees' }}},
        { $match : {
            date: {
                '$gte': startdate,
                '$lt': enddate
            },
        } },
    ], (error, data) => {
        if (error) {
          return next(error)
        } else if (data.length == null) {
            res.send('There are no events in the past 2 months.').status(404); //error handling: not events within the last 2 months
        } else {
          res.json(data);
        }
    });
  });

module.exports = router;