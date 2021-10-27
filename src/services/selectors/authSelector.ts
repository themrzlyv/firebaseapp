import { createSelector } from 'reselect';
import { getAppTools } from './rootSelectors';


export const authSelector = createSelector(
  getAppTools,
  ({auth}) => auth
);