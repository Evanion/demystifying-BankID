import { Link, Typography } from '@material-ui/core';
import * as React from 'react';

export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://regent.se/">
        Regent AB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
