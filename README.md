# React Awesome Popups

Get easily configurable, pleasing popups on your React App.

Get this at NPM:<br>
https://www.npmjs.com/package/react-awesome-popups

## Demo



## Installation

`npm i -S react-awesome-popups`

Example:<br>
**In the App.js File**
```
import { PopupsContainer } from 'react-awesome-popups'

global.ReactAwesomePopups = new React.createRef();

function App(props) {
  return (
    <div>
      <Your_Header_Component/>
      <Your_Container>
        <PopupsContainer ref={global.ReactAwesomePopups}/>
      </Your_Container>
    </div>
  );
}

export default App;
```

**Then in any other file, call the API**
```
import { Popup } from 'react-awesome-popups'
global.ReactAwesomePopups.popup(
    <Popup type="info">
        Hello there!
    </Popup>
);

```

**You can create a custom popup to implement**
```
import { BasePopupComponent } from 'react-awesome-popups'

TODO

```


### API

The module supports two main functions:

- *popup(component, options)*
    - component: component to be displayed
    
    - options:
        - fadeOptions:
            - *duration* - milliseconds of how long it is in full opacity set as a negative number for persistent.
            - *fadeInDuration* - milliseconds
            - *fadeOutDuration* - milliseconds
        - *includeCloseButton* - boolean

### Future Work

