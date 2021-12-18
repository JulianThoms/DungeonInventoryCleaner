import './App.css'
import Inventory from './inventory/Inventory.jsx'
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize('G-R9K7DPFTRE')
  ReactGA.send('pageview')
  return (
    <div className="App">
      <Inventory />
    </div>
  )
}

export default App
