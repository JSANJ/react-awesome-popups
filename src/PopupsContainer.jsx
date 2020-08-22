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

class PopupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: props.children,
        }
    }

    popup(component, options){
        this.setState({children: [...this.state.children,component]})
    }

    unmountChild(child){
        console.log("child:",child);
    }

    render() {
        return (
            <div className={"react-awesome-popups-container"} {...this.props}>
                {this.state.children.map((component,key)=>{
                    return (<component.type {...component.props} key={key} />)
                })}
            </div>
        );
    }
}

PopupsContainer.propTypes = propTypes;
PopupsContainer.defaultProps = defaultProps;


export { PopupsContainer };
