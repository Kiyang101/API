require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const Character = require("./models/Character");
const Boss = require("./models/Boss");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Routes
const blockedIPs = [];
app.use((req, res, next) => {
  if (blockedIPs.includes(req.ip)) {
    res.status(403).send("Access denied!");
  } else {
    next();
  }
});

app.get("/characters", async (req, res, next) => {
  try {
    console.log("Request from IP:", req.ip);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Referer:", req.headers.referer);
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

app.get("/bosses", async (req, res, next) => {
  try {
    console.log("Request from IP:", req.ip);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Referer:", req.headers.referer);
    const boss = await Boss.find();
    res.json(boss);
  } catch (err) {
    next(err);
  }
});

app.get("/cfind/:name", async (req, res, next) => {
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

app.get("/bfind/:name", async (req, res, next) => {
  try {
    const boss = await Boss.findOne({ name: req.params.name });
    if (!boss) {
      return res.status(404).send("No boss found with that name");
    }
    res.json(boss);
  } catch (err) {
    next(err);
  }
});

app.post("/cpost", async (req, res, next) => {
  try {
    console.log("Received data : ", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }
    const newCharacter = await Character.create(req.body);
    res.json(newCharacter);
  } catch (err) {
    next(err);
  }
});

app.post("/bpost", async (req, res, next) => {
  try {
    console.log("Received data : ", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }
    const newBoss = await Boss.create(req.body);
    res.json(newBoss);
  } catch (err) {
    next(err);
  }
});

app.put("/cupdate/:name", async (req, res, next) => {
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

app.put("/bupdate/:name", async (req, res, next) => {
  try {
    const updatedBoss = await Boss.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!updatedBoss) {
      return res.status(404).send("No Boss found with that name to update");
    }
    res.json(updatedBoss);
  } catch (err) {
    next(err);
  }
});

app.delete("/cdelete/:name", async (req, res, next) => {
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

app.delete("/bdelete/:name", async (req, res, next) => {
  try {
    const deletedBoss = await Boss.findOneAndDelete({
      name: req.params.name,
    });
    if (!deletedBoss) {
      return res.status(404).send("No boss found with that name to delete");
    }
    res.json(deletedBoss);
  } catch (err) {
    next(err);
  }
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});
