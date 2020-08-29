import React from 'react';
import PropTypes from 'prop-types';
import './awesome-popup-styles.css';
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

function buildTransition(style,duration){
    let s = "";
    let i = 0;
    for (const key in style) {
        const styleKey = key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
        s += `${styleKey} ${duration}ms ease`
        if (i < style.length-1){
            s += ","
        }
        i += 1;
    }
    return s;
}

//TODO create BasePopupComponent
//TODO add close button
class AwesomePopup extends React.Component {
    constructor(props) {
        super(props);

        this.queueDelete = this.queueDelete.bind(this);
        this.startUnmount = this.startUnmount.bind(this);
        this.doDelete = this.doDelete.bind(this);

        this.state = {
            animState: props.animStates["start"],
        }

        this.animThread = null;
    }
    componentDidMount() {
        this.queueState(this.state.animState);
    }

    async queueState(newState){
        this.setState({animState: newState},()=>{
            const duration = newState.duration;
            if (newState.unmountOnComplete){
                this.queueDelete(duration, this.props.popupId)
                return;
            }
            if (newState.nextStateKey){
                const nextState = this.props.animStates[newState.nextStateKey];
                this.animThread = setTimeout(()=>{
                    this.queueState(nextState)
                }, duration)
            }
        })
    }
    startUnmount(){
        if (this.animThread){
            //Cancel current anim
            clearTimeout(this.animThread);
        }
        this.queueState(this.props.animStates["out"],this.props.animStates);
    }

    async queueDelete(ms,key){
        setTimeout(
            ()=>{this.doDelete(key)},
            ms
        )
    }
    doDelete(key){
        this.props.unmountkey && this.props.unmountkey(key);
    }


    render() {
        const animState = this.state.animState;
        return (
            <div
                className={
                    `react-awesome-popups react-awesome-popups-${this.props.type ? this.props.type : "custom"}`
                }
                style={{
                    ...(animState ? {
                        ...animState.style,
                        transition: buildTransition(animState.style,animState.duration)
                    } : {}),
                    ...this.props.style
                }}
            >
                <div className={"react-awesome-popups-popup-inner-container"}>
                    <div className={`react-awesome-popups-popup-content react-awesome-popups-popup-content-${this.props.type ? this.props.type : "custom"}`}>
                        {this.props.children}

                    </div>
                    {
                        this.props.closeButton ?
                            this.props.closeButton :
                            <CloseButton
                                className={`react-awesome-popups-close-button react-awesome-popups-close-button-${this.props.type ? this.props.type : "custom"}`}
                                // src={CloseButton}
                                alt="Close Button"
                                onClick={()=>{this.startUnmount()}}
                            />
                    }
                </div>
            </div>
        );
    }
}

AwesomePopup.propTypes = propTypes;
AwesomePopup.defaultProps = defaultProps;

//Close icon from https://www.flaticon.com/authors/hirschwolf


export { AwesomePopup };
