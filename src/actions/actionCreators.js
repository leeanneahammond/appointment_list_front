import { LOAD_APPOINTMENTS, ADD_APPOINTMENT, TOGGLE_APPOINTMENT, DELETE_APPOINTMENT } from '../actions/actionTypes'

export function loadAppointments(appointments) {
  return { type: LOAD_APPOINTMENTS, appointments: appointments }
}

export function addAppointment(id, title) {
  return { type: ADD_APPOINTMENT, id: id, title: title }
}

export function toggleAppointment(index) {
  return { type: TOGGLE_APPOINTMENT, index: index }
}

export function deleteAppointment(index) {
  return { type: DELETE_APPOINTMENT, index: index }
}