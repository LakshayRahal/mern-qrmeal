
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import store from './store/store'
// import { Toaster } from 'sonner'
// import { Provider } from 'react-redux'
// createRoot(document.getElementById('root')).render(
//  <BrowserRouter>
//  <Provider store={store}>
//  <App />
// <Toaster/>
//  </Provider>

//  </BrowserRouter>
    
  
// )
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster position="bottom-right" richColors />
    </Provider>
  </BrowserRouter>
);

