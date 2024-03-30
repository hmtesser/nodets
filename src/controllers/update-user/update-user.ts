import { User } from "../../models/user";
import { CreateUserParams } from "../create-user/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  UpdateUserParams,
  iUpdateUserRepository,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly UpdateUserRepository: iUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }
      //
      const allowedFieldsToUpdate: (keyof CreateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const user = await this.UpdateUserRepository.updateUser(id, body);
      console.log("user", user);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
