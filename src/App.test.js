import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {getWikiPage} from './api/WikiAPI'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// it('can get wiki data', () => {
// 	getWikiPage('react').then((text) => {
// 		console.log(text)
// 	})
// })