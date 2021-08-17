const express = require("express");
const { authAdminToken } = require("../middlewares/auth");
const { validProd, ProductsModel } = require("../models/prodsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  let perPage = req.query.perPage ? Number(req.query.perPage) : 6;
  let page = req.query.page ? Number(req.query.page) : 0;
  let sortQ = req.query.sort ? req.query.sort : "_id";
  let resultsSort = sortQ === "_id" ? -1 : 1;
  let searchQ = req.query.search ? req.query.search : "";
  let searchQRegExp = new RegExp(searchQ, "i");

  try {
    let data = await ProductsModel.find({ name: searchQRegExp })
      .sort({ [sortQ]: resultsSort })
      .limit(perPage)
      .skip(page * perPage);
    return res.json(data);
  } catch (err) {
    return res.status(404).json(err);
  }
});

router.get("/single/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let prod = await ProductsModel.findOne({ _id: id });
    return res.json(prod);
  } catch (err) {
    return res.status(404).json(err);
  }
});
router.post("/", authAdminToken, async (req, res) => {
  let prod = validProd(req.body);
  if (prod.error) {
    return res.status(401).json(prod.error.details[0]);
  }
  try {
    let newProd = new ProductsModel(req.body);
    await newProd.save();
    return res.json(newProd);
  } catch (e) {
    return res.status(404).json(e);
  }
});
router.put("/update/:id", authAdminToken, async (req, res) => {
  let prod = validProd(req.body);
  if (prod.error) {
    return res.status(401).json(prod.error.details[0]);
  }
  try {
    let updated = await ProductsModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    return res.json(updated);
  } catch (error) {
    return res.status(404).json(error);
  }
});
router.delete("/delete/:id", authAdminToken, async (req, res) => {
  try {
    let updated = await ProductsModel.deleteOne({ _id: req.params.id });
    return res.json(updated);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.get("/count", async (req, res) => {
  try {
    const amount = await ProductsModel.countDocuments({});
    return res.json(amount);
  } catch (e) {
    return res.status(404).json(e);
  }
});

module.exports = router;
