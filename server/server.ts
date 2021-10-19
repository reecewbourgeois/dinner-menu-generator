import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import { mongodb_uri } from "./config";

const app = express();

//Set up client connection info
const client = new MongoClient(mongodb_uri);

app.set("port", process.env.PORT || 3000);
app.use(express.json());

//Test route
//app.use("/api/test", require("./routes/test"));

//Backend Routes
app.use("/api/addMealToDatabase", require("./routes/addMealToDatabase"));

//All are needed to prevent crashing on page refresh
//app.set("views", path.join(__dirname, "views"));
app.use(express.static("../client/build"));
app.get("*", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

//Connect to database and start the app
client.connect((err: any, database: any) => {
  if (err) {
    console.log(err);
  }

  //Allows for database operation in other files without starting a whole new connection every time
  app.set("database", database);

  app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
  });
});

module.exports = app;
