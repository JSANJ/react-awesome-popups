import React from 'react';
import PropTypes from 'prop-types';
import './popups-container-style.css';
import {Popup} from "./Popup.jsx";

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


class PopupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.popup = this.popup.bind(this);
        this.unmountKey = this.unmountKey.bind(this);
        this.children = [];// 0 items
        if (props.children !== undefined) {
            if (props.children.type !== [].type){ // 1 item
                this.popup(props.children)
            }
            else { // 2+ items
                this.children = [];
                for (let i = 0; i< props.children.length; ++i){
                    this.popup(props.children[i])
                }
            }
        }

    }

    popup(component, options){
        const id = makeid(20);
        console.log("PROPS:",component.props);
        this.children.push(<component.type
            children={component.props.children}
            style={component.props.style}
            type={component.props.type}
            options={{...component.props.options, ...options}}
            erasekey={id}
            key={id}
            unmountkey={this.unmountKey}
        />)

        this.forceUpdate();
    }

    unmountKey(erasekey){
        this.children = this.children.filter((item,i) => {
            return erasekey !== item.props.erasekey
        })
        this.forceUpdate();
    }

    render() {
        console.log("children:",this.children)
        return (
                <div className={"react-awesome-popups-container"}>
                {this.children}
                    {/*{this.children}*/}
            </div>
        );
    }
}

PopupsContainer.propTypes = propTypes;
PopupsContainer.defaultProps = defaultProps;


export { PopupsContainer };
