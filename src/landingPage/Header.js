import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import Lottie from 'react-lottie-player'
import connect from '../Assets/lotties/connect-lottie.json';
import Web3 from 'web3';

export default function Header({setUserId , userId, setNetworkId}) {
    const [wallet, setWallet] = useState(false);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState('');
    const [disconnect, setDisconnect] = useState(false);
    const [networkName, setNetworkName] = useState('');

const networks = {
    bscTestnet: {
      chainId: `0x${Number(97).toString(16)}`,
      chainName: "Binance Smart Chain Testnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545",
        "https://data-seed-prebsc-1-s2.binance.org:8545",
        "https://data-seed-prebsc-2-s2.binance.org:8545",
        "https://data-seed-prebsc-1-s3.binance.org:8545",
        "https://data-seed-prebsc-2-s3.binance.org:8545"
      ],
      blockExplorerUrls: ["https://testnet.bscscan.com/"]
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
          name: "Binance Chain Native Token",
          symbol: "BNB",
          decimals: 18
        },
        rpcUrls: [
          "https://bsc-dataseed1.binance.org",
          "https://bsc-dataseed2.binance.org",
          "https://bsc-dataseed3.binance.org",
          "https://bsc-dataseed4.binance.org",
          "https://bsc-dataseed1.defibit.io",
          "https://bsc-dataseed2.defibit.io",
          "https://bsc-dataseed3.defibit.io",
          "https://bsc-dataseed4.defibit.io",
          "https://bsc-dataseed1.ninicoin.io",
          "https://bsc-dataseed2.ninicoin.io",
          "https://bsc-dataseed3.ninicoin.io",
          "https://bsc-dataseed4.ninicoin.io",
          "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
      }
  };

  useEffect(() => {
    if(window.ethereum){
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
}
// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(window.ethereum){
    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
            setUserId(accounts[0]);
            localStorage.setItem("userAddress", accounts[0]);
            setWallet(false);
        } 
      });

    // return () => {
    //   window.ethereum.removeListener("accountsChanged", networkChanged);
    // };
}
// eslint-disable-next-line
  }, []);

  useEffect( () => {
      const acc = localStorage.getItem('userAddress');
        const walletConnected = async () => {
            if (window.ethereum) {
                const currentProvider = window.ethereum;
                setChainId(currentProvider.chainId);
                await currentProvider.request({ method: 'eth_requestAccounts' })
                const web3 = new Web3(currentProvider || 'ws://remotenode.com:8546');
                const userAccout = await web3.eth.getAccounts();
                if(acc !== userAccout[0]){
                    localStorage.setItem('userAddress', userAccout[0]);
                }
                setAccount(userAccout[0]);
                setUserId(userAccout[0]);
                setWallet(false);
                networkChanged(currentProvider.chainId);
                setNetworkId(parseInt(currentProvider.chainId,16));
                console.log("Network ID: ",parseInt(currentProvider.chainId,16));
                if(currentProvider.chainId !== '0x61'){
                    console.log("ChainId from state: ",chainId);
                    
                    alert("Connected to wrong network!");
                    handleNetworkSwitch('bscTestnet');
            } else if (window.web3) {
                    window.web3 = new Web3(window.web3.currentProvider)
                    window.loaded_web3 = true
                }
            }
        }
    if(acc){
        walletConnected()
}
// eslint-disable-next-line
  }, []);

  const networkChanged = (chainId) => {
    if(chainId === '0x61'){
        setNetworkName("Bsc Testnet");
        setNetworkId(97)
    }else if(chainId === '0x38'){
        setNetworkName('Bsc Mainnet');
        setNetworkId(56)
    }else {
        setNetworkName("Wrong Network");
    }
  };

const handleConnect = async () => {
    try {
        if(!window.ethereum){
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        } else if (window.ethereum) {
            const currentProvider = window.ethereum;
            setChainId(currentProvider.chainId);
            await currentProvider.request({ method: 'eth_requestAccounts' })
            const web3 = new Web3(currentProvider || 'ws://remotenode.com:8546');
            const userAccout = await web3.eth.getAccounts();
            setAccount(userAccout[0]);
            setUserId(userAccout[0]);
            localStorage.setItem("userAddress", userAccout[0]);
            setWallet(false);
            networkChanged(currentProvider.chainId);
            setNetworkId(parseInt(currentProvider.chainId,16));
            console.log("Network ID: ",parseInt(currentProvider.chainId,16));
            if(currentProvider.chainId !== '0x61'){
                console.log("ChainId from state: ",chainId);
                
                alert("Connected to wrong network!");
                handleNetworkSwitch('bscTestnet');
        } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
                window.loaded_web3 = true
            }
        }
    } catch (e) {
        console.log(e.message);
        setWallet(false);
    }
}

const connectWallet = () => {
    if (!wallet && !account) {
        setWallet(true);
    }else if(account){
        setWallet(true);
        setDisconnect(true)
    }else if(disconnect && account)
        setDisconnect(false);
}

const handleDisconnect = () => {
    if(userId){
        alert("Are you sure want to disconnect!");
        setAccount(null);
        setWallet(false);
        setChainId('');
        setNetworkName('');
        setUserId(null);
        localStorage.removeItem("userAddress");
    }else {
        setAccount(null);
        setWallet(false);
        setChainId('');
        setNetworkName('');
        setUserId(null);
    }
}
const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName });
  };

const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]
      });
    } catch (err) {
      console.error("Error",err);
    }
  };


return (
    <header>
        <Container className="custom-container">
            <div className="row">
                <div className="col-lg-12">
                    <Navbar expand="lg" className='p-0'>
                        <Container className='p-0'>
                            <Navbar.Brand href="#home" className='p-0'>
                                <strong>
                                    <a className="navbar-brand d-inline-block" href="/">
                                        <img className="img-fluid" src="./images/logo.png" alt="logo" />
                                    </a>
                                </strong>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                <Nav.Link href="/">
                                            Home
                                            <div className="nav-img">
                                                <img className="img-fluid" src="./images/nav-link-img.png" alt="nav 1" />
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link href="https://arhamsoft.gitbook.io/alora/" target="_blank">
                                            Whitepaper
                                            <div className="nav-img">
                                                <img className="img-fluid" src="./images/nav-link-img.png" alt="nav 3" />
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link href="/">
                                            Chart
                                            <div className="nav-img">
                                                <img className="img-fluid" src="./images/nav-link-img.png" alt="nav 3" />
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link href="/">
                                            Buy
                                            <div className="nav-img">
                                                <img className="img-fluid" src="./images/nav-link-img.png" alt="nav 4" />
                                            </div>
                                        </Nav.Link>
                                    <Nav.Link className='connect p-0'>
                                        <button className="btn" onClick={() => connectWallet()} >
                                            <Lottie
                                                loop
                                                animationData={connect}
                                                play
                                            />
                                            {!account ? 'Connect' : 'Connected'}
                                            <br />
                                            {account?networkName:''}
                                        </button>
                                        {wallet && !account && <div className='connect-to-alora'>
                                            <h5>Connect to Alora App</h5>
                                            <p>Please select a wallet to authenticate with $Alora.</p>
                                            <button className='metamask-btn' onClick={() => handleConnect()}>
                                                <img src='./images/metamask-logo.png' alt="metamask" />
                                                Metamask
                                            </button>
                                            <button className='metamask-btn' onClick={() => handleDisconnect()}>
                                                    Close
                                                </button>
                                            {/* <button className='metamask-btn'>
                                                    <img src='./images/wallet-connect.svg' alt="WallectConnect" />
                                                    WallectConnect
                                                </button> */}
                                            <p className='mb-0'><a className='yellow' href='/'>What is a wallet?</a></p>
                                        </div> }
                                           {wallet && account && disconnect &&
                                             <div className='connect-to-alora'>
                                            <h5>Disconnect</h5>
                                            <p>{account}</p>
                                            <button className='metamask-btn' onClick={() => handleDisconnect()}>
                                                <img src='./images/metamask-logo.png' alt="metamask" />
                                                Disconnect Wallet
                                            </button>
                                             <button className='metamask-btn' onClick={() => handleConnect()}>
                                                    Close
                                                </button> 
                                          {/*  <p className='mb-0'><a className='yellow' href='/'>What is a wallet?</a></p>
                                            */}
                                        </div> }

                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>
            </div>
        </Container>
    </header>
)
}
