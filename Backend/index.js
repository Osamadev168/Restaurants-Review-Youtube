import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import DAO from "./DataAccessObject/dao.js";
import ReviewsDAO from "./DataAccessObject/reviewdao.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const Port = process.env.PORT || 6000;

MongoClient.connect(process.env.DataBase_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 1200,
})
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await DAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(Port, () => {
      console.log(`Listening on Port : ${Port} jigger`);
    });
  });
