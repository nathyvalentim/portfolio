import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  

  const handleSearch = (text: any) => {
    if (text.key === 'Enter') {
      navigate(`/${query}`);
    }
  }

  return (


    <Container >
      <Typography variant="h1" mt={10} component="h2">MySocial</Typography>
      <Box
        component="form"
        sx={{
          bgcolor: "white",
          zIndex: 'tooltip',
          margin: 2,
          display: 'flex'
        }}
        noValidate
        autoComplete="off"
      >

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Search"
            placeholder='Search people'
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleSearch} />

        </FormControl>
      </Box>




    </Container>




  );
}

export default SearchBar;