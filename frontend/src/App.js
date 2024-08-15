import SignupC from './composants/authclient/Signup';
import LoginC from './composants/authclient/Login'
import Signup from './pages/Signup';
import Login from './pages/Login';
import SignupA from './composants/authagence/Signup';
import LoginA from './composants/authagence/Login';

import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';


function App() {



  return (
    <div className="App">
     
     <Routes>
     <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client-signup" element={<SignupC />} />
        <Route path="/agence-signup" element={<SignupA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<LoginC />} />
        <Route path="/agence-login" element={<LoginA />} />
      </Routes>
    </div>
  );
}

export default App;

