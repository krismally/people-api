// dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// database connection
mongoose.connect(MONGODB_URL);

// mongo status listeners
mongoose.connection
.on("connected", () => console.log("connected to mongoDB"))
.on("error", (err) => console.log(`error with mongoDB: ${err.message}`))

// model
const peopleSchema = mongoose.Schema({
    name: String,
    image: String,
    title: String
}, { timestamps: true });

const People = mongoose.model("People", peopleSchema)

// mount middleware
app.use(cors()); // access-control-allow: "*"
app.use(morgan('dev'));
app.use(express.json()) // creates req.body

// mount routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

// I
app.get("/people", async (req, res) => {
    try {
        const people = await People.find({});
        res.json(people);
    } catch (error) {
        console.log("error: ", error);
        res.send({error: "something went wrong - check console"})
    }
})

// N

// D
app.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});


// U
app.put("/people/:id", async (req, res) => {
    try {
        res.json(await People.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ));
    } catch (error) {
        console.log("error: ", error);
        res.send({error: "something went wrong - check console"})
    }
})

// C
app.post("/people", async (req, res) => {
    try {
        const person = await People.create(req.body);
        res.json(person);
    } catch (error) {
        console.log("error: ", error);
        res.send({error: "something went wrong - check console"})       
    }
})

// E

// S

// listener
app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
})