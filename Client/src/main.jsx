import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogState } from './Context/BlogState.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BlogState> 
      
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogState>
  </React.StrictMode>,
)