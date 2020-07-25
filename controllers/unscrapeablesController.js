const NonScrapeable = require("../models/NonScrapeable");

exports.getUnscrapeables = async (req, res) => {
  console.log("Receiving /get request for Unscrapeable Sites");
  try {
    const sites = await NonScrapeable.find();

    res.json({
      status: 200,
      msg: "Unscrapeable List Request Successful",
      sites,
    });
  } catch (error) {
    res.json({
      status: 400,
      msg: "Unscrapeable List Request Unsuccessful",
      sites: [],
    });
  }
};
