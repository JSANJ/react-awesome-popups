import React from 'react';
import { AwesomePopup, AwesomePopupsContainer, AwesomePopupStates } from 'react-awesome-popups';
import '@babel/polyfill';

global.ReactAwesomePopups = React.createRef();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doApiCall(){
        const popupId = global.ReactAwesomePopups.current.popup(
            <AwesomePopup
                type={"success"}
                style={{width: 150}}
                closeButton={<div>X</div>}
                animStates={AwesomePopupStates.clip}
            >
                Connected!
            </AwesomePopup>
        )

        await sleep(1000); // Wait for 1000ms to simulate API call

        global.ReactAwesomePopups.current.close(popupId);

}
class App extends React.Component {
    constructor(props){
        super(props)

    }
    componentDidMount(){
        //TODO remove (test)
        console.log("started mount")
        // this.container.current.popup(<Popup type={"success"} style={{width: 150}} closeButton={<div>X</div>}
        //                                     animStates={PopupStates.clip}>
        //     Test 2
        // </Popup>,{
        //     duration:-1
        // })
        // this.container.current.popup(<Popup type={"success"} style={{width: 150}} closeButton={<div>X</div>}
        // animStates={PopupStates.clip}
        // options={{
        //     fadeInDuration: 500,
        //     duration:-1,
        //     fadeOutDuration: 500,
        //
        // }}>
        //     Test 2
        // </Popup>)
        // this.container.current.popup(<Popup type={"success"} style={{width: 150}}
        //                                     animStates={PopupStates.clip}
        // >
        //     Test 4
        // </Popup>)
        // this.container.current.popup(<Popup type={"success"} style={{width: 150}}
        //                                     animStates={PopupStates.clip}
        // >
        //     Test 5
        // </Popup>,{
        //     fadeInDuration: 500,
        //     duration:4000,
        //     fadeOutDuration: 500,
        //
        // })
    }
    render(){
        return (
            <div className="App">
                <button onClick={doApiCall}>
                    Popup!
                </button>
                <div
                    style={{
                        display: 'flex',
                        pointerEvents: 'none',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        marginTop: '1em',
                        marginRight: '1em',
                    }}
                >
                    <AwesomePopupsContainer ref={global.ReactAwesomePopups}>
                        <AwesomePopup type={"success"} style={{width: 150}}
                               animStates={AwesomePopupStates.clip}
                        >
                            Test
                        </AwesomePopup>
                    </AwesomePopupsContainer>
                </div>

            </div>
        );
    }
}

export default App;
