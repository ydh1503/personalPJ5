import { toCamelCase } from '../../utils/transformCase.js';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  return toCamelCase(rows[0]);
};

export const findLastLocationById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_LAST_LOCATION_BY_ID, [id]);
  return toCamelCase(rows[0]);
};

export const createUser = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id]);
  await pools.USER_DB.query(SQL_QUERIES.CREATE_LAST_LOCATION, [id]);
  return { id };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

export const updateLastLocation = async (id, x, y) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_LAST_LOCATION, [x, y, id]);
};
