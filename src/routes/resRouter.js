import express from "express";
import {
  addRate,
  getLikeViaRes,
  getLikeViaUser,
  getRateListViaRes,
  getRateListViaUser,
  likeRes,
  unlikeRes,
} from "../controllers/resController.js";

const resRouter = express.Router();

//!Note that the frontend will call a different API, such as fetching the restaurant like information to render the status of the like button. Based on the status of the like button, the appropriate like or unlike API call will be made.

//handle  like restaurant
resRouter.post("/like-res", likeRes);

//handle unlike restaurant
resRouter.delete("/unlike-res", unlikeRes);

//handle get like list via res_id
resRouter.get("/get-like-list-via-res-id/:res_id", getLikeViaRes);

//handle get like list via user_id
resRouter.get("/get-like-list-via-user-id/:user_id", getLikeViaUser);

//handle add rate
resRouter.post("/add-rate", addRate);

//handle get rate list via res_id
resRouter.get("/get-rate-list-via-res-id/:res_id", getRateListViaRes);

//handle get rate list via user_id
resRouter.get("/get-rate-list-via-user-id/:user_id", getRateListViaUser);

export default resRouter;
