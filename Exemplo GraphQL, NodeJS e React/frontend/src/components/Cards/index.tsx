import { Box, Card, CardContent, CardMedia, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import UserCommom from '../../model/UserCommom';


interface User {
  user: UserCommom
}

function Cards({ user }: User) {


  return (

    <Container>
      <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }} />
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={user.picture}
          alt="user"
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
                  primary="Eye Color:"
                  secondary={user.eyeColor}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Company:"
                  secondary={user.company}
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
    </Container>
  );
}

export default Cards;