import { useEffect, useState } from 'react';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AnimatedIcon from './AnimatedIcon';
import Icon from './Icon';

import { Box, Button, Fade, Grow, Paper, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import Background from '../assets/MountainsBG.webp';
import FabricImage from './objects/FabricImage';

export const LoginButton = () => {
  const {isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <>
      <div
        id={'bg'}
        className={'vignette'}
        style={{ height: '100vh', backgroundImage: `url(${Background})` }}
      ></div>
      <Box
        sx={{ height: '100vh', width: '100%', maxWidth: 500, margin: '0 auto' }}
      >
        <div
          style={{
            height: '90vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Grow in={true} timeout={400}>
            <Paper sx={{ p: 4, borderRadius: '20px' }} elevation={24}>
              <Typography variant='h1' color='text.secondary' id={'text1'}>
                Welcome to
              </Typography>
              <Typography variant='h1' color='text.secondary' id={'title'}>
                Grumbar
              </Typography>
              <hr></hr>

              <Typography variant='h1' color='text.secondary' id={'text2'}>
                a D&D mapping tool
              </Typography>
              <br />

              {timeLeft > 0 || isAuthenticated ? ( 
                <AnimatedIcon fill={'darkgreen'} />
              ) : (
                <Grow in={true} timeout={400}>
                  <div>
                    <Icon fill={'darkgreen'} />
                  </div>
                </Grow>
              )}
              <br />
              <br />
              {timeLeft > 0 || isAuthenticated ? (
                <Typography variant='h1' color='text.secondary' id={'text3'}>
                  Checking login info...
                </Typography>
              ) : (
                <Grow in={true} timeout={200}>
                  <Button
                    onClick={() => loginWithRedirect()}
                    variant='contained'
                    endIcon={<LoginIcon />}
                  >
                    Login / Continue as guest
                  </Button>
                </Grow>
              )}
              <FabricImage />
            </Paper>
          </Grow>
        </div>
      </Box>
    </>
  );
};
