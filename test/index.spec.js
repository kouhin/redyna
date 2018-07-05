import { createStore } from 'redux';
import { enhanceWithRedyna, addReducer, removeReducer } from '../src/index';

function counter(state = { num: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        num: state.num + 1
      };
    case 'DECREMENT':
      return {
        num: state.num - 1
      };
    default:
      return state;
  }
}

const store = enhanceWithRedyna(createStore)(counter);

test('Register and unregister reducer', () => {
  store.dispatch({ type: 'INCREMENT' });
  expect(store.getState()).toEqual({ num: 1 });
  store.dispatch({ type: 'APPEND_HELLO' });
  expect(store.getState()).toEqual({ num: 1 });

  function newReducer(state = {}, action) {
    if (action.type === 'APPEND_HELLO') {
      return {
        ...state,
        word: [state.word || '', 'hello'].filter(x => x).join(' ')
      };
    }
    return state;
  }

  store.dispatch(addReducer(newReducer));
  store.dispatch({ type: 'APPEND_HELLO' });
  expect(store.getState()).toEqual({ num: 1, word: 'hello' });

  store.dispatch({ type: 'APPEND_HELLO' });
  expect(store.getState()).toEqual({ num: 1, word: 'hello hello' });

  store.dispatch(removeReducer(newReducer));
  store.dispatch({ type: 'APPEND_HELLO' });
  expect(store.getState()).toEqual({ num: 1, word: 'hello hello' });
});
