import { Employee } from 'models';
import React, { Component, Fragment, ReactNode } from 'react';
import States from '../States/States';

interface IState {
    employees: Employee[]
}

// data should be of type Employee defined in the `models/employees.ts`
interface IProps {
    data: Employee[];
    updateEmployee: (id: number, state: string) => void
}

/**
 * Returns the list of available employees.
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
class EmployeeList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        // States
        this.state = {
          employees: this.props.data
        }
        this.updateEmployeeState = this.updateEmployeeState.bind(this);
        this.searchEmployees = this.searchEmployees.bind(this);
    }

    componentDidUpdate (prevProps: any, prevState: any) {
      if (prevState.employees !== this.props.data) {
        this.setState({employees: this.props.data})
      }
    }

    /** Called when any `State` changes from the employees list.
     * @param {id} data - The id of the given employee to update.
     * @param {state} state - The new state of the given employee.
     * @returns {Object} - The new state of the employees list that should contain the new employee.
     */
    updateEmployeeState (id: number, state: string) {
        this.props.updateEmployee(id, state);
    }

    /** Called when there is a keywors in the search input.
     * @param {string} query - The query params.
     * @returns {Object} - The new state of the employees list that match the query params.
     */
     // FIXME: This is supposed to work but was just a nice to have. To pair during tech interview?
    searchEmployees (query: string) {
      if (query.trim().length) {
        const results = this.props.data.filter((employee) => employee.fullName.toLowerCase().includes(query));
        console.log(results)
        this.setState((prevState) => ({
          ...prevState,
          employees: results
        }));
      } else {
        this.setState({employees: this.props.data})
      }
    }

    render(): ReactNode {
        return (
            <div>
              <div className="d-flex bd-highlight mb-3">
                <div className="bd-highlight"><h4 className="me-auto mb-3">Emplyees - List</h4></div>
                  {/* TODO: To be completed if/and I have the chance.
                      <div className="ms-auto bd-highlight">
                      <input
                          type="text"
                          className="form-control ml-auto"
                          name="search"
                          id="search"
                          onChange={(evt) => this.searchEmployees(evt.target.value)}
                          placeholder="Search employee"
                      />
                      </div>
                  */}
              </div>
                <ul className="list-group">
                    {this.state.employees.map(employee => (
                      <Fragment key={employee.id}>
                          <li className="list-group-item align-items-start py-3">
                              <div className="d-flex w-100 mb-2 items-center align-items-center">
                                  <img src={`${process.env.PUBLIC_URL}/${employee.picUrl}`} className="rounded-circle profile-pic" alt="Profile pic" />
                                  <h5 className="ms-3 me-auto"> { employee.fullName } </h5>
                                  <small> { employee.role } </small>
                              </div>
                              <States state={employee.state} update={(state: string) => this.updateEmployeeState(employee.id as number, state)} />
                          </li>
                      </Fragment>
                    ))}
                </ul>
            </div>
        );
    }
}

export default EmployeeList
