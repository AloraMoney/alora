import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
    return (
        <footer>
            <Container className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <strong className="footer-logo">
                            <a className="d-inline-block" href="/">
                                <img src="./images/logo.png" alt="Footer logo" />
                            </a>
                        </strong>
                        <ul className="footer-links p-0 d-flex">
                            <li>
                                <a href="/">Whitepaper</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/aloramoney">Twitter</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/aloramoney">Discord</a>
                            </li>
                            <li>
                                <a href="/">Chart</a>
                            </li>
                            <li>
                                <a href="/">BuyNow</a>
                            </li>
                            <li className="me-0">
                                <a href="/">BSCScan</a>
                            </li>
                        </ul>
                        <p className="copywrite">© 2022 Alora. All Rights Reserved.</p>
                        <div className="social-icons">
                            <ul className="d-flex p-0">
                                <li>
                                    <a className="d-inline-block" href="/">
                                        <img src="./images/linkedin.png" alt="linkedin icon" />
                                    </a>
                                </li>
                                <li>
                                    <a className="d-inline-block" href="https://twitter.com/aloramoney">
                                        <img src="./images/twitter.png" alt="twitter icon" />
                                    </a>
                                </li>
                                <li>
                                    <a className="d-inline-block" href="/">
                                        <img src="./images/youtube.png" alt="Youtube icon" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
