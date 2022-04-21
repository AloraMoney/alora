import React,{ useState, useEffect } from 'react'
// import { Tab } from 'bootstrap'
import { Col, Row,Container } from 'react-bootstrap'
import Web3 from 'web3';
import AloraNodeContract from '../contracts/AloraNode.json';
import {addressList} from '../utils/addresses';
import { toast } from 'react-toastify';
import  config  from '../utils/tiers.json';
import Multicall from '@dopex-io/web3-multicall';
import { Oval } from  'react-loader-spinner'
import NodeManagerContract from '../contracts/NodeManager.json'

export default function CreateNode({userId , setReload, networkId, nodesData, loading, setLoading}) {

    const [active, setActive] = useState(false);
    const [tire, setTire] = useState(-1);
    const [userBalance, setUserBalance] = useState(null);
    const [noOfNodes, setNoOfNodes] = useState(null);
    const [userAllownce, setUserAllownce] = useState(null);
    const [activeTransfer, setActivetransfer] = useState(false);
    const [tiersData, setTiersData] = useState(null);
    const [transferNode, setTransferNode] = useState(false);
    const amount = '115792089237316195423570985008687907853269984665640564039457';
    const [transferAddress, setTransferAddress] = useState('');
    const [upgradeNoOfNodes, setUpgradeNoOfNodes] = useState(0);

    const boxSelected = (e) => {
        setActive(true);
        setTire(e);
    }

    useEffect(()=> {
        const initTiers = async() => {
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'https://data-seed-prebsc-2-s2.binance.org:8545/');
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                    const multicall = new Multicall({
                        multicallAddress: addressList.Multicall[97],
                        provider: curretProvider,
                    });
                    let alltiers = [];
                    for(let i=0; i<config.tiers.length; i++){
                        alltiers.push(NodeManager.methods.tierInfo(config.tiers[i]));
                    }
                    const req = await multicall.aggregate(alltiers);
                    setTiersData(req);
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        const init = async() => {
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    const userAccout = await web3.eth.getAccounts();
                    const AloraContract = new web3.eth.Contract(AloraNodeContract.abi, addressList.AloraNode[networkId?networkId:97]);
                    const allownce = await AloraContract.methods.allowance(userAccout[0], addressList.feeManager[networkId?networkId:97]).call();
                    const balance = await AloraContract.methods.balanceOf(userAccout[0]).call();
                    setUserAllownce(Web3.utils.fromWei(allownce, 'ether'));
                    setUserBalance(Web3.utils.fromWei(balance, 'ether')); 
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        if(userId !== null){
            init();
            initTiers();
        }
     // eslint-disable-next-line   
    }, [userId]);

    useEffect(() => {
        const initTiers = async() => {
            try {
                setLoading(true);
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                    const curretProvider = window.ethereum || 'https://data-seed-prebsc-2-s2.binance.org:8545/';
                    const web3 = new Web3(curretProvider);
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId?networkId:97]);
                    const multicall = new Multicall({
                        multicallAddress: addressList.Multicall[networkId?networkId:97],
                        provider: curretProvider,
                    });
                    let alltiers = [];
                    for(let i=0; i<config.tiers.length; i++){
                        alltiers.push(NodeManager.methods.tierInfo(config.tiers[i]));
                    }
                    const req = await multicall.aggregate(alltiers);
                    setTiersData(req);
                } else if (window.ethereum) {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'https://data-seed-prebsc-2-s2.binance.org:8545/');
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId?networkId:97]);
                    const multicall = new Multicall({
                        multicallAddress: addressList.Multicall[97],
                        provider: curretProvider,
                    });
                    let alltiers = [];
                    for(let i=0; i<config.tiers.length; i++){
                        alltiers.push(NodeManager.methods.tierInfo(config.tiers[i]));
                    }
                    const req = await multicall.aggregate(alltiers);
                    setTiersData(req);
                    setLoading(false);
                }
            } catch (e) {
                console.log(e.message);

            }
        }
        initTiers();
        // eslint-disable-next-line
    },[]);

    const approveAlora = async () => {
        if(userId){
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    const AloraContract = new web3.eth.Contract(AloraNodeContract.abi, addressList.AloraNode[networkId]);
                    const req = await AloraContract.methods.approve(addressList.feeManager[networkId], web3.utils.toWei(amount, 'ether')).estimateGas({from: userId});
                    if(req){
                        const tx = await AloraContract.methods.approve(addressList.feeManager[networkId], web3.utils.toWei(amount, 'ether')).send({from: userId});
                        console.log(tx);
                        fetchUserBalance(AloraContract);
                        setUserAllownce(web3.utils.toWei(amount, 'ether'));
                    }

                    
                }
            } catch (err) {
                var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                console.log(errorCustom);
                toast.error(errorCustom, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
    }

    const fetchUserBalance = async(aloraContract) => {
        const balance = await aloraContract.methods.balanceOf(userId).call();
        setUserBalance(Web3.utils.fromWei(balance, 'ether'));
    }

    const updateNoOfNodes = (e) => {
        e.preventDefault();
        setNoOfNodes(parseInt(e.target.value));
        if(parseInt(e.target.value) > 0 ){
            setActivetransfer(true);
        }else {
            setActivetransfer(false);
        }
    }

    const triePrice = (tire_no) => {
        if(tiersData){
            let selectedTier = tiersData[tire_no];
            let tierPrice = Web3.utils.fromWei(selectedTier[1], 'ether');
            return parseInt(tierPrice)
        }
    }
    const maxPurchase = (tire_no) => {
        if(tiersData){
            let selectedTier = tiersData[tire_no];
            let max = selectedTier[5];;
            return max;
        }
    }

    const handelCreateNode = async() => {
        if(tire < 0){
            toast.warn('Please select your tier first', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(noOfNodes < 1){
            toast.warn('Please enter the number of nodes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(noOfNodes > maxPurchase(tire)){
            toast.warn(`Not allowed to create nodes more than ${maxPurchase(tire)}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            const requiredToken = noOfNodes * triePrice(tire);
            if(userBalance < requiredToken){
                toast.warn('Not have enough $ALORA to create node', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else {
                try {
                    if(!window.ethereum){
                        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                    } else {
                        const curretProvider = window.ethereum;
                        const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                        const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                        const s_tier  = tiersData[tire];
                        const req = await NodeManager.methods.create(s_tier[0], '', noOfNodes).estimateGas({from: userId});
                        if(req){
                            const tx = await NodeManager.methods.create(s_tier[0], '', noOfNodes).send({from: userId});
                            console.log(tx);
                            setReload(true);
                        }                        
                    }
                } catch (err) {
                    var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                    errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                    console.log(errorCustom);
                    toast.error(errorCustom, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
        }

    }

    const handelCompondNode = async() => {
        if(tire < 0){
            toast.warn('Please select your tier first', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(noOfNodes < 1){
            toast.warn('Please enter the number of nodes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(noOfNodes > getUserTierBalance(tire)){
            toast.warn('Not have enough no of nodes to compound!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
                try {
                    if(!window.ethereum){
                        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                    } else {
                        const curretProvider = window.ethereum;
                        const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                        const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                        const s_tier  = tiersData[tire];
                        const req = await NodeManager.methods.compound(s_tier[0], '', noOfNodes).estimateGas({from: userId});
                        if(req){
                            const tx = await NodeManager.methods.compound(s_tier[0], '', noOfNodes).send({from: userId});
                            console.log(tx);
                            setReload(true);
                        }
                            
                    }
                } catch (err) {
                    var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                    errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                    console.log(errorCustom);
                    toast.error(errorCustom, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
        }

    const handleTransfer = async() => {
        if(tire < 0){
            toast.warn('Please select your tier first', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(noOfNodes < 1){
            toast.warn('Please enter the number of nodes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(transferAddress === ''){
            toast.warn('Please enter the recivers address', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else {
                try {
                    if(!window.ethereum){
                        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                    } else{
                        const curretProvider = window.ethereum;
                        const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                        const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                        const s_tier  = tiersData[tire];
                        const req = await NodeManager.methods.transfer(s_tier[0], noOfNodes, transferAddress).estimateGas({from: userId});
                        if(req){
                            const tx = await NodeManager.methods.transfer(s_tier[0], noOfNodes, transferAddress).send({from: userId});
                            console.log(tx);
                            setReload(true);
                        }
                            
                    }
                } catch (err) {
                    var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                    errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                    console.log(errorCustom);
                    toast.error(errorCustom, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
        }
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

    const getUserTierBalance = (tierNo) => {
        if(nodesData){
            if(tierNo === 0){
                return nodesData[5];
            }else if(tierNo === 1){
                return nodesData[6]
            }else if(tierNo === 2){
                return nodesData[7]
            }
        }
    }

    const handleUpgradeNoOfNodes = (e) => {
        e.preventDefault();
        setUpgradeNoOfNodes(e.target.value);
    }

    const handelBronzeToSilver = async () => {
        if(getUserTierBalance(0) <  upgradeNoOfNodes * 5){
            toast.error('Not have enough no of Bronze node', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                    const req = await NodeManager.methods.upgrade('bronze', 'silver', upgradeNoOfNodes).estimateGas({from: userId});
                    if(req){
                        const tx = await NodeManager.methods.upgrade('bronze', 'silver', upgradeNoOfNodes).send({from: userId});
                        console.log(tx);
                        setReload(true);
                    }
                        
                }
            } catch (err) {
                var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                console.log(errorCustom);
                toast.error(errorCustom, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

        }
    }

    const handelBronzeToGold = async () => {
        if(getUserTierBalance(0) <  upgradeNoOfNodes * 10){
            toast.error('Not have enough no of Bronze node', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                    const req = await NodeManager.methods.upgrade('bronze', 'gold', upgradeNoOfNodes).estimateGas({from: userId});
                    if(req){
                        const tx = await NodeManager.methods.upgrade('bronze', 'gold', upgradeNoOfNodes).send({from: userId});
                        console.log(tx);
                        setReload(true);
                    }
                        
                }
            } catch (err) {
                var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                console.log(errorCustom);
                toast.error(errorCustom, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
    }

    const handelSilverToGold = async () => {
        if(getUserTierBalance(1) <  upgradeNoOfNodes * 2){
            toast.error('Not have enough no of Silver node', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            try {
                if(!window.ethereum){
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    const NodeManager = new web3.eth.Contract(NodeManagerContract.abi, addressList.NodeManager[networkId]);
                    const req = await NodeManager.methods.upgrade('silver', 'gold', upgradeNoOfNodes).estimateGas({from: userId});
                    if(req){
                        const tx = await NodeManager.methods.upgrade('silver', 'gold', upgradeNoOfNodes).send({from: userId});
                        console.log(tx);
                        setReload(true);
                    }
                        
                }
            } catch (err) {
                var errorCustom = JSON.parse(err.message.replace('Internal JSON-RPC error.','').trim());
                errorCustom = errorCustom.message.replace('execution reverted:','').trim();
                console.log(errorCustom);
                toast.error(errorCustom, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
    }

    return (
        <section className="create-node">
            <Container className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div className="create-node-wrapper">
                            <div className="rectangle-mb">
                                <div className="text-center">
                                    <div className="node-rectanle">
                                        <h3 className="yellow">Create a Node</h3>
                                    </div>
                                    <p>Choose between the three tiers of nodes below</p>
                                </div>
                                <div className="tiers-list">
                                   {loading && 
                                        <Oval
                                        ariaLabel="loading-indicator"
                                        height={100}
                                        width={100}
                                        strokeWidth={5}
                                        color="red"
                                        secondaryColor="yellow"
                                      />
                                   }
                                    <Row>
                                        { 
                                            tiersData ? tiersData.map((item, index) => {
                                                return(
                                                    <Col md="6" lg="4" key={index}  >
                                                    <div className={`item ${active && tire === index?"active":""}`} 
                                                    id={index}
                                                    onClick={()=>boxSelected(index)}
                                                    >
                                                            <div className="image">
                                                                <img src={`/images/${capitalize(item[0])}.svg`} alt="Tier" className="img-fluid" />
                                                            </div>
                                                            <div className="content">
                                                                <h4>{capitalize(item[0])}</h4>
                                                                <p>{Web3.utils.fromWei(item[1], "ether")} Alora per Node</p>
                                                                <p>Earn {Web3.utils.fromWei(item[2], "ether")} Alora per Day</p>
                                                            </div>
                                                            <span className="tick fa fa-check"></span>
                                                        </div>
                                                    </Col>
                                                )                                                 
                                             })
                                            : ''
                                        }
                                    </Row>
                                </div>
                            </div>
                            <h4 className="active-tier">Active Tier</h4>
                            <form action="">
                                <div className="nodes-input">
                                    <input 
                                        type="text" 
                                        placeholder="Number of Nodes"
                                        onChange={(e)=> updateNoOfNodes(e)}
                                        // disabled={tire<0?true:false}
                                    />
                                </div>
                            </form>

                            <div className="upgrade-nodes-part">
                                <div className="btn-list">
                                    <button
                                        className={`btn btn-brown ${userAllownce <= 0 && userId ?"active": ''}`}
                                        onClick={() => approveAlora()}
                                        disabled={userAllownce <= 0 && userId  ? false: true}
                                    >
                                            {userAllownce > 0  ?"Approved": 'Approve Contract'} 
                                    </button>
                                    
                                    <button 
                                        className={`btn btn-brown ${userId && userAllownce > 0?"active": ''}`} 
                                        onClick={() => handelCreateNode()}
                                        disabled={userId && userAllownce > 0 ? false: true}
                                    >
                                        Create Node
                                    </button>
                                    <button 
                                        className={`btn btn-brown ${userId && userAllownce > 0 ?"active": ''}`}
                                        disabled={userId && userAllownce > 0 ? false: true}
                                        onClick={() => handelCompondNode()}
                                    >
                                        Compound Nodes
                                    </button>
                                    <button 
                                        className={`btn btn-brown ${noOfNodes <= getUserTierBalance(tire) && activeTransfer && userId ?"active": ''}`}
                                        disabled={noOfNodes <= getUserTierBalance(tire) && activeTransfer && userId ?false:true}
                                        onClick={() => (setTransferNode(!transferNode))}
                                    >Transfer Node</button>
                                </div>
                                {transferNode && <div className="address-wrapper">
                                    <div className="input-wrapper">
                                        <input type="text" name="address" className="form-control" onChange={(e) => setTransferAddress(e.target.value)} placeholder="Address "/>
                                    </div>
                                    <div className="action-btns">
                                        <button
                                            className="btn btn-brown"
                                            onClick={() => handleTransfer()}
                                         >Confirm</button>
                                        <button className="btn btn-brown" onClick={() => (setTransferNode(!transferNode))}> Cancel</button>
                                    </div>

                                </div>}
                                <div className="upgrade-node">
                                    <h4>Upgrade Nodes</h4>
                                    <p>In order to upgrade node tiers, you must possess a quantity of $ALORA
                                        tokens that is equal to or greater than the difference in the tiers
                                        price.</p>
                                    <ul className="">
                                        <li>Bronze to Silver nodes - Costs 5 Bronze nodes</li>
                                        <li>Bronze to Gold nodes - Costs 10 Bronze nodes</li>
                                        <li className="me-0">Silver to Gold nodes - Costs 2 Silver nodes</li>
                                    </ul>
                                    <Row>
                                        <Col lg="4">
                                            <div className="nodes-input">
                                                <input type="text" placeholder="Number of Nodes" onChange={(e) => handleUpgradeNoOfNodes(e)}/>
                                            </div>
                                        </Col>
                                        <Col lg="8">
                                            <div className="btn-list">
                                                <button 
                                                    className={`btn btn-brown ${(getUserTierBalance(0) >=  upgradeNoOfNodes * 5) && userId && upgradeNoOfNodes ?"active": ''}`}
                                                    disabled={(getUserTierBalance(0) >=  upgradeNoOfNodes * 5) && userId && upgradeNoOfNodes ?false:true}
                                                    onClick={() => handelBronzeToSilver()}
                                                >Bronze ⇒ Silver</button>
                                                <button 
                                                    className={`btn btn-brown ${(getUserTierBalance(0) >=  upgradeNoOfNodes * 10) && userId && upgradeNoOfNodes ?"active": ''}`}
                                                    disabled={(getUserTierBalance(0) >=  upgradeNoOfNodes * 10) && userId && upgradeNoOfNodes ?false:true}
                                                    onClick={() => handelBronzeToGold()}
                                                >Bronze ⇒ Gold</button>
                                                <button 
                                                    className={`btn btn-brown ${(getUserTierBalance(1) >=  upgradeNoOfNodes * 2) && userId && upgradeNoOfNodes ?"active": ''}`}
                                                    disabled={(getUserTierBalance(1) >=  upgradeNoOfNodes * 2) && userId && upgradeNoOfNodes ?false:true}
                                                    onClick={() => handelSilverToGold()}
                                                >Silver ⇒ Gold</button>
                                            </div>
                                        </Col>
                                    </Row>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
