import React from 'react';
import PropTypes from 'prop-types';
import './awesome-popups-container-style.css';
import {AwesomePopup} from "./AwesomePopup.jsx";

const ID_LENGTH = 20;

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
            border: '1px solid red'
        }
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


class AwesomePopupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.popup = this.popup.bind(this);
        this.remove = this.remove.bind(this);
        this.children = [];                         // 0 items - props.children is empty
        if (props.children !== undefined) {
            if (props.children.type !== [].type){   // 1 item - props.children is an object
                this.popup(props.children)
            }
            else {                                  // 2+ items - props.children is an array
                this.children = [];
                for (let i = 0; i< props.children.length; ++i){
                    this.popup(props.children[i])
                }
            }
        }
    }

    /**
     * Adds a popup to the container. Also starts the animation.
     * @param {AwesomePopup} component - popup to be added
     * @param {object} animStates - override object for the animations
     * @returns {string} popupId - ID generated to identify the popup
     */
    popup(component, animStates = null){
        const id = makeid(ID_LENGTH);
        const ref = React.createRef();
        this.children.push({
            component: <component.type
                children={component.props.children}
                style={component.props.style}
                type={component.props.type}
                animStates={{...component.props.animStates,...animStates}}
                popupId={id}
                key={id}
                ref={ref}
                unmountkey={this.remove}
            />,
            ref: ref
    })

        this.forceUpdate();
        return id;
    }

    /**
     * Replace the popup with the given replaceId
     * @param {AwesomePopup} component - popup to be added
     * @param {object} animStates - override object for the animations
     * @param {string} replaceId - ID of the popup to be replaced
     */
    replace(component, animStates, replaceId){
        //TODO
        const id = makeid(ID_LENGTH);

        return id
    }

    /**
     * Perform the close animation and remove popup elegantly
     * @param {string} popupId - ID of the popup to be closed
     */
    close(popupId){
        const popup = this.children.find((item,i)=>{
            return popupId === item.component.props.popupId;
        })

        if (popup !== undefined) {
            popup.ref.current.startUnmount();
        }
        else {
            console.warn("popup is undefined");
        }

    }

    /**
     * Immediately remove popup
     * @param {string} popupId - ID of the popup to be removed
     */
    remove(popupId){
        this.children = this.children.filter((item,i) => {
            return popupId !== item.component.props.popupId
        })
        this.forceUpdate();
    }

    render() {
        return (
                <div className={"react-awesome-popups-container"}>
                {this.children.map((item,i)=>{return item.component})}
            </div>
        );
    }
}

AwesomePopupsContainer.propTypes = propTypes;
AwesomePopupsContainer.defaultProps = defaultProps;


export { AwesomePopupsContainer };
