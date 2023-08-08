import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Container } from '@mui/material';
import { get } from '../../resolvers/users';
import SearchBar from '../../components/SearchBar';
import Cards from '../../components/Cards';
import User from '../../model/User';


const Home = () => {
  const { data, loading } = useQuery(get);
  const navigate = useNavigate();

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <SearchBar />
      <Container>
        <Grid container spacing={5} mt={4} justifyContent="center">
          {
            data?.list.map((user: User) => (
              <Grid item key={user._id} onClick={() => navigate(`/detailsuser/${user._id}`)}>
                <Cards user={user} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  );
}

export default Home;