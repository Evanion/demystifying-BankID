import { DateTime } from 'luxon';
const now = DateTime.local();

const seedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log('NOW', now.minus({ day: 1 }));
export const chartData = {
  labels: seedArray.map((day) => now.minus({ day }).day).reverse(),
  datasets: [
    {
      label: '# of hours',
      data: seedArray.map((day) =>
        now.minus({ day }).weekday < 6 ? randomInteger(6, 9) : 0
      ),
    },
  ],
};

function createData(time, amount) {
  return { time, amount };
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
seedArray.map((day) => {
  const current: DateTime = !day ? now : now.minus({ day });
  return createData(current.day, current.weekday < 6 ? randomInteger(6, 9) : 0);
});
*/
