import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import DumpReducer from './reducers/DumpReducer'
import TruckReducer from './reducers/TruckReducer'

const reducer = combineReducers({
  DumpReducer,
  TruckReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store