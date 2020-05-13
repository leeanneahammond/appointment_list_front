import { combineReducers } from 'redux'
import appointmentsReducer from './appointmentsReducer'

const rootReducer = combineReducers({
    appointments: appointmentsReducer
});

export default rootReducer;