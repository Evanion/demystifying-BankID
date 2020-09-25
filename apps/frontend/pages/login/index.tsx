/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Route } from '../../utils/navigation';
import { useAuth } from '../../utils/auth';
import { useRouter } from 'next/dist/client/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import QRIcon from '@material-ui/icons/CameraAlt';
import { Avatar, Grid, Paper, TextField } from '@material-ui/core';
import { useLoginStyles } from '../../theme/login';
import { Copyright } from '../../components/CopyRight';

export const Index: React.FC = () => {
  const router = useRouter();
  const classes = useLoginStyles();
  const { auth, setPnr, startAuth } = useAuth();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPnr(event.target.value);
  };

  const onOtherDevice = () => router.push(Route.LoginPending);
  const onSameDevice = async () => {
    const { same } = await startAuth();
    router.push(same);
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      direction="row-reverse"
    >
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        style={{ minHeight: '100vh' }}
      >
        <Grid className={classes.paper} item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in with BankID
          </Typography>
          <form className={classes.form}>
            <div style={{ paddingTop: 20 }}>
              <Grid container spacing={3} direction="column">
                <Grid item xs>
                  <Button fullWidth variant="contained" onClick={onSameDevice}>
                    BankID on this device
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={onOtherDevice}
                    startIcon={<QRIcon />}
                    size="large"
                  >
                    Scan QR code
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </Grid>
        <Grid item className={classes.footer}>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Index;
