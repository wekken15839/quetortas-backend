import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";

export const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const { photo } = req;

    if (!email || !password || !firstname) {
      return res
        .status(400)
        .json({ message: "email, password and firstname are required" });
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json({ message: "the email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordHash,
      firstname,
      lastname,
      photo,
    });
    await newUser.save();

    const token = await createToken({ user: newUser._id });

    res.cookie("authToken", token);
    res
      .status(200)
      .json({ id: newUser._id, email, firstname, lastname, photo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.status(400).json({ message: "the email doesn't exists" });
  }

  const passwordMatch = await bcrypt.compare(password, userFound.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "incorrect password" });
  }

  const token = await createToken({ user: userFound._id });

  res.cookie("authToken", token);
  res.status(200).json({
    id: userFound._id,
    email,
    firstname: userFound.firstname,
    lastname: userFound.lastname,
    photo: userFound.photo,
  });
};

export const profile = async (req, res) => {
  const { user } = req;
  console.log(user);

  const userFound = await User.findById(user);

  return res.status(200).json(userFound);
};

export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.sendStatus(204);
};
