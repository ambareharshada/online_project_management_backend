const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "auth123";

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    hashedPassword = await bcrypt.hash(password, 10);
    userData = {
      email: email,
      password: hashedPassword,
    };

    const result = new UserModel(userData);
    const finalData = await result.save();
    res.status(200).send(finalData);
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { __v: 0 });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const userData = req.body;
  try {
    const UserEmail = await UserModel.findOne({ email: userData.email });
    if (!UserEmail) {
      res.status(UserEmail.status).send({ message: UserEmail.message });
    } else {
      const password = await bcrypt.compare(
        userData.password,
        UserEmail.password
      );
      if (!password) {
        res.status(500).send({Success:false, message: "Invalid User" });
      } else {
        const token = jwt.sign(
          { id: UserEmail._id, email: UserEmail.email },
          SECRET_KEY,
          { expiresIn: "3hr" }
        );
        res
          .status(200)
          .send({ Success: true, message: "Valid User", token: token });
      }
    }
  } catch (error) {}
};
module.exports = { addUser, getAllUsers, loginUser };
