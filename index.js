require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Character = require("./models/Character");

const app = express();
const port = process.env.PORT || 3000

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://kiyang:kiyang123@cluster0.aizy98y.mongodb.net/?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Routes

app.get("/", async (req, res, next) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

app.get("/:name", async (req, res, next) => {
  try {
    const character = await Character.findOne({ name: req.params.name });
    if (!character) {
      return res.status(404).send("No character found with that name");
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.json(newCharacter);
  } catch (err) {
    next(err);
  }
});

app.put("/:name", async (req, res, next) => {
  try {
    const updatedCharacter = await Character.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!updatedCharacter) {
      return res
        .status(404)
        .send("No character found with that name to update");
    }
    res.json(updatedCharacter);
  } catch (err) {
    next(err);
  }
});

app.delete("/:name", async (req, res, next) => {
  try {
    const deletedCharacter = await Character.findOneAndDelete({
      name: req.params.name,
    });
    if (!deletedCharacter) {
      return res
        .status(404)
        .send("No character found with that name to delete");
    }
    res.json(deletedCharacter);
  } catch (err) {
    next(err);
  }
});

//Connect to the database before listening
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})