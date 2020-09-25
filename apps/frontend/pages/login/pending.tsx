import * as React from 'react';
import QRCode from 'qrcode.react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useAuth } from '../../utils/auth';
import { messages } from '../../utils/auth/messages';
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export const Pending: React.FC = () => {
  const { auth, getAuth, collect } = useAuth();
  const classes = useStyles();
  React.useEffect(() => {
    const onMount = async () => {
      const tokens = await getAuth();
      await collect(tokens.orderRef);
    };
    onMount();
  }, [getAuth, collect]);

  return !auth.loading && !auth.error && auth.fetched ? (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in with Mobile BankID
        </Typography>

        <div style={{ paddingTop: 20 }}></div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <QRCode
              value={`bankid:///?autostarttoken=${auth.tokens.autoStartToken}`}
            />
          </Grid>
          <Grid item>
            <Typography>
              {messages[auth.collect.messageId]}{' '}
              {auth.updatedAt.toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  ) : null;
};

export default Pending;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
