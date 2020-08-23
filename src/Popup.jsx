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

        this.queueDelete = this.queueDelete.bind(this);
        this.startDelete = this.startDelete.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.startAppear = this.startAppear.bind(this);

        this.state = {
            fadeInDuration: props.options.fadeInDuration ? props.options.fadeInDuration : 0,
            fadeOutDuration: props.options.fadeOutDuration ? props.options.fadeOutDuration : 0,
            fadestate: "start",
        }
        props.erasekey && props.options && props.options.duration > 0 && this.queueDelete(
            props.options.fadeInDuration + props.options.duration,
            props.erasekey
        );

        //TODO Set fade-in/fade-out animation
    }
    componentDidMount() {
        this.setState({fadestate: "start"},
            () => {
            setTimeout(()=>{
                const fadeInDuration = this.props.options.fadeInDuration ? this.props.options.fadeInDuration : 0;
                this.startAppear(fadeInDuration);
            },0)

        })
    }

    async startAppear(ms){
        console.log("appearing:",ms)
        this.setState({fadestate:"fadingIn"},()=>{
            console.log("setting hold:", ms);
            setTimeout(()=>{
                this.setState({fadestate:"hold"})
            },
                ms
            )
        })
    }

    async queueDelete(ms,key){
        setTimeout(
            ()=>{this.startDelete(key)},
            ms
        )
    }
    startDelete(key){

        this.setState({fadestate:"fadingOut"},
            ()=>{
                setTimeout(()=>{
                        this.doDelete(key);
                    },
                    this.state.fadeOutDuration)
            });

    }
    doDelete(key){
        this.props.unmountkey && this.props.unmountkey(key);
    }


    //TODO fix style transition fadeOutDuration only on disabled state https://stackoverflow.com/questions/57317943/custom-style-for-disabled-button-applies-to-regular-button-also
    render() {
        return (
            <div
                className={
                    `react-awesome-popups ${this.props.type ? "react-awesome-popups-"+ this.props.type : "react-awesome-popups-custom"}`
                }
                style={{
                    ...(this.state.fadestate === "start" ? {transition: `all ${this.state.fadeInDuration}ms ease-in-out`} : {}),
                    ...(this.state.fadestate === "fadingIn" ? {transition: `all ${this.state.fadeInDuration}ms ease-in-out`} : {}),
                    ...(this.state.fadestate === "hold" ? {transition: `all ${this.state.fadeInDuration}ms ease-in-out`} : {}),
                    ...(this.state.fadestate === "fadingOut" ? {transition: `all ${this.state.fadeOutDuration}ms ease-in-out`} : {}),
                    ...this.props.style
                }}
                fadestate={this.state.fadestate}
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
