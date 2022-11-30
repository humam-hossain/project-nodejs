const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {item: []}
    this._id = id;
  }

  save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(cp => cp.productId === product._id);
    const updatedCart = { items: [{productId: new mongodb.ObjectId(product._id), quantity: 1}] };

    const db = getDb();
    return db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        // console.log("models/user.js/static findById() called Successfully!");
        // console.log(user);
        return user;
      })
      .catch((err) => {
        // console.log("models/user.js/static findById() failed!");
        console.log(err);
      });
  }
}

module.exports = User;
