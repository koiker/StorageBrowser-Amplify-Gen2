import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react-storage/styles.css";
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
