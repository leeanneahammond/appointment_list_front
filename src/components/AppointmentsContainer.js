import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class AppointmentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: [],
      inputValue: ''
    }
	}

  getAppointments() {
    axios.get('/api/v1/appointments')
    .then(response => {
      this.setState({appointments: response.data})
    })
    .catch(error => console.log(error))
  }
  
  createAppointment = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios.post('/api/v1/appointments', {appointment: {title: e.target.value}})
      .then(response => {
        const appointments = update(this.state.appointments, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          appointments: appointments,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))      
    }    
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  updateAppointment = (e, id) => {
    axios.put(`/api/v1/appointments/${id}`, {appointment: {done: e.target.checked}})
    .then(response => {
      const appointmentIndex = this.state.appointments.findIndex(x => x.id === response.data.id)
      const appointments = update(this.state.appointments, {
        [appointmentIndex]: {$set: response.data}
      })
      this.setState({
        appointments: appointments
      })
    })
    .catch(error => console.log(error))      
  }

  deleteAppointment = (id) => {
    axios.delete(`/api/v1/appointment/${id}`)
    .then(response => {
      const appointmentIndex = this.state.appointments.findIndex(x => x.id === id)
      const appointments = update(this.state.appointments, {
        $splice: [[appointmentIndex, 1]]
      })
      this.setState({
        appointments: appointments
      })
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getAppointments()
	}

  render() {
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text" 
            placeholder="Add appointment" maxLength="80"
            onKeyPress={this.createAppointment}
            value={this.state.inputValue} onChange={this.handleChange} />
        </div>        
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.appointments.map((appointment) => {
              return(
                <li className="task" appointment={appointment} key={appointment.id}>
                  <input className="taskCheckbox" type="checkbox" 
                    checked={appointment.done}
                    onChange={(e) => this.updateAppointment(e, appointment.id)} />              
                  <label className="taskLabel">{appointment.title}</label>
                  <span className="deleteTaskBtn" 
                    onClick={(e) => this.deleteAppointment(appointment.id)}>
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

export default AppointmentsContainer