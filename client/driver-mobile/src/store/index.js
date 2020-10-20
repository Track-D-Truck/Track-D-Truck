import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'
import { resultReducer } from './reducers/resultReducer'
import { positionReducer } from './reducers/positionReducer'


const reducers = combineReducers({
    userReducer,
    resultReducer,
    positionReducer
})

const middlewares = applyMiddleware(thunk)

export const store = createStore(reducers, middlewares)