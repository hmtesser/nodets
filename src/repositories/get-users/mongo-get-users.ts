import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        id: 1,
        firstName: "Henrique",
        lastName: "Tesser",
        email: "hmtesser@gmail.com",
        password: "12345",
      },
    ];
  }
}
