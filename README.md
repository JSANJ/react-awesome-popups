# React Awesome Popups
> A lightweight, extendable, fast performing, highly customizeable, production ready React Component that renders an animated set of popups.

![NPM](https://img.shields.io/npm/v/react-awesome-popups.svg)![npm](https://img.shields.io/npm/l/react-native-flip-card.svg)


[<img width="400" alt="react-awesome-popups demo" src="https://github.com/JSANJ/react-awesome-popups/blob/master/demo/public/images/theme-set.gif?raw=true">](https://github.com/JSANJ/react-awesome-popups/blob/master/demo/public/images/theme-set.gif)

## Key Features

- 60 FPS animated popups
- Customizable animated transitions
- Customizable colours
- OnPress ripple effect
- Look and feel customisable and extendable in two ways: via **CSS custom properties** or **SASS** variables and lists ([scss config file](https://github.com/JSANJ/react-awesome-popups/blob/master/src/styles/default.scss)).
- Use it with **CSSModules** or **Plain CSS**

## Live demo

Checkout the live demo with the `CSS customizer` at my <a title="React Awesome Popups - CSS Customizer" href="https://justinsj.com/demo/react-awesome-popups" target="_blank">web portfolio</a> page.

[<img src="https://github.com/JSANJ/react-awesome-popups/blob/master/demo/public/images/react-awesome-popups-customizer.png?raw=true" width="800" />](https://justinsj.com/demo/react-awesome-popups)

You can run this demo locally on `3000` by:
1. Cloning this repository

    `git clone https://github.com/JSANJ/react-awesome-popups.git`

2. Navigate to the demo directory
   
    `cd react-awesome-popups && cd demo`
	
2. Installing the dependencies **in the demo directory**

    `npm install --dev`
	
3. Starting the demo

    `npm start`

## Installation

```
npm install --save react-awesome-poups
```

###`AwesomePopupsContainer`
#### `AwesomePopupsContainer` API

**AwesomePopupsContainer.popup(component, animStates)**
Adds the popup component and starts the animation using the animStates **start** key.
- component: (AwesomePopup) - popup component to be displayed
- animStates: ({string: AnimState} object) - **start** and **end** keys are required.

**returns**: popupId (string) 

**AwesomePopupsContainer.close(popupId)**
Performs the close animation on the popup and removes it elegantly.
- popupId: (string) - the ID of the popup acquired when added to the container.

**AwesomePopupsContainer.remove(popupId)**
Removes the popup with the given popupId immediately.
- popupId: (string) - the ID of the popup acquired when added to the container.

**AwesomePopupsContainer.remove(popupId)**
Removes the popup with the given popupId immediately.
- popupId: (string) - the ID of the popup acquired when added to the container.

#### AnimState

| Attribute 		|    Type    |  Default  | Description                                                                                              |
| :-------- 		| :--------: | :-------: | :------------------------------------------------------------------------------------------------------- |
| style     		|  `string`  | 	`null`   | Render this style object as the next transitioned animation												|
| duration  		|  `number`  |  `0`   	 | Sets the transition to last this long, also triggers the next state at the end							|
| nextStateKey 		|  `string`  |  `null`   | The key of the next 'AnimState' in the 'AnimStates' object												|
| unmountOnComplete |   `bool`   |  `false`  | Should unmount the component when the animation duration passes											|

#### `AwesomePopupsContainer` props

| Attribute 		|    Type    |  Default  | Description                                                                                              |
| :-------- 		| :--------: | :-------: | :------------------------------------------------------------------------------------------------------- |
| children          | `any`      |  `null`   | The component's children to be rendered                                                                  |

### `AwesomePopup`
#### `AwesomePopup` API (Internal)

**AwesomePopup.queueState(newState)**
Updates the animation state and queues the next state.
- newState: (AnimState) - an object containing the style, duration, and other animation parameters

**AwesomePopup.startUnmount()**
Begins the unmounting of the component by starting the **end** animation state.

**AwesomePopup.queueDelete(ms, popupId)**
Queues the unmounting of the component after a given delay in milliseconds.
- ms: (number) - delay in milliseconds
- popupId: (string) - ID of the popup to be sent to the container for unmounting

**AwesomePopup.doDelete(popupId)**
Calls the onUnmount function of the popup. Also triggers the onEndComplete callback
- popupId: (string) - ID of the popup to be sent to the container for unmounting

#### `AwesomePopup` props

| Attribute 		|    Type    |  Default  | Description                                                                                              |
| :-------- 		| :--------: | :-------: | :------------------------------------------------------------------------------------------------------- |
| onClick     		| `function` |  `null`   | Triggered when the component is clicked                                                                  |
| onStart     		| `function` |  `null`   | Triggered when the component is mounted                                                                  |
| onStartComplete	| `function` |  `null`	 | Triggered when the component reaches its 'wait' animation                                                |
| onEnd 		    | `function` |  `null`   | Triggered when the component is beginning its removal                                                    |
| onEndComplete     | `function` |  `null`   | Triggered when the component is just about to be unmounted                                               |
| popupId           | `string`   |`generated`| This is a key added to the popup when inserted into the AwesomePopupsContainer                           |
| closeButton       | `component`|  `auto`   | An object placed at the end of the container to trigger closing the popup when pressed                   |
| style             | `object`   |  `null`   | An object to add as the React css style of the component                                                 |
| type              | `string`   |  `custom` | ( success | warning | error | info ) Substring of the css style to be applied to the component           |
| animStates        | `object`   |  `null`   | {string:AnimState} key-value object for animating the component                                          |
| children          | `any`      |  `null`   | The component's children to be rendered                                                                  |

### `AwesomePopupStates`
This is a {string:AnimStates} key-value object. Each 'AnimStates' is then a {string:AnimState} object 
**clip**: An AnimStates object for a default clipping animation
**fade**: An AnimStates object for a default fade animation

### `ReactAwesomePopups` basic example

Checkout this example live on the [storyboard](https://justinsj.com/demo/react-awesome-popups/storybook/).

**In the App.js File**
```
import { AwesomePopupsContainer } from 'react-awesome-popups'

global.ReactAwesomePopups = new React.createRef();

function App(props) {
  return (
    <div>
      <Your_Header_Component/>
      <Your_Container>
        <AwesomePopupsContainer ref={global.ReactAwesomePopups}/>
      </Your_Container>
    </div>
  );
}

export default App;
```

**Then in any other file, call the API**
```
import { AwesomePopup } from 'react-awesome-popups'
global.ReactAwesomePopups.popup(
    <AwesomePopup type="info">
        Hello there!
    </AwesomePopup>
);

```

**You can create a custom popup to override the AwesomePopup class**
```
import { AwesomePopup } from 'react-awesome-popups'

class YourAwesomePopup extends AwesomePopup {
    startUnmount() {
        // New start unmount logic
    }
}

```
## Developer Installation

Establish git hooks link
Navigate to **project directory** and run:
```
git config --local core.hooksPath git_hooks
```
### Future Work

## React Native Version

(In Progress)

## Author

#### Justin San Juan

- Checkout my <a href="https://justinsj.com" title="Full-Stack Software Engineer, Web Designer \/ Developer, UI/UX Javascript Specialist" target="_blank">Full-Stack Web Developer Website</a>
- Other open source projects @ <a title="Web Software Developer Code Laboratory" target="_blank" href="https://justinsj.com/labs">Code Laboratory</a>
- A scope of my work @ <a title="Web Software Developer Portfolio" target="_blank" href="https://justinsj.com/portfolio">Web Developer Portfolio</a>

## License

MIT. Copyright (c) 2020 Justin San Juan.