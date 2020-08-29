import React from 'react';
import PropTypes from 'prop-types';
import './awesome-popups-container-style.css';
import {AwesomePopup} from "./AwesomePopup.jsx";

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
        this._unmountKey = this._unmountKey.bind(this);
        this.children = [];                         // 0 items
        if (props.children !== undefined) {
            if (props.children.type !== [].type){   // 1 item
                this.popup(props.children)
            }
            else {                                  // 2+ items
                this.children = [];
                for (let i = 0; i< props.children.length; ++i){
                    this.popup(props.children[i])
                }
            }
        }
    }

    popup(component, animStates){
        const id = makeid(20);
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
     * Perform the close animation and remove popup elegantly
     */
    close(popupId){
        console.log("closing:",popupId);
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
