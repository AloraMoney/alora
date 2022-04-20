import React from 'react'
import {  Container, Table } from 'react-bootstrap'

export default function CreateNode() {


    return (
        <section className="nodes-list">
            <Container className="custom-container">
                <div className="table-heading">
                    <h2>Nodes</h2>
                    <div className="btn-list">
                        <button className="btn btn-brown">All</button>
                        <button className="btn btn-brown">Basic</button>
                        <button className="btn btn-brown">Light</button>
                        <button className="btn btn-brown">Pro</button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tier</th>
                                <th>Creation Time</th>
                                <th>Limited</th>
                                <th>Rewards</th>
                                <th>RPC URL</th>
                                <th><input type="checkbox" name="test" /> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Basic</td>
                                <td>April 15, 2022, 11: 15 AM</td>
                                <td>due in 27 days</td>
                                <td>0.40566</td>
                                <td><span className="copy fa fa-copy"></span></td>
                                <td><input type="checkbox" name="test" /> </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Basic</td>
                                <td>April 15, 2022, 11: 15 AM</td>
                                <td>due in 27 days</td>
                                <td>0.40566</td>
                                <td><span className="copy fa fa-copy"></span></td>
                                <td><input type="checkbox" name="test" /> </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-end">
                        <button className="btn btn-brown">Approve BUSD</button>
                    </div>
                </div>
                <div className="info">
                    <p>Node maintenance Fees (payable in $BUSD)</p>
                    <ul>
                        <li>Basic = $5 per  month</li>
                        <li>Light = $15 per  month</li>
                        <li>Pro = $25 per  month</li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}
