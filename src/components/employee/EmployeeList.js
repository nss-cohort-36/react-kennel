import React, { Component } from 'react'
import EmployeeCard from './EmployeeCard'
import EmployeeManager from '../../modules/EmployeeManager'

class EmployeeList extends Component {
  //define what this component needs to render
  state = {
    employees: [],
  }

  componentDidMount() {
    EmployeeManager.getAll()
      .then((employeesArray) => {
        this.setState({
          employees: employeesArray
        })
      })
  }

  deleteEmployee = id => {
    EmployeeManager.delete(id)
      .then(() => {
        EmployeeManager.getAll()
          .then((newEmployees) => {
            this.setState({
              employees: newEmployees
            })
          })
      })
  }

  render() {
    return (
      <React.Fragment>
        <section className="section-content">
          <button type="button"
            className="btn"
            onClick={() => { this.props.history.push("/employees/new") }}>
            Add Employee
          </button>
        </section>
        <div className="container-cards">
          {this.state.employees.map(animal =>
            <EmployeeCard
              key={animal.id}
              employee={animal}
              deleteEmployee={this.deleteEmployee}
              {...this.props}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default EmployeeList
