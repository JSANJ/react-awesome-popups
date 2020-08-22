import React from 'react';
import PropTypes from 'prop-types';
import './popups-container-style.css';

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
        this.children = [];
        props.children !== undefined && props.children.type !== [].type && this.children.push(props.children);

        this.unmountKey = this.unmountKey.bind(this);
    }

    popup(component, options){
        const id = makeid(20);
        this.children.push(<component.type {...component.props} options={options} erasekey={id}/>)
        this.forceUpdate();
    }

    unmountKey(erasekey){
        this.children = this.children.filter((item,i) => {
            return erasekey !== item.props.erasekey
        })
        this.forceUpdate();
    }

    render() {
        return (
            <div className={"react-awesome-popups-container"} {...this.props}>
                {this.children.map((component,key)=>{
                    return (<component.type {...component.props} key={key} unmount={this.unmountChild} unmountkey={this.unmountKey} />)
                })}
            </div>
        );
    }
}

PopupsContainer.propTypes = propTypes;
PopupsContainer.defaultProps = defaultProps;


export { PopupsContainer };
