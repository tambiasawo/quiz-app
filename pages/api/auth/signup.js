import Users from "../../../schema/Users";
import dbConnection from "../../../database/conn";
import md5 from "md5";

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
    const { name, email, password } = req.body;
    const duplicateUser = await Users.findOne({ email });

    if (duplicateUser) {
      return res.status(422).json({ error: "Duplicate user" });
    }

    Users.create(
      { name, email, password: md5(password) },
      function (data, err) {
        if (err)
          return res
            .status(400)
            .json({ error: `There was an error: ${err.message}` });
        return res.status(201).json({
          status: "success",
          user: data,
        });
      }
    );
  } else {
    return res.status(500).json({ error: "Not the right HTTP method" });
  }
}
