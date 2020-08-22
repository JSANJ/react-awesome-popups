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
        this.props.erasekey && this.props.options && this.props.options.duration > 0 && this.queueDelete(this.props.options.duration,this.props.erasekey);

    }

    // componentWillMount(){
    // }

    async queueDelete(ms,key){
        setTimeout(
            ()=>{
                this.props.unmountkey && this.props.unmountkey(key);
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
