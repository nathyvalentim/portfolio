import { Arg, Query, Resolver } from "type-graphql";
import Controllers from '../controllers/User';
import User from "../model/User";
import UsersDB from '../db/users.json';

@Resolver()
export class UserResolver {
  private data: User[] = UsersDB;

  @Query(() => [User])
  async detailsUser(@Arg('_id') _id: string) {
    return _id ? Controllers.findUserById(_id) : this.data;
  }

  @Query(() => [User])
  async list(@Arg('name', { nullable: true }) name: string) {
    return name ? Controllers.findUserByName(name) : this.data;
  }


}

