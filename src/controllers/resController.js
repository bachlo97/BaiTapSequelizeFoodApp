import { responseSend } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import dayjs from "dayjs";
let model = initModels(sequelize);

const checkExist = async (obj, res, entity, title) => {
  const check = await model[entity].findOne({
    where: obj,
  });
  if (!check) {
    responseSend(res, "", `${title} not found`, 404);
    return null;
  }
  return check;
};

//handle like restaurant
const likeRes = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    const checkRes = await checkExist(
      { res_id },
      res,
      "restaurant",
      "Restaurant"
    );
    if (!checkRes) return;

    const checkLikeRes = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (!checkLikeRes) {
      let newLikeRes = {
        user_id,
        res_id,
        date_like: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      await model.like_res.create(newLikeRes);
      responseSend(res, "", "Successful!", 200);
    } else {
      responseSend(res, "", "Data already exists.", 409);
    }
  } catch (error) {
    console.log("likeRes error:", error);
    responseSend(res, "", error, 400);
  }
};

//handle unlike restaurant
const unlikeRes = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const deleteLikeRes = await model.like_res.destroy({
      where: {
        user_id,
        res_id,
      },
    });
    if (deleteLikeRes) {
      responseSend(res, "", "Successful!", 200);
    } else {
      responseSend(res, "", "Data not found", 404);
    }
  } catch (error) {
    console.log("unlikeRes error:", error);
  }
};

//handle get like list via res_id
const getLikeViaRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const checkRes = await checkExist(
      { res_id },
      res,
      "restaurant",
      "Restaurant"
    );
    if (!checkRes) return;

    const listLikeRes = await model.like_res.findAll({
      where: {
        res_id,
      },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: [],
        },
        {
          model: model.restaurant,
          as: "re",
          attributes: [],
        },
      ],
      attributes: [
        "user_id",
        "res_id",
        "user.full_name",
        "user.email",
        "re.res_name",
        "date_like",
      ],
      raw: true,
    });
    responseSend(res, listLikeRes, "Successful!", 200);
  } catch (error) {
    console.log("getLikeViaRes:", error);
    responseSend(res, "", error, 400);
  }
};

//handle get like list via res_id
const getLikeViaUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const checkUser = await checkExist({ user_id }, res, "user", "User");
    if (!checkUser) return;
    const listLikeRes = await model.like_res.findAll({
      where: {
        user_id,
      },

      include: [
        {
          model: model.user,
          as: "user",
          attributes: [],
        },
        {
          model: model.restaurant,
          as: "re",
          attributes: [],
        },
      ],
      attributes: [
        "user_id",
        "res_id",
        "user.full_name",
        "user.email",
        "re.res_name",
        "date_like",
      ],
      raw: true,
    });
    responseSend(res, listLikeRes, "Successful!", 200);
  } catch (error) {
    console.log("getLikeViaRes:", error);
    responseSend(res, "", error, 400);
  }
};

//handle add Rate
const addRate = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    const checkRes = await checkExist(
      { res_id },
      res,
      "restaurant",
      "Restaurant"
    );
    if (!checkRes) return;

    await model.rate_res.create({
      user_id,
      res_id,
      amount,
      date_rate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });

    const data = await model.rate_res.findAll({
      where: {
        user_id,
        res_id,
      },
      include: [
        {
          model: model.restaurant,
          as: "re",
          attributes: [],
        },
        {
          model: model.user,
          as: "user",
          attributes: [],
        },
      ],
      attributes: [
        "user_id",
        "res_id",
        "user.full_name",
        "user.email",
        "re.res_name",
        "amount",
        "date_rate",
      ],
      raw: true,
    });
    responseSend(res, data, "Successful!", 200);
  } catch (error) {
    console.log("addRate:", error);
    responseSend(res, "", error, 400);
  }
};

//handle get rate list via res_id
const getRateListViaRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const checkRes = await checkExist(
      { res_id },
      res,
      "restaurant",
      "Restaurant"
    );
    if (!checkRes) return;

    const listRateRes = await model.rate_res.findAll({
      where: {
        res_id,
      },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: [],
        },
        {
          model: model.restaurant,
          as: "re",
          attributes: [],
        },
      ],
      attributes: [
        "user_id",
        "res_id",
        "user.full_name",
        "user.email",
        "re.res_name",
        "amount",
        "date_rate",
      ],
      raw: true,
    });
    responseSend(res, listRateRes, "Successful!", 200);
  } catch (error) {
    console.log("getRateListViaRes:", error);
    responseSend(res, "", error, 400);
  }
};

//handle get rate list via res_id
const getRateListViaUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const checkUser = await checkExist({ user_id }, res, "user", "User");
    if (!checkUser) return;

    const listRateRes = await model.rate_res.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: model.user,
          as: "user",
          attributes: [],
        },
        {
          model: model.restaurant,
          as: "re",
          attributes: [],
        },
      ],
      attributes: [
        "user_id",
        "res_id",
        "user.full_name",
        "user.email",
        "re.res_name",
        "amount",
        "date_rate",
      ],
      raw: true,
    });
    responseSend(res, listRateRes, "Successful!", 200);
  } catch (error) {
    console.log("getRateListViaRes:", error);
    responseSend(res, "", error, 400);
  }
};

export {
  likeRes,
  unlikeRes,
  getLikeViaRes,
  getLikeViaUser,
  addRate,
  getRateListViaRes,
  getRateListViaUser,
};
