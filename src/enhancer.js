import { REGISTER_REDUCER, UNREGISTER_REDUCER } from './actions';

const compose = reducers => (state, action) =>
  reducers.reduce((prevState, reducer) => reducer(prevState, action), state);

export default function enhanceWithRedyna(createStore) {
  return (reducer, ...args) => {
    let reducers = [reducer];
    const store = createStore(reducer, ...args);
    const next = store.dispatch;
    store.dispatch = action => {
      if (typeof action !== 'object') {
        return next(action);
      }
      const { type, payload } = action;
      if (typeof payload !== 'function') {
        return next(action);
      }
      switch (type) {
        case REGISTER_REDUCER: {
          const idx = reducers.indexOf(payload);
          if (idx === -1) {
            reducers = [...reducers, payload];
            store.replaceReducer(compose(reducers));
          }
          return action;
        }
        case UNREGISTER_REDUCER: {
          const idx = reducers.indexOf(payload);
          if (idx !== -1) {
            reducers = reducers.slice(0, idx).concat(reducers.slice(idx + 1));
            store.replaceReducer(compose(reducers));
          }
          return action;
        }
        default:
          return next(action);
      }
    };
    return store;
  };
}
