const { validationResult } = require("express-validator");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const Transaction = require("../models/transaction");

//ADD USER 
const register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const phone =req.body.phone;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArray = errors.array();
      const err = new Error(errArray[0].msg);
      err.statusCode = 422;
      err.data = errArray;
      throw err;
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const err = new Error("E-Mail address already exists!");
      err.statusCode = 422;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const activationToken = (await promisify(randomBytes)(20)).toString("hex");
    const user = new User({
      email: email,
      password: hashedPassword,
      phone: phone,
      fname: fname,
      lname: lname,
      activationToken: activationToken,
    });
    const savedUser = await user.save();


    // Automatically log in user after registration
    const token = jwt.sign(
      { userId: savedUser._id.toString() },
      process.env.JWT_KEY
    );

    // Set cookie in the browser to store authentication state
    const maxAge = 1000 * 60 * 60; // 1 hour
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge,
      domain: process.env.DOMAIN,
    });

    res.status(201).json({
      message: "User Created!",
      userId: savedUser._id,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Please Input Valid Values!");
      err.statusCode = 422;
      err.data = errors.array();
      throw err;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error("Account Doesn't Exist!");
      err.statusCode = 404;
      throw err;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const err = new Error("Invalid Credentials!");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_KEY
    );

    // Set cookie in the browser to store authentication state
    const maxAge = 1000 * 60 * 60; // 1 hour
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge,
      domain: process.env.DOMAIN,
    });

    res.status(201).json({
      message: "User Logged In!",
      token: token,
      userId: user._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("User Unauthenticated!");
    err.statusCode = 401;
    throw err;
  }

  res.clearCookie("token", { domain: process.env.DOMAIN });
  res.status(200).json({
    message: "User Logged Out!",
    userId: userId,
  });
};



const getUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const transaction = await User.findById(userId).populate("transactions");

    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }

    res.status(200).json({
      message: "User Fetched!",
      userId: user._id.toString(),
      email: user.email,
      phone: user.phone,
      fname: user.fname,
      lname: user.lname,
      transactions: transaction,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.userId;
  const email = req.body.email;
  const phone = req.body.phone;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const password = req.body.password;

  try {
    const user = await User.findById(userId);

    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    user.email = email;
    user.fname = fname;
    user.lname = lname;
    user.phone = phone;

    const savedUser = await user.save();

    res.status(201).json({
      message: "User Updated!",
      userId: savedUser._id.toString(),
      email: savedUser.email,
      fname: savedUser.fname,
      lname: savedUser.lname,
      phoneNo: savedUser.phoneNo,
    });
  } catch (err) {
    next(err);
  }
};

const getResetToken = async (req, res, next) => {
  const email = req.body.email;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Please Input Valid Values!");
      err.statusCode = 422;
      err.data = errors.array();
      throw err;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error("Account Doesn't Exist!");
      err.statusCode = 404;
      throw err;
    }

    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    const savedUser = await user.save();

    await transport.sendMail({
      from: process.env.MAIL_SENDER,
      to: savedUser.email,
      subject: "Finefy Password Reset Token",
      html: resetPasswordTemplate(resetToken),
    });

    res.status(200).json({
      message: "Password Reset Requested! Check Your Inbox!",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const password = req.body.password;
  const resetToken = req.body.resetToken;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Please Input Valid Values!");
      err.statusCode = 422;
      err.data = errors.array();
      throw err;
    }

    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpiry: { $gt: Date.now() - 1000 * 60 * 60 },
    });
    if (!user) {
      const err = new Error("Invalid / Expired Token!");
      err.statusCode = 422;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    const savedUser = await user.save();

    // Automatically sign in user after password reset
    const token = jwt.sign(
      { userId: savedUser._id.toString() },
      process.env.JWT_KEY
    );

    const maxAge = 1000 * 60 * 60; // 1 hour
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge,
      domain: process.env.DOMAIN,
    });

    res.status(201).json({
      message: "Password successfully changed.",
      token: token,
      userId: savedUser._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};


//ADD TRANSACTION
const updateTransaction = async (req,res,next) => {
  try  
  {  const trans = req.body;
      const { userid } = req.params;
      const newtransaction = await Transaction.create(trans);
      const newUser = await User.findByIdAndUpdate(
          userid,
          {
            $push: { transactions: newtransaction._id }
          },
          { new: true , useFindAndModify: false },
      );
      res.send(newUser);
    }
    catch(err){
      next(err);
    }
}


exports.register = register;
exports.login = login;
exports.logout = logout;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.getResetToken = getResetToken;
exports.resetPassword = resetPassword;
exports.updateTransaction = updateTransaction;