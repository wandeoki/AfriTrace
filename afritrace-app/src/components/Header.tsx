import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';


function Header() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AfriTrace
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/create-product">
              Create Product
            </Button>
            <Button color="inherit" component={Link} to="/certify">
              Certify
            </Button>
            <Button color="inherit" component={Link} to="/disputes">
              Disputes
            </Button>
            <Button color="inherit" component={Link} to="/carbon-offset">
              Carbon Offset
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  