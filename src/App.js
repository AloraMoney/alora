import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './landingPage/Header';
import Banner from './landingPage/Banner';
import CreateNode from './landingPage/CreateNode';
import Nodeslist from './landingPage/Nodeslist';
import AloraToken from './landingPage/AloraToken';
import Footer from './landingPage/Footer';



function App() {
  const [userId, setUserId] = useState('');
  return (
      <>
        <Header setUserId={setUserId}/>
        <Banner userId={userId} />
        <CreateNode userId={userId} />
        {/* <Nodeslist/> */}
        <AloraToken />
        <Footer />
      </>
  );
}

export default App;
