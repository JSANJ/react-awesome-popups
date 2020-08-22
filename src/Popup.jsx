import React from 'react';
import PropTypes from 'prop-types';
import './popup-styles.css';

const propTypes = {
    unmount: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string
}

const defaultProps = {
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log("popup mounted");
        this.queueDelete(1000);
    }

    queueDelete(ms){
        setTimeout(
            ()=>{
                console.log("unmount:",this);
                this.props.unmount && this.props.unmount(this);
            },
            ms
        )
    }

    render() {
        return (
            <div className={this.props.type ? "react-awesome-popups-"+this.props.type : "react-awesome-popups-custom"} {...this.props}>
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


export { Popup };
