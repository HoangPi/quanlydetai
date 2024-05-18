const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const mongoose = require('mongoose')

const {
  login,
  create,
  list,
  deleteUser,
  findUser,
  update,
  getListTeacher,
  listTeacherReview,
  loginGoogle,
} = require("../controllers/user.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/login").post(asyncMiddelware(login));
router.route("/login-google").post(asyncMiddelware(loginGoogle));
router.route("/get-list-teacher").get(asyncMiddelware(getListTeacher));
router
  .route("/list-teacher-review/:id")
  .get(asyncMiddelware(listTeacherReview));
router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteUser));
router.route("/:id").get(asyncMiddelware(findUser));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));
router.route('/persistlogin/:id').get(async (req,res)=>{
  try {
    let user = await userModel
      .findOne({
        _id: mongoose.Types.ObjectId(req.params)
      })
      .populate("major")
      .select("-password");

    if (!user) {
      throw new ErrorResponse(404, "User không tìm thấy");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
})

module.exports = router;
