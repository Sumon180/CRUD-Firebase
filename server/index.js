const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  app = express(),
  port = 3000,
  hostName = "localhost",
  fs = require("firebase-admin"),
  bodyParser = require("body-parser"),
  serviceAccount = require("./keys.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});
const db = fs.firestore();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let usr = [];
    const user = await db.collection("users").get();
    if (user.docs.length > 0) {
      for (const users of user.docs) {
        usr.push({
          ...users.data(),
          id: users.id,
        });
      }
    }
    res.json(usr);
  } catch (error) {
    res.send(error);
  }
});

app.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    // const id = req.body.id;
    const { name, email, phone } = req.body;
    const userJson = {
      name,
      email,
      phone,
    };
    const usersDb = db.collection("users");
    const response = await usersDb.doc().set(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("users").doc(id);
    const response = await userRef.get();
    console.log(response.data());
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const userJson = {
      name,
      email,
      phone,
    };
    const userRef = await db.collection("users").doc(id).update(userJson);
    res.send(userRef);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.collection("users").doc(id).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`server is running at http://${hostName}:${port}`);
});
