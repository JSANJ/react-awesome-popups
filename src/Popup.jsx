import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

//TODO
const propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    styles: PropTypes.object
}

//TODO
const defaultProps = {
    styles: {
        label: {
            fontFamily: 'Comic Sans MS',
            color: 'green'
        },
        input: {
            background: '#ddd',
            border: '1px solid red'
        }
    }
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.type ? "react-awesome-popups-"+this.props.type : "react-awesome-popups-custom"}>
                <div className={this.props.type ?
                    "react-awesome-popups-"+this.props.type+"-text"
                    : "react-awesome-popups-custom-text"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;


export {Popup};
