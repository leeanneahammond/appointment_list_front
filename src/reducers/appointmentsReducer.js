import { LOAD_APPOINTMENTS, ADD_APPOINTMENT, TOGGLE_APPOINTMENT, DELETE_APPOINTMENT } from '../actions/actionTypes'

function appointmentsReducer(state = [], action) 
{
    switch(action.type) {
        case LOAD_APPOINTMENTS:
            return action.appointment;

        case ADD_APPOINTMENT:
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    appointment_date: action.date,
                    done: false
                }
            ];

        case TOGGLE_APPOINTMENT:
            return state.map(appointment => (appointment.id === action.index) 
                  ? {...appointment, done: !appointment.done}
                  : appointment
            );

        case DELETE_APPOINTMENT:
            return state.filter(appointment => appointment.id !== action.index);

        default:
            return state;    
    }
}

export default appointmentsReducer
