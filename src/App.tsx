import './App.css';
import React, { Suspense } from 'react';
import logo from './e-auction.jpg';
import { makeStyles } from '@material-ui/core/styles';
import  {AppBar,Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import  {useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
const FetchDetails = React.lazy(() => import('./FetchDetails'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const size = {
    height: 70,
    width: 70
};
  return (
    <div className="App">
     <AppBar position="static">
        <Toolbar>
        <img src={logo} style={size} alt="Logo" />
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fetch Details
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <FetchDetails/>
        </section>
      </Suspense>
    </ErrorBoundary>
      
      
    </div>
  );
}

export default App;
