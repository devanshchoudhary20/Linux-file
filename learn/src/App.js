import './App.css';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Testing from './Components/List/Testing';
import Dropdown from './Components/Dropdown/Dropdown';
import { useState } from 'react';
import AutoSearch from './Components/AutoSearch/AutoSearch';
import Calendar from './Components/Calendar/Calendar';
import Gallery from './Components/gallery/Gallery';
function App() {
  const [target,setTarget] = useState(null);

  return (
    <div className="App" onClick={(e) => 
    {
      // console.log("target send by app",e.target.className)
    setTarget(e.target)}}>
      <Header/>
      {/* <Dropdown target = {target}/> */}
      {/* <List/> */}
      {/* <Testing/> */}
      {/* <AutoSearch /> */}
      {/* <Calendar/> */}
      <Gallery/>
    </div>
  );
}

export default App;
