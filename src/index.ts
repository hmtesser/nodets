import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoCreateUser } from "./repositories/create-user/mongo-create-user";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("hello api!");
});

const main = async () => {
  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUser();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
