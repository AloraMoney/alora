import React,{ useState } from 'react'
// import { Tab } from 'bootstrap'
import { Col, Row,Container } from 'react-bootstrap'
import Web3 from 'web3';
import AloraNodeContract from '../contracts/AloraNode.json';
import {addressList} from '../utils/addresses';



export default function CreateNode({userId}) {

    const [active, setActive] = useState(false);
    const [tire, setTire] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [noOfNodes, setNoOfNodes] = useState(null);
    // const [isEligible, setIsEligible] = useState(false)
    // const [account, setAccount] = useState();
    console.log(userBalance);
    console.log(noOfNodes);
    const boxSelected = (tire) => {
        setActive(true);
        setTire(tire);
    }

    // useEffect(()=> {
    //     init();
    // }, [userId]);

    // const init = async() => {
    //     try {
    //         console.log({userId})
    //         if(!window.ethereum){
    //             window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //         } else if (window.ethereum) {
    //             const curretProvider = window.ethereum;
    //             // setChainId(curretProvider.chainId);
    //             const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
    //             const userAccout = await web3.eth.getAccounts();

    //             // setAccount(userAccout[0]);
    //             console.log("Current userAccount: ", userAccout[0]);
    //         }
    //     } catch (e) {
    //         console.log(e.message);
    //         // setWallet(false);
    //     }
    // }

    const approveAlora = async () => {
        console.log("Approve Tokens");
        if(userId){
            try {
                if(!window.ethereum){
                    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
                } else {
                    const curretProvider = window.ethereum;
                    const web3 = new Web3(curretProvider || 'ws://remotenode.com:8546');
                    // const userAccout = await web3.eth.getAccounts();
                    const amount = '115792089237316195423570985008687907853269984665640564039457';
                    const AloraContract = new web3.eth.Contract(AloraNodeContract.abi, addressList.AloraNode[97]);
                    const tx = await AloraContract.methods.approve(addressList.feeManager[97], web3.utils.toWei(amount, 'ether')).send({from: userId});
                    console.log(tx);
                    fetchUserBalance(AloraContract, userId);
                }
            } catch (e) {
                console.log(e.message);
                // setWallet(false);
            }
        } else {
            alert("Please first connect your wallet!");
        }
    }

    const fetchUserBalance = async(aloraContract, account) => {
        const balance = await aloraContract.methods.balanceOf(userId).call();
        setUserBalance(Web3.utils.fromWei(balance, 'ether'));
    }

    const updateNoOfNodes = (e) => {
        e.preventDefault();
        setNoOfNodes(e.target.value);
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
                                    <Row>
                                        <Col md="6" lg="4" onClick={() => boxSelected(1)}>
                                        <div className={`item ${active && tire === 1?"active":""}`}>
                                                <div className="image">
                                                    <img src="/images/Bronze.svg" alt="Tier" className="img-fluid" />
                                                </div>
                                                <div className="content">
                                                    <h4>Bronze</h4>
                                                    <p>10.0 Alora per Node</p>
                                                    <p>Earn 0.13 Alora per Day</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6" lg="4" onClick={() => boxSelected(2)}>
                                        <div className={`item ${active && tire === 2?"active":""}`}>
                                                <div className="image">
                                                    <img src="/images/Silver.svg" alt="Tier" className="img-fluid" />
                                                </div>
                                                <div className="content">
                                                    <h4>Silver</h4>
                                                    <p>50.0 Alora per Node</p>
                                                    <p>Earn 0.8 Alora per Day</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6" lg="4" onClick={() => boxSelected(3)}>
                                        <div className={`item ${active && tire === 3?"active":""}`}>
                                                <div className="image">
                                                    <img src="/images/Gold.svg" alt="Tier" className="img-fluid" />
                                                </div>
                                                <div className="content">
                                                    <h4>Gold</h4>
                                                    <p>100.0 Alora per Node</p>
                                                    <p>Earn 2.0 Alora per Days</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <h4 className="active-tier">Active Tier</h4>
                            <form action="">
                                <div className="nodes-input">
                                    <input type="text" placeholder="Number of Nodes" onChange={(e)=> updateNoOfNodes(e)} />
                                </div>
                            </form>

                            <div className="upgrade-nodes-part">
                                <div className="btn-list">
                                    <button className="btn btn-brown active" onClick={() => approveAlora()}>Approve Contract</button>
                                    
                                    <button className="btn btn-brown">Create Node</button>
                                    <button className="btn btn-brown">Compound Nodes</button>
                                    <button className="btn btn-brown">Transfer Node</button>
                                </div>
                                <div className="address-wrapper">
                                    <div className="input-wrapper">
                                        <input type="text" name="address" className="form-control" placeholder="Address "/>
                                    </div>
                                    <div className="action-btns">
                                        <button className="btn btn-brown">Confirm</button>
                                        <button className="btn btn-brown"> Cancel</button>
                                    </div>

                                </div>
                                <div className="upgrade-node">
                                    <h4>Upgrade Nodes</h4>
                                    <p>In order to upgrade node tiers, you must possess a quantity of $ALORA
                                        tokens that is equal to or greater than the difference in the tiers
                                        price.</p>
                                    <ul className="d-lg-flex">
                                        <li>Bronze to Silver nodes - Costs 5 Bronze nodes</li>
                                        <li>Bronze to Gold nodes - Costs 10 Bronze nodes</li>
                                        <li className="me-0">Silver to Gold nodes - Costs 2 Light nodes</li>
                                    </ul>
                                    <Row>
                                        <Col lg="6">
                                            <div className="nodes-input">
                                                <input type="text" placeholder="Number of Nodes" />
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="btn-list">
                                                <button className="btn btn-brown">Bronze</button>
                                                <button className="btn btn-brown">Sliver</button>
                                                <button className="btn btn-brown">Gold</button>
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
