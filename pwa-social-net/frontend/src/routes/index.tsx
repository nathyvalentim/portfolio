import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Search from '../pages/Search';
import DetailsUser from "../pages/DetailsUser";


function RouterApp(){
  return(
  
    <Routes>
        <Route index element={<Home />}></Route> 
        <Route path="detailsuser/:id" element={<DetailsUser />}></Route> 
        <Route path=":name" element={<Search />}></Route>
    </Routes>

)}

export default RouterApp;