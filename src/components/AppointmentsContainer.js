import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadAppointments, addAppointment, toggleAppointment, deleteAppointment } from '../actions/actionCreators'

class AppointmentsContainer extends Component {

  getAppointments() {
    axios.get('/api/v1/appointments')
    .then(response => {
      this.props.dispatch(loadAppointments(response.data));
    })
    .catch(error => console.log(error))
  }

  createAppointment = (e) => {
    if (e.key === 'Enter' && !(this.getTitle.value === '')) {
      axios.post('/api/v1/appointments', {appointment: {title: this.getTitle.value}})
      .then(response => {
        this.props.dispatch(addAppointment(response.data.id, response.data.title))
        this.getTitle.value = '';
      })
      .catch(error => console.log(error))      
    }    
  }

  updateAppointment = (e, id) => {
    axios.put(`/api/v1/appointments/${id}`, {appointment: {done: e.target.checked}})
    .then(response => {
      this.props.dispatch(toggleAppointment(id))
    })
    .catch(error => console.log(error))      
  }

  deleteAppointment = (id) => {
    axios.delete(`/api/v1/appointments/${id}`)
    .then(response => {
      this.props.dispatch(deleteAppointment(id))
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getAppointments();
	}

  render() {
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text" placeholder="Add a task" maxLength="50"
            onKeyPress={this.createAppointment} ref={(input)=>this.getTitle = input} />
        </div>        
        <div className="listWrapper">
          <ul className="taskList">
            {this.props.appointments.map((appointment) => {
              return(
                <li className="task" key={appointment.id} id={appointment.id}>
                  <input className="taskCheckbox" type="checkbox" 
                    checked={appointment.done} onChange={(e) => this.updateAppointment(e, appointment.id)} />              
                  <label className="taskLabel">{appointment.title}</label>
                  <span className="deleteTaskBtn" onClick={(e) => this.deleteAppointment(appointment.id)}>
                    x
                  </span>
                </li>
              )       
            })}        
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments
  }
}

export default connect(mapStateToProps)(AppointmentsContainer)