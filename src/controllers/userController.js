import { responseSend } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let model = initModels(sequelize);
const orderFood = async (req, res) => {
  try {
    const { food_id } = req.params;
    const { user_id, amount, code, arr_sub_id } = req.body;

    const checkFood = await checkExist({ food_id }, res, "food", "Food");
    if (!checkFood) return;

    const newOrder = await model.order.create({
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id,
    });

    const result = await model.order.findOne({
      where: {
        order_id: newOrder.order_id,
      },
      include: [
        {
          model: model.food,
          as: "food",
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
        "food_id",
        "user.full_name",
        "user.email",
        "food.food_name",
        "food.price",
        "food.desc",
        "amount",
        "code",
        "arr_sub_id",
      ],
    });

    responseSend(res, result, "Successful!", 200);
  } catch (error) {
    console.log("orderFood:", error);
    responseSend(res, "", error, 400);
  }
};

export { orderFood };
