import { combineReducers } from 'redux';

import user from './user';
import nav from './navigation';

export default client => combineReducers({
  apollo: client.reducer(),
  nav,
  user
});