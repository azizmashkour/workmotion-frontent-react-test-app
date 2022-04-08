import React, { Component, FormEvent, ReactNode, Fragment } from 'react';
import { Options } from 'constants/Configs';

// An employee should have the following props to be valid
interface IState {
    readonly id?: number;
    firstname?: string;
    lastname?: string;
    role?: string;
    picUrl?: string;
}

// The `submitEmployee` function param should match the valid props specified in `IState` validator.
interface IProps {
    submitEmployee: (param: IState) => void;
}

/**
 * Returns the employee creation form.
 * @param {Object} props
 * @param {func} props.submitEmployee - The function called when the `Submit`  button is clicked.
 * @returns {JSX.Element}
 * @constructor
 */
class AddEmployee extends Component<IProps, IState> {
    constructor (props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // State
        this.state = {
            firstname: '',
            lastname: '',
            role: ''
        };
    }

    // Called after the form is submitted to clean the content and reset the initial state.
    resetForm () {
        this.setState({
            firstname: '',
            lastname: '',
            role: ''
        });
    }

    /** Called when the form submit button it clicked to send the form data to the parent component `submitEmployee` function.
     * @param {Object} FormEvent - The form data(Emplyee information) to save.
     */
    handleSubmit (evt: FormEvent) {
        evt.preventDefault();
        this.props.submitEmployee({...this.state});
        this.resetForm();
    }

    render(): ReactNode {
        return (
            <aside>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Add new employee</span>
                </h4>

                <form className="card p-2" onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="firstname" className="form-label" placeholder="Joe">Firstname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    id="firstname"
                                    required
                                    value={this.state.firstname}
                                    onChange={(evt) => this.setState({firstname: evt.target.value})}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="lastname" className="form-label" placeholder="Doe">Lastname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    id="lastname"
                                    required
                                    value={this.state.lastname}
                                    onChange={(evt) => this.setState({lastname: evt.target.value})}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select
                                    name="role"
                                    id="role"
                                    className="form-select"
                                    required
                                    value={this.state.role}
                                    onChange={(evt) => this.setState({role: evt.target.value})}
                                >
                                    {Options.map(option => (
                                        <Fragment key={option.id}>
                                            <option>{option.name}</option>
                                        </Fragment>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12">
                                <div className="d-grid gap-2 mt-2">
                                    <button disabled={!this.state.firstname?.length && !this.state.lastname?.length && !this.state.role?.length} className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </aside>
        );
    }
}

export default AddEmployee
