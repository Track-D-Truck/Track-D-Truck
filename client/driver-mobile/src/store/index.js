import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'
import { resultReducer } from './reducers/resultReducer'
import { positionReducer } from './reducers/positionReducer'
import { historyReducer } from './reducers/historyReducer'

const reducers = combineReducers({
    userReducer,
    resultReducer,
    positionReducer,
    historyReducer
})

const middlewares = applyMiddleware(thunk)

export const store = createStore(reducers, middlewares)