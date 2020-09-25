import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import { chartData } from '../../utils/mockData/chart';
import { Typography } from '@material-ui/core';

export const Chart: React.FC = () => {
  const theme = useTheme();
  console.log(chartData);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Today
      </Typography>
      <Bar data={chartData} width={886} height={169} />
    </React.Fragment>
  );
};
