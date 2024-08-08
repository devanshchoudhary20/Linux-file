import './App.css';
import Component1 from './Components/Component1';
import {SettingProvider} from './Settingcontext.jsx'
function App() {
  return (
    <div className="App">
      <SettingProvider>
        <Component1/>
      </SettingProvider>
    </div>
  );
}

export default App;
