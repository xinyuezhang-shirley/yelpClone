import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function Business(){
  return (
    <div>
      <img src="https://via.placeholder.com/150" alt="Business Logo" />
      <h2 className ='name'>Business Name</h2>
      <p>Business Description</p>
    </div>
  )
}
