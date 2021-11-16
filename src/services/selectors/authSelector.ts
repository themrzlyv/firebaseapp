import { createSelector } from 'reselect';
import { getAppTools } from './rootSelectors';


export const authSelector = createSelector(
  getAppTools,
  ({auth}) => auth
);

export const postsSelector = createSelector(
  getAppTools,
  ({ posts }) => posts
);