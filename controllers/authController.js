exports.loginUser = async (req, res) => {
  console.log("Attempting to Login User");
  res.json({
    username: "pgarberg",
    first_name: "Peder",
    last_name: "Garberg",
    userID: "18dj40fJ0d3Kl",
    googleID: "38485834977",
  });
};

exports.registerUser = async (req, res) => {
  console.log("Attempting to Register User");
  res.json({
    username: "pgarberg",
    first_name: "Peder",
    last_name: "Garberg",
    userID: "18dj40fJ0d3Kl",
    googleID: "38485834977",
  });
};
