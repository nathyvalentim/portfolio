import { gql } from "@apollo/client";

 export const get = gql`
   query GetUsers{
     list {
       _id
       picture
       age
       eyeColor
       name
       company
       email
     }
   }
 `;

 export const findByName = (name: any) => gql`
   query FindByName{
     list(name: "${name}") {
       _id
       name
       index
       picture
       age
       eyeColor
       company
       email
       phone
       friends {
         _id
         index
         picture
         age
         eyeColor
         name
         company
         email
         phone
       }
      
     }
   }
 `
 export const findById = (id: any) => gql`
 query FindById {
  detailsUser(_id: "${id}") {
     _id
     name
     picture
     age
     email
     friends {
       _id
       picture
       age
       eyeColor
       name
       company
       email
       phone
     }
   }
 }
`
 
 ;