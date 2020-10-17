import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'


const reducers = combineReducers({
    userReducer
})

const middlewares = applyMiddleware(thunk)

const store = createStore(reducers, middlewares)

export default store