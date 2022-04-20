import React from 'react'
import Lottie from 'react-lottie-player'
import wave from '../Assets/lotties/wave-lottie.json'
import nodes from '../Assets/lotties/total-nodes.json'
import rewards from '../Assets/lotties/rewards.json'
import {  Container } from 'react-bootstrap';
export default function Banner({userId}) {
    return (
        <div className="banner">
            <Container className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div className="lottie-wave">
                            <Lottie
                                loop
                                animationData={wave}
                                play
                                speed="0.8"
                            // style={{ width: 40, height: 40 }}
                            />
                            {/* <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_m3entfcy.json"
                                background="transparent" speed="0.5" loop autoplay></lottie-player> */}
                        </div>
                        <div className="banner-top text-center">
                            <h1>Welcome to Alora</h1>
                            <p>You can use this app to create Alora nodes, <span className="yellow">view, claim and
                                compound rewards.</span></p>
                        </div>
                        <div className="hexagone-wrapper">
                            <div className="hexagone-parent text-center">
                                <div className="hexagone">
                                    <div className="my-node ">
                                        <img className="img-fluid" src="./images/my-nodes.png" alt="My nodes Img" />
                                    </div>
                                </div>
                                <div className="list">
                                    <ul>
                                        <li>
                                            <span className="label">My Nodes: </span>
                                            <span className="value">0 / 130</span>
                                        </li>
                                        <li>
                                            <span className="label">Bronze: </span>
                                            <span className="value">0 / 100</span>
                                        </li>
                                        <li>
                                            <span className="label">Silver: </span>
                                            <span className="value">0 / 20</span>
                                        </li>
                                        <li>
                                            <span className="label">Gold: </span>
                                            <span className="value">0 / 10</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="hexagone-parent text-center">
                                <div className="hexagone">
                                    <div className="total-nonde ">
                                        <Lottie
                                            loop
                                            animationData={nodes}
                                            play
                                        />
                                        {/* <lottie-player
                                            src="https://assets4.lottiefiles.com/packages/lf20_slytwtf8.json"
                                            background="transparent" speed="0.5" loop autoplay></lottie-player> */}
                                    </div>
                                </div>
                                <div className="list">
                                    <ul>
                                        <li>
                                            <span className="label">Total Nodes: </span>
                                            <span className="value"> 9840</span>
                                        </li>
                                        <li>
                                            <span className="label">Bronze:  </span>
                                            <span className="value">4570</span>
                                        </li>
                                        <li>
                                            <span className="label">Silver:  </span>
                                            <span className="value">157</span>
                                        </li>
                                        <li>
                                            <span className="label">Gold: </span>
                                            <span className="value">18 / 9</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="hexagone-parent text-center">
                                <div className="hexagone">
                                    <div className="lottie-reward ">
                                        <Lottie
                                            loop
                                            animationData={rewards}
                                            play
                                        />
                                        {/* <lottie-player
                                            src="https://assets9.lottiefiles.com/packages/lf20_iehc3ou4.json"
                                            background="transparent" speed="0.5" loop autoplay></lottie-player> */}
                                    </div>
                                </div>
                                <div className="list">
                                    <ul>
                                        <li>
                                            <span className="label">Rewards:  </span>
                                            <span className="value"> 0.443389500</span>
                                        </li>
                                        <li>
                                            <span className="label">Bronze: </span>
                                            <span className="value">0.443389500</span>
                                        </li>
                                        <li>
                                            <span className="label">Silver:   </span>
                                            <span className="value">0.443389500</span>
                                        </li>
                                        <li>
                                            <span className="label">Gold:  </span>
                                            <span className="value">0.443389500</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
