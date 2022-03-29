const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body.data) });
  } catch (err) {
    next(err);
  }
});

router.post("/login/facebook", async (req, res, next) => {
  try {
    const { email, firstName, lastName, facebookId, image, username } = req.body.data;
    if ([firstName, lastName, email, facebookId, username].includes(undefined)) {
      return res.status(400).json({ message: 'firstName, lastName, email and facebookId is require!!' });
    }
    const user = await User.findOne({ where: { facebookId } });
    if (user) {
        const token = jwt.sign({id: user.id}, process.env.JWT);
        res.status(200).json({ message: 'Success login', token });
      } else {
        const user = await User.create(req.body.data);
        const token = await user.generateToken()
        res.status(200).json({ message: 'Success login', token });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login/google", async (req, res, next) => {
  try {
    const { email, firstName, lastName, googleId, image, username } = req.body.data;
    if ([firstName, lastName, email, googleId, username].includes(undefined)) {
      return res.status(400).json({ message: 'firstName, lastName, email and googleId is require!!' });
    }
    const user = await User.findOne({ where: { email, googleId } });
    if (user) {
        const token = jwt.sign({id: user.id}, process.env.JWT);
        res.status(200).json({ message: 'Success login', token });
      } else {
        const user = await User.create(req.body.data);
        const token = await user.generateToken()
        res.status(200).json({ message: 'Success login', token });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body.data);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      console.log(err);
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
