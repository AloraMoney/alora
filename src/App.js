import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './landingPage/Header';
import Banner from './landingPage/Banner';
import CreateNode from './landingPage/CreateNode';
//import Nodeslist from './landingPage/Nodeslist';
import AloraToken from './landingPage/AloraToken';
import Footer from './landingPage/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";




function App() {
  const [userId, setUserId] = useState('');
  const [reload, setReload] = useState(false);
  const [nodesData, setNodeData] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [claimableReward, setClaimableReward] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
      <>
        <Header 
          setUserId={setUserId}
          userId={userId}
          setNetworkId={setNetworkId}
        />
        <Banner 
          userId={userId} 
          reload={reload}
          nodesData={nodesData}
          setNodeData={setNodeData}
          networkId={networkId}
          claimableReward={claimableReward}
          setClaimableReward={setClaimableReward}
        />
        <CreateNode 
          userId={userId} 
          setReload={setReload}
          nodesData={nodesData}
          networkId={networkId}
          loading={loading}
          setLoading={setLoading} 
        />
        {/* <Nodeslist/> */}
        <AloraToken />
        <Footer />
        <ToastContainer />
      </>
  );
}

export default App;
