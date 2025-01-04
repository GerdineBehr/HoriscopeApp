const express = require("express");
const router = express.Router();
const accountService = require("../service/accountService");
const AuthMiddleware = require("../middleware/authMiddleware");
const secret = process.env.JWT_SECRET;

// POST user registration
router.post("/register", async (req, res) => {
  try {
    const newUser = await accountService.registerUser(req.body);
    return res
      .status(201)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "New user registered", newUser });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

// POST user login
router.post("/login", async (req, res) => {
  if (!secret) {
    res.status(500).json({ message: "SECRET KEY UNAVAILABLE" });
  }

  const { identifier, password } = req.body;

  try {
    const token = await accountService.loginUser(identifier, password);

    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ token });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
});

// PATCH user profile picture

router.patch("/profile-pic", AuthMiddleware.verifyToken, async (req, res) => {
  const email = req.user.email;
  const username = req.user.username;
  const file_name = `${username}-profile-pic`;
  const { mime, data } = req.body.image;

  if (!email || !file_name || !mime || !data) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await accountService.uploadProfilePicAndUpdateDB(
      email,
      file_name,
      mime,
      data
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in controller layer: ", error);
    return res
      .status(500)
      .json({ message: error.message || "Server error: profile pic" });
  }
});

// GET user data based on their authentication

router.get("/profile", AuthMiddleware.verifyToken, async (req, res) => {
  const username = req.user.username;
  try {
    const user = await accountService.getUserByUsername(username);
    const userProfile = {
      id: user.id.S,
      username: user.username.S,
      about_me: user.about_me?.S ?? "",
      role: user.role.S,
      creation_time: user.creation_time.S,
      profile_pic: user.profile_pic ?? "",
    };

    return res.status(200).json({ userProfile });
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return res.status(500).json({ message: error });
  }
});

//PATCH user about me

router.patch("/about-me", AuthMiddleware.verifyToken, async (req, res) => {
  const { about_me } = req.body;

  try {
    const email = req.user.email;
    const result = await accountService.updateAboutMe(email, about_me);

    res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// GET user data based on username

router.get("/profile/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await accountService.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      email: user.email.S,
      username: user.username.S,
      about_me: user.about_me?.S ?? "",
      role: user.role.S,
      creation_time: user.creation_time.S,
      profile_pic: user.profile_pic ?? "",
    };

    return res.status(200).json({ userProfile });
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return res
      .status(500)
      .json({ message: "Internal server error: profile by username" });
  }
});

module.exports = router;
