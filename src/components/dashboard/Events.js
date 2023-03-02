import React from 'react';
import { Table } from 'react-bootstrap';

function DashboardEvents(props) {
    return (
        <div id='DashboardEvents'>
            <div className='bgr_white mt-2'>

                <div className='event_content'>
                    <div className='event_item'>
                        <div className='hearder_hag'>
                            <h1>Sự Kiện</h1>
                        </div>
                        <div className='event_item_table'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan={2}>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardEvents;