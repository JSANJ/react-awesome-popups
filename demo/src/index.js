import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '@babel/polyfill';
import {AwesomePopupStates} from 'react-awesome-popups';

console.log("States:",AwesomePopupStates);
render(
  <App/>,
  document.getElementById('app')
);