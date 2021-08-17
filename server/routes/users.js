const express = require("express");
const bcrypt = require("bcrypt");
const {
  validUser,
  UserModel,
  validLogin,
  getToken,
  validDel,
  validUpdate,
  getAdminToken,
} = require("../models/userModel");
const { authToken } = require("../middlewares/auth");
const { ProductsModel, validCartUpdate } = require("../models/prodsModel");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ success: "usersWork" });
});
router.post("/", async (req, res) => {
  let user = validUser(req.body);
  if (user.error) {
    return res.status(401).json(user.error.details[0]);
  }
  try {
    let newUser = new UserModel(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    return res.status(401).json(err);
  }
});

router.post("/login", async (req, res) => {
  let user = validLogin(req.body);
  if (user.error) {
    return res.status(401).json(user.error.details[0]);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Wrong Email" });
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Wrong Password" });
    }
    if (user._doc.admin) {
      const adminToken = getAdminToken(user._id);
      return res.status(200).json({ token: adminToken });
    }
    const token = getToken(user._id);
    if (req.body.cart) {
      let newCart = user.cart;
      let bodyCart = req.body.cart;
      for (let key in bodyCart) {
        newCart[key]
          ? (newCart[key] += bodyCart[key])
          : (newCart[key] = bodyCart[key]);
      }
      await UserModel.updateOne({ email: req.body.email }, { cart: newCart });
    }
    return res.json({ token: token });
  } catch (error) {
    return res.status(401).json(err);
  }
});

router.get("/userInfo", authToken, async (req, res) => {
  let userId = req.tokenData._id;
  try {
    let showOrders = [];
    let user = await UserModel.findOne({ _id: userId }, { password: 0 });
    for (let i of user.lastOrders) {
      let keysARR = Object.keys(i);
      const data = await ProductsModel.find({ _id: { $in: keysARR } });
      showOrders.push(data);
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
});
router.get("/userOrders", authToken, async (req, res) => {
  let userId = req.tokenData._id;
  try {
    let showOrders = [];
    let user = await UserModel.findOne({ _id: userId });
    for (let i of user.lastOrders) {
      let keysARR = Object.keys(i);
      const data = await ProductsModel.find({ _id: { $in: keysARR } });
      showOrders.push(data);
    }
    return res.status(200).json(showOrders);
  } catch (err) {
    return res.status(404).json(err);
  }
});

router.get("/authUser", authToken, (req, res) => {
  return res.json({ msg: "valid" });
});
router.put("/updateCart", authToken, async (req, res) => {
  let validCart = validCartUpdate(req.body);
  if (validCart.error) {
    return res.status(401).json(validCart.error.details[0]);
  }
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    let id = req.body._id;
    let amount = req.body.amount;
    let newCart = { ...user.cart };
    if (id in newCart) {
      newCart[id] += amount;
    } else {
      newCart = { ...newCart, [id]: amount };
    }
    let data = await UserModel.updateOne(
      { _id: req.tokenData._id },
      { cart: newCart }
    );
    res.json(data);
  } catch (err) {
    return res.status(401).json(err);
  }
});
router.put("/deleteOne", authToken, async (req, res) => {
  let validId = validDel(req.body);
  if (validId.error) {
    return res.status(401).json(validId.error.details);
  }
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    let id = req.body._id;
    let newCart = { ...user.cart };
    delete newCart[id];
    let response = await UserModel.updateOne(
      { _id: req.tokenData._id },
      { cart: newCart }
    );
    return res.status(201).json(response);
  } catch (e) {
    return res.status(404).json(e);
  }
});

router.put("/updateCheckout", authToken, async (req, res) => {
  let validUp = validCartUpdate(req.body);
  if (validUp.error) {
    return res.status(401).json(validUp.error.details);
  }
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    let id = req.body._id;
    let newCart = { ...user.cart };
    newCart[id] = req.body.amount;
    let resp = await UserModel.updateOne(
      { _id: req.tokenData._id },
      { cart: newCart }
    );
    return res.json(resp);
  } catch (e) {
    return res.status(404).json(e);
  }
});

router.put("/checkout", authToken, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    let order = user.cart;
    let resp = await UserModel.updateOne(
      { _id: req.tokenData._id },
      { cart: req.body.emptyCart, $push: { lastOrders: order } }
    );

    return res.json(resp);
  } catch (e) {
    return res.status(404).json(e);
  }
});
router.get("/cart", authToken, async (req, res) => {
  let userId = req.tokenData._id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    const userCart_arr = Object.keys(user.cart);
    const cart = await ProductsModel.find({ _id: { $in: userCart_arr } });
    return res.json(cart);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;
