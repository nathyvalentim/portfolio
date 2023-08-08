import { ObjectType, Field, ID } from "type-graphql";


@ObjectType()
class User{

    @Field(_type => ID)
    _id: string;

    @Field(_type => [User])
    friends?: User[];

    @Field()
    index: number;

    @Field()
    picture: string;

    @Field()
    age: number;

    @Field()    
    eyeColor: string;

    @Field()
    name: string;

    @Field()
    company: string;

    @Field()
    email: string;

    @Field()
    phone: string;

}

export default User;