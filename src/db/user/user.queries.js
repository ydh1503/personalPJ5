export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE id = ?',
  CREATE_USER: 'INSERT INTO user (id) VALUES (?)',
  UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
  CREATE_LAST_LOCATION: 'INSERT INTO last_location (id) VALUES (?)',
  UPDATE_LAST_LOCATION: 'UPDATE last_location SET x = ?, y = ? WHERE id = ?',
  FIND_LAST_LOCATION_BY_ID: 'SELECT * FROM last_location WHERE id = ?',
};
