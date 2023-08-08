### Chamada funcional para a API em `curl`.

curl --request POST \
  --url http://localhost:4000/users \
  --header 'Content-Type: application/json' \
  --data '{"query":"query teste{\n\tlist{_id, age,\n  company,\n  email,\n  eyeColor,\n  \n  index,\n  name,\n  phone,\n  picture,\n\tfriends {name}}\n}","operationName":"teste"}'


### Executar o projeto
Frontend: yarn start
Backend: yarn dev


BACKEND:
Controller: faz as buscas no db por id e name, usando regex para name

Model: contem o mapeamento das propriedades (atributos) da entidade user (sao as mesmas propriedades do json)

Resolver: é responsável pela execução das queries definidas no schema da aplicação (chama o controller para executar as queries)

Server: Criei um servidor utilizando o Apollo Server, que é ideal para construir APIs GraphQL. 
E nele também tem a construçao do schema, usando o resolver. E geraçao de logs das requisiçoes HTTP utilizando Morgan.

===================
FRONTEND:
Componentes - visual, usam materialui: 
  Cards: para exibiçao dos cards dos usuarios
  Search: para buscar usuários
  (Usam o Model)

Model: 
  UserCommom: util para os componentes pois faz o mapeamento das propriedades da entidade user.
  UserCommom é generico
  User é derivado de UserCommom e possui a lista de amigos

  UserCommom é usado para mostrar todos os usuários
  User é usado para mostrar um usuário especifico, pois precisa mostrar a lista de amigos dele

Pages:
  Home: com todos
  DetailUser: com os amigos de um usuario especifico
  Search: resultados da busca

Resolvers: tem as queries definidas no schema da aplicação

=====================
IMPORTANTE: o arquivo react-app-env.d.ts é um arquivo que fica na src e é um arquivo de declaraçao de tipos.  Este arquivo faz referência a declarações de tipos TypeScript 
que são específicas para projetos iniciados com Create React App. Essas declarações de tipo adicionam suporte para importar arquivos de recursos, como bmp, gif, jpeg, jpg, png, 
webp e svg. Isso significa que a seguinte importação funcionará conforme o esperado sem erros.

Arquivos de service-worker contem configurações que permitem o uso offline da aplicação.  
