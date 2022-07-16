import express from "express";
import controller from "./reataurants.controller.js";
import ReviewsController from "./ReviewsController.js";
const router = express.Router();
router.route("/").get(controller.apiGetRestaurants);
router.route("/id/:id").get(controller.apiGetRestaurantById);
router.route("/cuisines").get(controller.apiGetRestaurantCuisines);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
