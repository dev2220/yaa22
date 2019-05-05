import moment from 'moment';

export const BUDGET_TYPE_DAILY = 'DAILY';
export const BUDGET_TYPE_LIFETIME = 'LIFETIME';

export const budgetTypes = [
  {id: BUDGET_TYPE_DAILY, name: 'Daily Budget', min: 0.1},
  {id: BUDGET_TYPE_LIFETIME, name: 'Lifetime Budget', min: 0.1},
];

export const budgetAndScheduling = () => ({
  startDateTime: moment().format(),
  endDateTime: moment()
    .add(1, 'M')
    .format(),
  dayPartingParts: [],
});
