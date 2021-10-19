import { Router } from "express";
import { MongoClient } from "mongodb";
import { mongodbURI } from "../config";
const router = Router();
const client = new MongoClient(mongodbURI);

type Meal = {
  mealName: string;
  lastServing: string;
  season: "All" | "Cold" | "Hot";
};

router.post("/", async (reqest, response) => {
  try {
    /* Connect to server */
    await client.connect();

    /* Point to collection */
    const meals = client
      .db("Dinner_Menu_Generator_Database")
      .collection<Meal>("meals");

    /* Document to insert */
    const mealToAddToDatabase: Meal = {
      mealName: reqest.body.mealName,
      lastServing: reqest.body.lastServing,
      season: reqest.body.season,
    };

    /* Insert */
    const result = await meals.insertOne(mealToAddToDatabase);

    /* Send the inserted id in case it is needed */
    response.send(result.insertedId);
  } catch (error) {
    /* If error, send back an error */
    console.error(error);
    response.send(error);
  }
});

module.exports = router;
