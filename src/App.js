  
import React, { Component } from 'react';
import './App.css';
import AppointmentsContainer from './components/AppointmentsContainer'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Appointment List</h1>
        </div>
        <AppointmentsContainer />
      </div>
    );
  }
}

export default App;