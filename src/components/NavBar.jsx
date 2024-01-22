import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const NavBar = () => {

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Link className="navBar" to="/">Home</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;