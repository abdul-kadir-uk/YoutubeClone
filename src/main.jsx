import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provides the Redux store to the entire app. */}
    <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>,
)
