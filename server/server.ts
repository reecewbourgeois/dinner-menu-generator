import express from "express";
import path from "path";

/* Create an express application */
const app = express();

/* Set port */
app.set("port", process.env.PORT || 3000);

/* Allow the parsing of JSON */
app.use(express.json());

/* Backend Routes */
app.use("/api/addMealToDatabase", require("./routes/addMealToDatabase"));

/* All are needed to prevent crashing on page refresh*/
app.use(express.static("../client/build"));
app.get("*", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

/* Start the App */
app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});

module.exports = app;
