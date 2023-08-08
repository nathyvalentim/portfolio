import "reflect-metadata";
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import { UserResolver } from './resolvers/UserResolver';

async function Server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gpl'),
  });

  const graphqlServer = new ApolloServer({
    schema,
  });

  //Logs (usando Morgan)
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requestslogs.log'))
  app.use(morgan('combined', { stream: accessLogStream }))

  app.use(cors({ origin: '*' }));

  app.use('/users', graphqlHTTP({
    schema: schema,
  }));

  app.listen(4000, () => {
    console.log("Servidor Online na porta 4000");
  });
}

export default Server;