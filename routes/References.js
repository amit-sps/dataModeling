const route = require("express").Router();
const connection = require("../db");
const dbName = "softprodigyintern";
route.post("/", async (req, res) => {
  try {
    await connection.connect();
    const { name, contact, address } = req.body;
    const db = connection.db(dbName);
    const userCollection = db.collection("userRef");
    const contactCollection = db.collection("contactRef");
    const addressCollection = db.collection("addressRef");
    const theUser = await userCollection.insertOne({ name });
    const { email, mobile } = contact;
    const contactToSave = { userId: theUser.insertedId, email, mobile };
    const { city, state, pincode } = address;
    const addressToSave = { userId: theUser.insertedId, city, state, pincode };
    const theContact = await contactCollection.insertOne(contactToSave);
    const theAddress = await addressCollection.insertOne(addressToSave);
    return res
      .status(200)
      .json({
        msg: "data saved successfully!",
        objectId: {
          user: theUser.insertedId,
          contact: theContact.insertedId,
          address: theAddress.insertedId,
        },
      });
  } catch (err) {
    console.log(err);
    return res.status(400).send("something went wrong!");
  }
});

route.get("/", async (req, res) => {
  try {
    await connection.connect();
    const db = connection.db(dbName);
    const userCollection = db.collection("userRef");
    const contactCollection = db.collection("contactRef");
    const addressCollection = db.collection("addressRef");
  } catch (err) {
    console.log(err);
    return res.status(400).send("something went wrong!");
  }
});

module.exports = route;
