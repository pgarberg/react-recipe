const Recipe = require("../models/Recipe");

const User = require("../models/User");

const MealPlan = require("../models/MealPlan");

const Collection = require("../models/Collection");

const bcrypt = require("bcrypt");

exports.getCollections = async (req, res) => {
  console.log("Receiving a get request for /collections...");
  const { userID } = req.params;
  try {
    const user = await User.findById(userID).populate("collections");
    const { collections } = user;

    res.json({ status: 200, msg: "Success", collections });
  } catch (error) {
    res.json({
      status: 400,
      msg: "Error Occurred",
      error,
    });
  }
};

exports.getCollectionByID = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.json({ status: 200, msg: "Success", collection });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.updateCollectionByID = async (req, res) => {
  try {
    const { id, userID } = req.params;
    const collectionUpdates = req.body;

    const collection = await Collection.findById(id).populate("user");

    if (userID.toString() === user.user._id.toString()) {
      const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        collectionUpdates,
        {
          new: true,
        }
      );
      return res.json({
        status: 200,
        msg: "Success",
        collection: updatedCollection,
      });
    }
    res.json({
      status: 400,
      msg: "Collection Not Updated",
    });
  } catch (error) {
    res.json({ status: 500, msg: "Server Error", error });
  }
};

exports.deleteCollectionByID = async (req, res) => {
  try {
    const { userID, id } = req.params;

    const collection = await Collection.findById(id).populate("user");

    if (userID.toString() === collection.user._id.toString()) {
      const tryDelete = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { collections: { _id: id } } }
      );

      const deleted = await Collection.findByIdAndDelete(id);
      if (deleted) {
        res.json({
          status: 200,
          msg: "Collection Successfully Deleted",
          collection: deleted,
        });
      } else {
        res.json({
          status: 400,
          msg: "Collection Not Deleted",
        });
      }
    } else {
      res.json({
        status: 400,
        msg: "You do not have permission to delete this collection.",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      msg: "Something Went Wrong",
    });
  }
};

exports.createCollection = async (req, res) => {
  const { title } = req.body;
  try {
    const { userID } = req.params;

    const user = await User.findById(userID);

    if (user) {
      console.log("Made it to part 1");
      const collection = {
        title,
        user,
      };

      console.log("collection :>>", collection);

      const createdCollection = await Collection.create(collection);

      console.log("createdCollection :>>", createdCollection);

      User.findByIdAndUpdate(
        userID,
        { $push: { collections: createdCollection } },
        (error, success) => {
          if (error) {
            res.json({
              status: 400,
              msg: "An Error Occurred When Creating Collection",
              error,
              title,
            });
          } else {
            res.json({
              status: 200,
              msg: "Collection Successfully Created",
              collection: createdCollection,
            });
          }
        }
      );
    } else {
      res.json({
        status: 400,
        msg: "An Error Occurred When Creating Collection",
        title,
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      msg: "An Error Occurred When Creating Collection",
      title,
    });
  }
};
