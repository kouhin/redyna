# Redyna

Re[dux] Dyna[mic]

Register / Unregister reducer for redux.

## Usage

```js
import { createStore } from 'redux';
import { enhanceWithRedyna, registerReducer, unregisterReducer } from 'redyna';

function counter(state = { num: 0 }, action) {
  switch (action.type) {
  case 'INCREMENT':
    return {
      num: state.num + 1,
    };
  case 'DECREMENT':
    return {
      num: state.num - 1,
    };
  default:
    return state;
  }
}

const store = enhanceWithRedyna(createStore)(counter);

store.dispatch({ type: 'INCREMENT' })
// { num: 1 }

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1 }

function newReducer(state = {}, action) {
  if (action.type === 'APPEND_HELLO') {
    return {
      ...state,
      word: [state.word || '', 'hello'].filter(x => x).join(' ')
    };
  }
  return state;
}

// Register newReducer
store.dispatch(registerReducer(newReducer));

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello' }

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello hello' }

// Unregister newReducer
store.dispatch(unregisterReducer(newReducer));

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello hello' }


```

## API

### enhanceWithRedyna(createStore) => createStore

Enhance createStore with redyna.

### registerReducer(reducer: Function)

Create a common redux action for registering reducer (Make sure reducer is singleton).


### unregisterReducer(reducer: Function)

Create a common redux action for unregistering reducer (Make sure reducer is singleton).


## LICENSE

MIT

