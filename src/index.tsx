import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ContextProvider } from './context';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/index'; 

import './asset/reset.scss';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
