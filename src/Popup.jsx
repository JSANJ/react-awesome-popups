import React from 'react';
import PropTypes from 'prop-types';
import './popup-styles.css';
import CloseButton from './assets/close.svg';
const propTypes = {
    unmount: PropTypes.func,
    unmountkey: PropTypes.string,
    closeButton: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.any,
    type: PropTypes.string
}

const defaultProps = {
}

//TODO create BasePopupComponent
//TODO add close button
class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.props.erasekey && this.props.options && this.props.options.duration > 0 && this.queueDelete(
            this.props.options.duration,
            this.props.erasekey
        );
        this.queueDelete = this.queueDelete.bind(this);
        //TODO Set fade-in/fade-out animation
    }

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
            <div
                className={
                    `react-awesome-popups ${this.props.type ? "react-awesome-popups-"+ this.props.type : "react-awesome-popups-custom"}`
                }
                style={this.props.style}
            >
                <div className={"react-awesome-popups-popup-inner-container"}>
                    <div className={`react-awesome-popups-popup-content ${this.props.type ?
                        "react-awesome-popups-"+this.props.type+"-content"
                        : "react-awesome-popups-custom-content"}`}>
                        {this.props.children}

                    </div>
                    {
                        this.props.closeButton ?
                            this.props.closeButton :
                            <CloseButton
                                className={`react-awesome-popups-${this.props.type ? this.props.type : "custom"}-close-button`}
                                // src={CloseButton}
                                alt="Close Button"
                                onClick={()=>{this.queueDelete(0,this.props.erasekey)}}
                            />
                    }
                </div>
            </div>
        );
    }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

//Close icon from https://www.flaticon.com/authors/hirschwolf


export { Popup };
