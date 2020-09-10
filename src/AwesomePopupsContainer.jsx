import React from 'react';
import PropTypes from 'prop-types';
import './awesome-popups-container-style.css';
import {AwesomeHelpers} from './AwesomeHelpers.jsx';

const ID_LENGTH = 20;

const propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
};

const defaultProps = {

};


/**
 * A container to manage the insertion and removal of popups
 */
class AwesomePopupsContainer extends React.Component {
    /**
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.popup = this.popup.bind(this);
        this.remove = this.remove.bind(this);
        this.children = []; // 0 items - props.children is empty
        if (props.children !== undefined) {
            if (props.children.type !== [].type) {
                // 1 item - props.children is an object
                this.popup(props.children);
            } else { // 2+ items - props.children is an array
                this.children = [];
                for (let i = 0; i< props.children.length; ++i) {
                    this.popup(props.children[i]);
                }
            }
        }
    }

    /**
     * Adds a popup to the container. Also starts the animation.
     * @param {AwesomePopup} component - popup to be added
     * @param {object} animStates - override object for the animations
     * @param {number} forceIndex - override the position of the popup
     * @param {string} initialKey - the key of the AnimState to start with
     * @return {string} popupId - ID generated to identify the popup
     */
    popup(component, animStates = null, forceIndex = null, initialKey = null) {
        const id = component.props.popupId ?
            component.props.popupId :
            AwesomeHelpers.awesomeId(ID_LENGTH);
        const ref = React.createRef();

        const newComponent = <component.type
            style={component.props.style}
            type={component.props.type}
            animStates={{...component.props.animStates, ...animStates}}
            initialKey={initialKey}
            popupId={id}
            key={id}
            ref={ref}
            closeButton={component.props.closeButton}
            onUnmount={this.remove}
            onClick={component.props.onClick}
            onStart={component.props.onStart}
            onStartComplete={component.props.onStartComplete}
            onEnd={component.props.onEnd}
            onEndComplete={component.props.onEndComplete}
        >
            {component.props.children}
        </component.type>;
        if (forceIndex != null) {
            this.children[forceIndex] = {
                component: newComponent,
                ref: ref,
            };
        } else {
            this.children.push({
                component: newComponent,
                ref: ref,
            });
        }


        this.forceUpdate();
        return id;
    }

    /**
     * Replace the popup with the given replaceId
     * @param {AwesomePopup} component - popup to be added
     * @param {object} animStates - override object for the animations
     * @param {string} replaceId - ID of the popup to be replaced
     * @param {string} initialKey - the key of the AnimState to start with
     * @return {string} popupId - ID generated to identify the popup
     */
    replace(component, animStates, replaceId, initialKey = null) {
        // TODO
        const id = component.props.popupId ?
            component.props.popupId :
            AwesomeHelpers.awesomeId(ID_LENGTH);

        const index = this.children.findIndex((item)=>{
            return replaceId === item.component.props.popupId;
        });

        this.popup(component, animStates, index, initialKey);
        return id;
    }

    /**
     * Perform the close animation and remove popup elegantly
     * @param {string} popupId - ID of the popup to be closed
     */
    close(popupId) {
        const popup = this.children.find((item)=>{
            return popupId === item.component.props.popupId;
        });

        if (popup !== undefined) {
            popup.ref.current.startUnmount();
        } else {
            console.warn('popup is undefined');
        }
    }

    /**
     * Immediately remove popup
     * @param {string} popupId - ID of the popup to be removed
     */
    remove(popupId) {
        this.children = this.children.filter((item, i) => {
            return popupId !== item.component.props.popupId;
        });
        this.forceUpdate();
    }

    /**
     *
     * @return {*}
     */
    render() {
        return (
            <div
                className={'react-awesome-popups-container'}
                style={this.props.style}
            >
                {this.children.map((item, i)=>{
                    return item.component;
                })}
            </div>
        );
    }
}

AwesomePopupsContainer.propTypes = propTypes;
AwesomePopupsContainer.defaultProps = defaultProps;


export {AwesomePopupsContainer};
