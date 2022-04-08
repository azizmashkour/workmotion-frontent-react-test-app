import React, { Component, ReactNode } from 'react';
import Header from '../Header/Header';
import EmployeeList from '../List/EmployeeList';
import AddEmployee from '../Form/AddEmployee';
import { Employee } from 'models';
import { fetchEmployees, saveEmployee, updateEmployee } from 'constants/ApiURL';

// employees should be of type Employee defined in the `models/employees.ts`
interface IState {
  employees: Employee[]
}

// An employee should have the following props to be valid
interface IEmployee {
  readonly id?: number;
  firstname: string;
  lastname: string;
  role: string;
  state: string;
  picUrl?: string;
}

/**
 * Returns the main component of the app.
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    // States
    this.state = {
      employees: []
    }

    this.createEmployee = this.createEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
  }

  /** CallBack that contact the moke Api service to submit the form data to create a new employee.
   * @param {Object} data - The form data(Emplyee information)
   * @returns {Object} - employees of type `IEmployee`.
   */
  createEmployee (data: any) {
    saveEmployee(data)
    .then<IEmployee>(resp => resp.json())
    .then(resp => {
      this.setState((state) => ({employees: [...state.employees, new Employee(resp)]}))
    })
    // TODO: It is possible to display an error here by catching exceptions.
  }

  updateEmployee (id: number, state: string) {
    updateEmployee(id, state)
    .then((resp) => resp.json())
    .then(item => {
        const employee = new Employee(item);
        const start = this.state.employees.findIndex(item => item.id === id)
        this.setState((state) => {
          const prevEmployees = [...state.employees]
          prevEmployees.splice(start, 1, employee)
          return { employees: prevEmployees };
        })
    })
  }

  // GET employees from the moke Api and replace the `employees` list from state.
  componentDidMount () {
      fetchEmployees()
      .then(resp => resp.json())
      .then((data: any[]) => {
        const employees = data.map(item => new Employee(item))
        this.setState(() => ({employees}))
      })
  }

  render(): ReactNode {
    return (
      <main className="container">
        <Header />

        <div className="row g-5 mx-5 mb-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <AddEmployee submitEmployee={this.createEmployee} />
          </div>
          <div className="col-md-7 col-lg-8">
            <EmployeeList data={this.state.employees} updateEmployee={this.updateEmployee}/>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
