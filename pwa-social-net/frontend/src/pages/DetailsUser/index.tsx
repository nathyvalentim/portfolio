import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Container, Card, CardMedia, List, ListItem, ListItemText, CardContent, Typography } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import Cards from '../../components/Cards';
import User from '../../model/User';
import UserCommom from '../../model/UserCommom';
import { findById } from '../../resolvers/users';
import './detailsUser.css'



const DetailsUser = () => {
  const { id } = useParams();

  const GET_USER = findById(id);

  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  function handleHome() {
    window.location.href = "/";
  }

  return (
    <>


      <Container>
        <button className='btn-home' onClick={handleHome}>Home</button>

        <Grid container justifyContent="center">
          {
            data.detailsUser.map((user: User) => (
              <Grid item key={user._id}>

                <Card>
                  <CardMedia
                    component="img"
                    height="250"
                    image={user.picture}
                    alt={user.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Name:"
                            secondary={user.name}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemText
                            primary="Age:"
                            secondary={user.age}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemText
                            primary="E-mail:"
                            secondary={user.email}
                          />
                        </ListItem>
                      </List>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>

      <Container>
        <Typography gutterBottom variant="h4" component="div">Friends:</Typography>
        <Grid container spacing={5}>
          {
            data?.detailsUser.map((user: User) => (
              user.friends.map((friends: UserCommom) => (
                <Grid item key={friends._id}>
                  <Cards user={friends} />
                </Grid>
              ))
            ))
          }
        </Grid>
      </Container>
    </>
  );
}

export default DetailsUser;