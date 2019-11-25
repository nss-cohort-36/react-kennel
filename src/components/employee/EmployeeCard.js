import React, { Component } from 'react';
import { Link } from "react-router-dom";

class EmployeeCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h2>Name: <span className="card-petname">{this.props.employee.name}</span></h2>
          <button type="button"
            onClick={() => { this.props.history.push(`/employees/${this.props.employee.id}/edit`) }}>Edit</button>
          <button type="button" onClick={() => this.props.deleteAnimal(this.props.employee.id)}>Delete</button>
          <Link to={`/employees/${this.props.employee.id}`}><button>Details</button></Link>
        </div>
      </div>
    );
  }
}

export default EmployeeCard;
