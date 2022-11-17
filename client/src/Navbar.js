import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" style={{backgroundColor:"15406d"}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="#15406d"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          
          <h1 style={{display:"flex", justifyContent:"center",alignItems:"center"}}> JustPost</h1>
        </Typography>

        <Button color="inherit" onClick={handleOpen}>
        
        </Button>
      </Toolbar>
    
    </AppBar>
  );
};

export default Navbar;