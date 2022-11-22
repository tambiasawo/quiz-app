import Scores from "../../../schema/Scores";
import dbConnection from "../../../database/conn";

export default async function (req, res) {
  dbConnection().catch((err) => {
    return res.json({ error: "Unable to connect to database" });
  });
  if (req.method === "POST") {
    if (!req.body) {
      return res
        .status(404)
        .json({ error: "Pls make sure all form fields are valid" });
    }
    const { email, score, date } = req.body;
    Scores.create({ email, score, date }, function (data, err) {
      if (err)
        return res
          .status(400)
          .json({ error: `There was an error: ${err.message}` });
      return res.status(201).json({
        status: "success",
        user: data,
      });
    });
  } else {
    return res.status(500).json({ error: "Not the right HTTP method" });
  }
}
