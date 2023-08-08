import UserCommom from "./UserCommom";

interface User extends UserCommom {
   friends: UserCommom[];
 }

 export default User;