import {createSelector} from 'reselect';
import {budgetAndSchedulingSelector} from './globals';

export const budgetTypeSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => budget.budgetType
);

export const budgetValueSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => budget.budgetValue || ''
);

export const isScheduledSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => !!budget.scheduling
);

export const schedulingStartDateSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => budget.scheduling?.startDateTime
);

export const schedulingEndDateSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => budget.scheduling?.endDateTime
);

export const schedulingDayPartingPartsSelector = createSelector(
  [budgetAndSchedulingSelector],
  budget => budget.scheduling?.dayPartingParts
);

export const isCboSelector = createSelector([budgetAndSchedulingSelector], budget => budget.isCBO);
