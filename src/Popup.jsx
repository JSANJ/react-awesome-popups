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

//TODO get transition and set style
function buildTransition(style,duration){
    let s = "";
    for (let i = 0; i < style.length; ++i) {
        //TODO convert style[i] to dash-case
        s += `${style[i]} ${duration}ms ease`
        if (i < style.length-1){
            s += ","
        }
    }
    return s;
}

//TODO create BasePopupComponent
//TODO add close button
class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.queueDelete = this.queueDelete.bind(this);
        this.startDelete = this.startDelete.bind(this);
        this.doDelete = this.doDelete.bind(this);

        //TODO set animStates from API (props)

        this.state = {
            animStates: props.animStates,
            animState: props.animStates["start"],
        }

        this.animThread = null;

        //TODO Set fade-in/fade-out animation
    }
    componentDidMount() {
        this.queueState(this.state.animState);
    }

    //TODO fix animation transition durations
    async queueState(newState){
        console.log("new state:", newState);
        this.setState({animState: newState},()=>{
            const duration = newState.duration;
            if (newState.unmountOnComplete){
                this.queueDelete(duration, this.props.erasekey)
                return;
            }
            if (newState.nextStateKey){
                const nextState = this.state.animStates[newState.nextStateKey];
                console.log("next state:",nextState);
                this.animThread = setTimeout(()=>{
                    this.queueState(nextState)
                }, duration)
            }
        })
    }
    startDelete(){
        if (this.animThread){
            //Cancel current anim
            clearTimeout(this.animThread);
        }
        this.queueState(this.state.animStates["out"],this.state.animStates);
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
                                onClick={()=>{this.startDelete()}}
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
