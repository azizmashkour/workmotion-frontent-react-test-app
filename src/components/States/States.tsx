/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, MouseEvent, ReactNode, Fragment } from 'react';
import { Statuses } from 'constants/Configs';
import './States.scss';

// The States component should have the following props with the specified types to be valid.
interface IProps {
    state: string;
    update: (state: string) => void
}

/**
 * Returns the States component.
 * @returns {JSX.Element}
 * @constructor
 */
class States extends Component<IProps> {
    constructor (props: IProps) {
        super(props);
        this.toggleNext = this.toggleNext.bind(this);
    }

    /** Called when any `State` button is clicked from the employees list.
     * @param {evt} evt - The MouseEvent<HTMLAnchorElement>.
     * @param {value} - The MouseEvent<HTMLAnchorElement>.
     */
    toggleNext (evt: MouseEvent<HTMLAnchorElement>, value: string) {
        evt.preventDefault();

        Statuses.indexOf(value) > Statuses.indexOf(this.props.state) && this.props.update(value);
    }

    render(): ReactNode {
        return (
            <div className="btn-group btn-breadcrumb w-100">
                {Statuses.map(status => (
                    <Fragment key={status}>
                        <a
                            href="#"
                            onClick={(evt) => this.toggleNext(evt, status)}
                            className={`btn btn-outline-primary text-dark py-4 d-flex items-center justify-content-center ${this.props.state === status ? 'active' : ''}`}
                        >
                            {status}
                        </a>
                    </Fragment>
                ))}
            </div>
        );
    }
}

export default States;
