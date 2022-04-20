import React from 'react'
import { Container } from 'react-bootstrap'

export default function AloraToken() {
    return (
        <section className="alora-token">
            <Container className="custom-container">
                <div className="row">
                    <div className="col-lg-7">
                        <h2><span>Create a node with</span><br /> $ALORA TOKENS to earn alora token rewards.</h2>
                    </div>
                    <div className="col-lg-5">
                        <div className="reward-shap">
                            <p>Rewards calculations are based on many factors, including the number of nodes, node
                                revenue, token price, and protocol revenue, which are variable and subject to change
                                over time.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
