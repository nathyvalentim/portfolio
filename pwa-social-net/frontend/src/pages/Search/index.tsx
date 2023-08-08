import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Container } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import Card from '../../components/Cards';
import User from '../../model/User';
import { findByName } from '../../resolvers/users';
import '../../../src/index.css'


const Search = () => {
   const { name } = useParams();
   const navigate = useNavigate();

   const get = findByName(name);
   const { data, loading } = useQuery(get);

   if (loading) {
    return <h1>Carregando...</h1>;
   }

   function handleHome(){
    window.location.href = "/";
  }

  return (
    
    <>
    <button className='btn-home' onClick={handleHome}>Home</button>
    <SearchBar />
    <Container>
         <Grid container spacing={5} mt={3} justifyContent="center">
           {
             data?.list.map((user: User) => (
               <Grid item key={user._id} onClick={() => navigate(`/detailsuser/${user._id}`)}>
                 <Card user={user} />
               </Grid>
             ))
           }
         </Grid>
         </Container>
     </>
   );
 }

 export default Search;