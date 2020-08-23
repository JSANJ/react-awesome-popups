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

const fadeAnimStates = {
    start: {
        style: {
            opacity: 0,
        },
        duration: 0, //How long this will stay in this state
        nextStateKey: "in",
    },
    in: {
        style: {
            opacity: 1,
        },
        duration: 2000,
        nextStateKey: "hold",
    },
    hold: {
        style: {
            opacity: 1,
        },
        duration: 12000,
        nextStateKey: "out",
    },
    out: {
        style: {
            opacity: 0,
        },
        duration: 2000,
        unmountOnComplete: true,
    },
}

const clipAnimStates = {
    start: {
        style: {
            clipPath: 'inset(0 100% 0 0)',
        },
        duration: 0,
        nextStateKey: "in",
    },
    in: {
        style: {
            clipPath: 'inset(0 0 0 0)',
        },
        duration: 500,
        nextStateKey: "hold",
    },
    hold: {
        style: {
            clipPath: 'inset(0 0 0 0)',
        },
        duration: 12000,
        // nextStateKey: "out",
    },
    out: {
        style: {
            clipPath: 'inset(0 100% 0 0)',
        },
        duration: 500,
        unmountOnComplete: true,
    }
}
const defaultProps = {
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
            animStates: clipAnimStates,
            animState: clipAnimStates["start"],
        }

        this.animThread = null;

        //TODO Set fade-in/fade-out animation
    }
    componentDidMount() {
        this.queueState(this.state.animState, this.state.animStates);
    }

    //TODO fix animation transition durations
    async queueState(newState, animStates){
        console.log("new state:", newState);
        this.setState({animState: newState},()=>{
            const duration = newState.duration;
            if (newState.unmountOnComplete){
                this.queueDelete(duration, this.props.erasekey)
                return;
            }
            if (newState.nextStateKey){
                const nextState = animStates[newState.nextStateKey];
                console.log("next state:",nextState);
                this.animThread = setTimeout(()=>{
                    this.queueState(nextState, animStates)
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
        return (
            <div
                className={
                    `react-awesome-popups react-awesome-popups-${this.props.type ? this.props.type : "custom"}`
                }
                style={{
                    ...(this.state.animState ? {
                        ...this.state.animState.style,
                        transition: `all ${this.state.animState.duration}ms ease`,
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
