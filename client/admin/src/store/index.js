import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import DumpReducer from './reducers/DumpReducer'
import TruckReducer from './reducers/TruckReducer'
import DriverReducer from './reducers/DriverReducer'

const reducer = combineReducers({
  DumpReducer,
  TruckReducer,
  DriverReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store