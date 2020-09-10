import React from 'react';
import { AwesomePopup, AwesomePopupsContainer, AwesomePopupStates, AwesomeHelpers } from 'react-awesome-popups';
import './App.css';
import './css/popup.css';
import Button from "@material-ui/core/Button";


global.ReactAwesomePopups = React.createRef();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addAPIPopup(){
    let overrideAnimStates = AwesomePopupStates.clip
    overrideAnimStates.wait.duration = -1;
    const popupId = global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"neutral"}
            animStates={overrideAnimStates}
        >
            Connecting... (wait for 2 seconds)
        </AwesomePopup>
    )

    await sleep(2000); // Wait for 2000ms


    const replacementPopup = <AwesomePopup
        type={"success"}
        animStates={overrideAnimStates}
        popupId={popupId}
    >
        Connected!
    </AwesomePopup>

    global.ReactAwesomePopups.current.replace(replacementPopup,{},popupId)
}

function addOptionsPopup(){
    let overrideAnimStates = AwesomePopupStates.clip;
    overrideAnimStates.wait.duration = -1; // Keep popup on indefinitely
    const popupId = AwesomeHelpers.awesomeId();
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"neutral"}
            animStates={overrideAnimStates}
            popupId={popupId}
            closeButton={null}
        >
            <div>
                This site uses cookies. Do you accept?
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: '0.2em',
                    }}
                >
                    <Button
                        style={{display: 'inline-block'}}
                        onClick={()=>{
                            console.log("Accepted");
                            global.ReactAwesomePopups.current.close(popupId)
                        }}>
                        Accept
                    </Button>
                    <Button
                        style={{display: 'inline-block'}}
                        onClick={()=>{
                            global.ReactAwesomePopups.current.close(popupId)
                        }}
                    >
                        Deny
                    </Button>
                </div>
            </div>
        </AwesomePopup>
    )
}

function addReplaceablePopup(){
    let overrideAnimStates = AwesomePopupStates.clip;
    overrideAnimStates.wait.duration = -1; // Keep popup on indefinitely
    const popupId = AwesomeHelpers.awesomeId();

    const replacementPopup = <AwesomePopup
        type={"info"}
        animStates={overrideAnimStates}
        popupId={popupId}
    >
        Replaced!
    </AwesomePopup>
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"success"}
            animStates={overrideAnimStates}
            popupId={popupId}
            closeButton={null}
        >
            <div
                style={{
                    width: '100%',
                }}
            >
                This popup will be replaced!
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: '0.2em',
                        width: '100%',
                    }}
                >
                    <Button
                        style={{display: 'inline-block'}}
                        onClick={()=>{
                            global.ReactAwesomePopups.current.replace(replacementPopup,{},popupId,"wait")
                        }}>
                        Replace
                    </Button>
                </div>

            </div>
        </AwesomePopup>
    )
}

function addOtherStylesPopups() {
    let overrideAnimStates = AwesomePopupStates.clip;
    overrideAnimStates.wait.duration = -1; // Keep popup on indefinitely
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"warning"}
            animStates={overrideAnimStates}
        >
            Warning
        </AwesomePopup>
    )
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"error"}
            animStates={overrideAnimStates}
        >
            Error
        </AwesomePopup>
    )
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"pink"}
            animStates={overrideAnimStates}
        >
            Pink
        </AwesomePopup>
    )
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"purple"}
            animStates={overrideAnimStates}
        >
            Purple
        </AwesomePopup>
    )
}

function addAutoclosePopup() {
    let overrideAnimStates = AwesomePopupStates.clip;
    overrideAnimStates.wait.duration = 1500; // Keep popup on for 1500ms
    global.ReactAwesomePopups.current.popup(
        <AwesomePopup
            type={"warning"}
            animStates={overrideAnimStates}
        >
            {`Closing in ${overrideAnimStates.wait.duration}ms`}
        </AwesomePopup>
    )
}
const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: 260,
};

class App extends React.Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <div className="App">


                <div className="screen">
                    <div className="button-container">
                        <Button style={style} onClick={addAPIPopup}>
                            Basic API async Popup
                        </Button>
                        <Button style={style} onClick={addReplaceablePopup}>
                            Replaceable Popup
                        </Button>
                        <Button style={style} onClick={addOptionsPopup}>
                            Multiple Options Popup
                        </Button>
                        <Button style={style} onClick={addOtherStylesPopups}>
                            Other Styles
                        </Button>
                        <Button style={style} onClick={addAutoclosePopup}>
                            AUTO CLOSE
                        </Button>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            top: '2em',
                            right: '2em',
                            left: 0,
                            bottom: 0,
                            display: 'flex',
                            pointerEvents: 'none',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <AwesomePopupsContainer
                            style={{width: 300}}
                            ref={global.ReactAwesomePopups}
                        >
                        </AwesomePopupsContainer>
                    </div>

                </div>


            </div>
        );
    }
}

export default App;
