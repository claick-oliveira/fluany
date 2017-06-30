import { findIndex, propEq, find } from 'ramda';
export const getIndexThingById = (state, id) => findIndex(propEq('id', id), state);
export const getElementById = (id, state) => find(propEq('id', id), state);
