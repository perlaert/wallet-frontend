import { createReducer, combineReducers } from '@reduxjs/toolkit';
import actions from '../auth/authActions';

const user = '';

const authUser = createReducer(user, {
  [actions.registerSuccess]: () => user,
  [actions.loginSuccess]: (_, action) => action.payload.user,
  [actions.logoutSuccess]: () => user,
  [actions.getCurrentUserSuccess]: (_, { payload }) => payload,

  // [actions.registerError]: () => user,
  // [actions.loginError]: () => user,
});

const isAuth = createReducer(false, {
  // [actions.registerSuccess]: () => true,
  [actions.getCurrentUserSuccess]: () => true,
  [actions.getCurrentUserError]: () => false,
  [actions.loginError]: () => false,
  [actions.loginSuccess]: () => true,
  [actions.logoutSuccess]: () => false,
});
const isRegistered = createReducer(false, {
  [actions.registerSuccess]: () => true,
  [actions.registerError]: () => false,
});

const token = createReducer(null, {
  // [actions.registerSuccess]: (_, { payload }) => payload.token,
  [actions.loginSuccess]: (_, { payload }) => payload.accessToken,
  [actions.getCurrentUserError]: () => null,
  [actions.logoutSuccess]: () => null,
  [actions.loginError]: () => null,
});

const tokenExpireTime = createReducer(null, {
  [actions.loginSuccess]: (_, { payload }) => payload.accessTokenExpireAt,
  [actions.getCurrentUserError]: () => null,
  [actions.logoutSuccess]: () => null,
  [actions.loginError]: () => null,
});

const error = createReducer(null, {
  [actions.registerError]: (_, { payload }) => payload,
  [actions.loginError]: (_, { payload }) => payload,
  [actions.logoutError]: (_, { payload }) => payload,
  [actions.getCurrentUserError]: (_, { payload }) => payload,
  // [actions.registerSuccess]: () => null,
  // [actions.loginSuccess]: () => null,
});

export default combineReducers({
  authUser,
  isAuth,
  token,
  error,
  tokenExpireTime,
  isRegistered,
});
