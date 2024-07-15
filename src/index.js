import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './components/redux/store'; // Ensure the path is correct
import './index.css'; // Import your global CSS file
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
