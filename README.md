# Redyna

Re[dux] Dyna[mic]

Add / remove dynamic reducer for redux.

## Usage

```js
import { createStore } from 'redux';
import { enhanceWithRedyna, addReducer, removeReducer } from 'redyna';

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

// Add a newReducer
store.dispatch(addReducer(newReducer));

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello' }

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello hello' }

// Remove newReducer
store.dispatch(removeReducer(newReducer));

store.dispatch({ type: 'APPEND_HELLO' });
// { num: 1, word: 'hello hello' }


```

## API

### enhanceWithRedyna(createStore) => createStore

Enhance createStore with redyna.

Usage:

``` js
const store = enhanceWithRedyna(createStore)(reducer, initState, enhancer);
```

### addReducer(reducer: Function)

Create a common redux action for registering reducer (Make sure reducer is singleton).

Usage:

``` js
store.dispatch(addReducer(reducer));
```

### removeReducer(reducer: Function)

Create a common redux action for unregistering reducer (Make sure reducer is singleton).

Usage:

``` js
store.dispatch(removeReducer(reducer));
```

## LICENSE

MIT

