let restaurants;

export default class DAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn.db(process.env.NS).collection("restaurants");
    } catch (e) {
      console.log(`error : ${e}`);
    }
  }
  static async getRestaurants({
    filters = null,
    page = 1,
    restaurantsPerPage = 500,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.log(`err: ${e}`);
    }
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);
    try {
      const restaurantsList = await displayCursor.toArray();
      const totalRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalRestaurants };
    } catch (e) {
      console.log(`err : ${e}`);
    }
  }
  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
