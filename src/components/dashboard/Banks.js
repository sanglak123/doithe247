import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataSuccess } from '@/redux/slice/dataPublic';
import { ApiAdmins } from 'data/api/admins';
import { ApiUsers } from 'data/api/users';
import React, { useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Banks(props) {
    const dispatch = useDispatch();
    //Data   
    const Banks = useSelector(DataSelector.Banks);
    const ReceiveBanks = useSelector(DataSelector.ReceiveBanks);

    const [addBank, setAddBanks] = useState(false);
    const [addReceiveBank, setAddReceiveBanks] = useState(false);

    //Add
    const [name, setName] = useState("");
    const [sign, setSign] = useState("");
    const handleAddBank = async () => {
        await ApiAdmins.Banks.Add(name, sign)
        await ApiUsers.Data.LoadingData(dispatch, LoadingDataSuccess)
        setName("");
        setSign("");
        setAddBanks(false)
    };
    //Edit
    const [edit, setEdit] = useState("");
    const handleEditBank = async (bank) => {
        await ApiAdmins.Banks.Edit(name, sign, bank.id)
        setEdit(false);
        setName("");
        setSign("");
        await ApiUsers.Data.LoadingData(dispatch, LoadingDataSuccess)
    };
    //Delete
    const handleDeleteBank = async (bank) => {
        await ApiAdmins.Banks.Delete(bank.id)
        await ApiUsers.Data.LoadingData(dispatch, LoadingDataSuccess)
    }
    return (
        <div id='banks'>
            <div className='bgr_white mt-2 banks_content'>
                {
                    addBank &&
                    <div className='add_banks'>
                        <div className='hearder_hag'>
                            <h1>Thêm Mới Ngân Hàng</h1>
                        </div>
                        <div className='addBanks_content'>
                            <div className='addBank_items'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Tên ngân hàng."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Sign"
                                        value={sign}
                                        onChange={(e) => setSign(e.target.value)}
                                    />
                                    <Button onClick={() => handleAddBank()} disabled={name === "" || sign === ""}>Add</Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                }


                <div className='banks_item'>
                    <div className='hearder_hag'>
                        <h1>Danh Sách Ngân Hàng</h1>
                    </div>
                    <div className='table_banks'>
                        {
                            Banks.length > 0 &&
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr className='txt_center'>
                                        <th>#</th>
                                        <th>Tên Ngân Hàng</th>
                                        <th>Mã Ngân Hàng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Banks?.map((item, index) => {
                                            return (
                                                <tr key={index} className='txt_center'>
                                                    <td>{index + 1}</td>
                                                    {
                                                        edit === `${item.name}_${item.sign}` ?
                                                            <>
                                                                <td>
                                                                    <InputGroup className="mb-3">
                                                                        <Form.Control
                                                                            placeholder="Name"
                                                                            value={name}
                                                                            onChange={(e) => setName(e.target.value)}
                                                                            autoFocus
                                                                        />
                                                                    </InputGroup>
                                                                </td>
                                                                <td>
                                                                    <InputGroup className="mb-3">
                                                                        <Form.Control
                                                                            placeholder="Sign"
                                                                            value={sign}
                                                                            onChange={(e) => setSign(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </td>
                                                            </>
                                                            :
                                                            <>
                                                                <td>{item.name}</td>
                                                                <td>{item.sign}</td>
                                                            </>
                                                    }

                                                    <td>
                                                        <ButtonGroup>
                                                            {
                                                                edit === `${item.name}_${item.sign}` ?
                                                                    <>
                                                                        <Button onClick={() => handleEditBank(item)} variant='success'>Save</Button>
                                                                        <Button onClick={() => setEdit("")} variant='danger'>Cancle</Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Button onClick={() => {
                                                                            setEdit(`${item.name}_${item.sign}`);
                                                                            setName(item.name);
                                                                            setSign(item.sign)
                                                                        }} variant='success'>Edit</Button>
                                                                        <Button onClick={() => handleDeleteBank(item)} variant='danger'>Delete</Button>
                                                                    </>
                                                            }

                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </Table>
                        }

                    </div>
                </div>
                {
                    addBank ?
                        <Button className='btn_addBanks' variant='outline-danger' onClick={() => setAddBanks(false)}><i class="fa fa-minus"></i></Button>
                        :
                        <Button className='btn_addBanks' variant='outline-primary' onClick={() => setAddBanks(true)}><i className="fa fa-plus"></i></Button>
                }

            </div>

            <div className='bgr_white banks_content mt-2'>
                {
                    addReceiveBank &&
                    <div className='add_banks'>
                        <div className='hearder_hag'>
                            <h1>Thêm Mới Ngân Hàng</h1>
                        </div>
                        <div className='addBanks_content'>
                            <div className='addBank_items'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Tên ngân hàng."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Sign"
                                        value={sign}
                                        onChange={(e) => setSign(e.target.value)}
                                    />
                                    <Button onClick={() => handleAddBank()} disabled={name === "" || sign === ""}>Add</Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                }


                <div className='banks_item'>
                    <div className='hearder_hag'>
                        <h1>Danh Sách Ngân Hàng Public</h1>
                    </div>
                    <div className='table_banks'>
                        {
                            ReceiveBanks.length > 0 &&
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr className='txt_center'>
                                        <th>#</th>
                                        <th>Tên Ngân Hàng</th>
                                        <th>Mã Ngân Hàng</th>
                                        <th>Số Tài Khoản</th>
                                        <th>Chủ Tài Khoản</th>
                                        <th>Chi Nhánh</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ReceiveBanks?.map((item, index) => {
                                            return (
                                                <tr key={index} className='txt_center'>
                                                    <td>{index + 1}</td>
                                                    <td>{item.Bank?.name}</td>
                                                    <td>{item.Bank?.sign}</td>
                                                    <td>{item.number}</td>
                                                    <td>{item.owner}</td>
                                                    <td>{item.branch}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button variant='success'>Edit</Button>
                                                            <Button variant='danger'>Delete</Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </Table>
                        }

                    </div>
                </div>
                {
                    addReceiveBank ?
                        <Button className='btn_addBanks' variant='outline-danger' onClick={() => setAddReceiveBanks(false)}><i class="fa fa-minus"></i></Button>
                        :
                        <Button className='btn_addBanks' variant='outline-primary' onClick={() => setAddReceiveBanks(true)}><i className="fa fa-plus"></i></Button>
                }

            </div>


        </div>
    );
}

export default Banks;