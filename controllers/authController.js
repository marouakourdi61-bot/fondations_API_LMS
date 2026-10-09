const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "learner",
    });

    return res.status(201).json({
      status: 201,
      message: "Account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        status: 403,
        message: "Account is suspended",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("jwt secret is not configured");
    }

    const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: 200,
      message: "login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
