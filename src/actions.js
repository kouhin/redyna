export const REGISTER_REDUCER = '@redyna/REGISTER';
export const UNREGISTER_REDUCER = '@redyna/UNREGISTER';

export function registerReducer(reducer) {
  if (typeof reducer !== 'function') {
    throw new Error('Must be function');
  }
  return {
    type: REGISTER_REDUCER,
    payload: reducer
  };
}

export function unregisterReducer(reducer) {
  if (typeof reducer !== 'function') {
    throw new Error('Must be function');
  }
  return {
    type: UNREGISTER_REDUCER,
    payload: reducer
  };
}
