import React from 'react';
import PropTypes from 'prop-types';
import './awesome-popup-styles.css';
import CloseButton from './assets/close.svg';

const propTypes = {
    onUnmount: PropTypes.func,
    popupId: PropTypes.string,
    closeButton: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.any,
    type: PropTypes.string,
    animStates: PropTypes.object,
    onStart: PropTypes.function,
    onStartComplete: PropTypes.function,
    onEnd: PropTypes.function,
    onEndComplete: PropTypes.function,
    onClick: PropTypes.function,
};

const defaultProps = {
    onUnmount: ()=>{},
    onStart: ()=>{},
    onStartComplete: ()=>{},
    onEnd: ()=>{},
    onEndComplete: ()=>{},
    onClick: ()=>{},
};

/**
 * Creates the transition css based on style object keys
 * @param {object} style
 * @param {number} duration
 * @return {string} transition - in css transition format
 */
function buildTransition(style, duration) {
    let s = '';
    let i = 0;
    for (const key in style) {
        if (typeof key === 'string' || key instanceof String) {
            const styleKey = key.replace(
                /([a-zA-Z])(?=[A-Z])/g,
                '$1-',
            ).toLowerCase();
            s += `${styleKey} ${duration}ms ease`;
            if (i < style.length-1) {
                s += ',';
            }
            i += 1;
        }
    }
    return s;
}

/**
 * Popup with animation handling and lifecycle methods
 */
class AwesomePopup extends React.Component {
    /**
     *
     * @param {*} props
     */
    constructor(props) {
        super(props);

        this.queueDelete = this.queueDelete.bind(this);
        this.startUnmount = this.startUnmount.bind(this);
        this.doDelete = this.doDelete.bind(this);

        this.state = {
            animState: props.animStates['start'],
        };

        this.animThread = null;
    }

    /**
     * Triggers the onStart and queueState function
     */
    componentDidMount() {
        this.props.onStart(this.props.popupId);
        this.queueState(this.state.animState);
    }

    /**
     * Sets the animState of the popup and queues next timeout
     * @param {object} newState
     */
    queueState(newState) {
        this.setState({animState: newState}, ()=>{
            const duration = newState.duration;
            if (duration >= 0) {
                if (newState.unmountOnComplete) {
                    this.queueDelete(duration, this.props.popupId);
                    return;
                }
                if (newState.nextStateKey) {
                    if (newState.nextStateKey == 'wait') {
                        this.props.onStartComplete(this.props.popupId);
                    }
                    const nextState = this.props.animStates[
                        newState.nextStateKey
                    ];
                    this.animThread = setTimeout(()=>{
                        this.queueState(nextState);
                    }, duration);
                }
            }
        });
    }

    /**
     * Begins the 'end' transition of the popup
     */
    startUnmount() {
        if (this.animThread) {
            // Cancel current anim
            clearTimeout(this.animThread);
        }
        this.props.onEnd(this.props.popupId);

        this.queueState(
            this.props.animStates['end'],
            this.props.animStates,
        );
    }

    /**
     * Queues the popup to be deleted
     * @param {number} ms - milliseconds until deletion
     * @param {string} popupId
     */
    queueDelete(ms, popupId) {
        setTimeout(
            ()=>{
                this.doDelete(popupId);
            },
            ms,
        );
    }

    /**
     * Deletes the popup by calling the onUnmount function
     * @param {string} popupId
     */
    doDelete(popupId) {
        this.props.onEndComplete(this.props.popupId);
        this.props.onUnmount(popupId);
    }

    /**
     *
     * @return {*}
     */
    render() {
        const animState = this.state.animState;
        return (
            <div
                className={
                    `react-awesome-popups `+
                    `react-awesome-popups-${
                        this.props.type ? this.props.type : 'custom'
                    }`
                }
                style={{
                    ...(animState ? {
                        ...animState.style,
                        transition: buildTransition(
                            animState.style,
                            animState.duration,
                        ),
                    } : {}),
                    ...this.props.style,
                }}
                onClick={this.props.onClick}
            >
                <div className={'react-awesome-popups-popup-' +
                'inner-container'}>
                    <div
                        className={`
                            react-awesome-popups-popup-content 
                            react-awesome-popups-`+
                            `popup-content-${
                                this.props.type ?
                                    this.props.type :
                                    'custom'
                            }`
                        }
                    >
                        {this.props.children}

                    </div>
                    {
                        this.props.closeButton ?
                            this.props.closeButton :
                            <CloseButton
                                className={`
                                    react-awesome-popups-close-button 
                                    react-awesome-popups`+
                                    `-close-button-${
                                        this.props.type ?
                                            this.props.type :
                                            'custom'
                                    }`
                                }
                                // src={CloseButton}
                                alt="Close Button"
                                onClick={()=>{
                                    this.startUnmount();
                                }}
                            />
                    }
                </div>
            </div>
        );
    }
}

AwesomePopup.propTypes = propTypes;
AwesomePopup.defaultProps = defaultProps;

// Close icon from https://www.flaticon.com/authors/hirschwolf


export {AwesomePopup};
