import { ObjectId } from "mongodb";
import {
  UpdateUserParams,
  iUpdateUserRepository,
} from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements iUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    console.log(params);
    await MongoClient.db.collection("users").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    console.log(user);
    if (!user) {
      throw new Error();
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
