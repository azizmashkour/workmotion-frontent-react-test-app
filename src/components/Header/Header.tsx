import React, { Component, ReactNode } from 'react';
import logo from 'assets/logo.svg';

/**
 * Returns the Header component.
 * @returns {JSX.Element}
 * @constructor
 */
class Header extends Component {
    render(): ReactNode {
        return (
            <div className="py-5 text-center">
                <img className="d-block mx-auto mb-4" src={logo} alt="" width="72" height="57" />
                <h2>Workmotion - Employees</h2>
                <p className="lead">
                    Below is le list of our employees. With the side form, you can add new employee and manage their
                    state directly with the breadcrumb component. Enjoy 🥳 🎉!
                </p>
            </div>
        );
    }
}

export default Header
