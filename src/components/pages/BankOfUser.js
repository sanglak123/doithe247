import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { RefreshBankOfUserSuccess, AddBankOfUserSuccess } from '@/redux/slice/user';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorLogin from './layout/ErrorLogin';

function BankOfUser(props) {
    const dispatch = useDispatch();
    //Data  
    const Banks = useSelector(DataSelector.Banks);
    const User = useSelector(UserSelector.Auth.User);
    const AccessToken = useSelector(UserSelector.Auth.AccessToken);
    const axiosJwt = CreateAxiosInstance(dispatch, AccessToken);

    const [idBank, setIdBank] = useState("");
    const [number, setNumber] = useState("");
    const [owner, setOwner] = useState("");
    const [branch, setBranch] = useState("");

    const BankOfUsers = useSelector(UserSelector.Payments.BankOfUsers);

    //Add
    const handleAddBankOfUser = async () => {
        await UserPaymentsApi.BankOfUser.Add(idBank, number, owner, branch, User?.id, dispatch, AddBankOfUserSuccess, AccessToken, axiosJwt);
        setBranch("");
        setNumber("");
        setOwner("");
    };

    //Edit
    const [edit, setEdit] = useState("");

    const handleEditBankOfUser = async (bank) => {
        await UserPaymentsApi.BankOfUser.Edit(bank.id, number, owner, branch, User.id, AccessToken, axiosJwt, dispatch, RefreshBankOfUserSuccess);
        setEdit("");
    };

    //Add
    const handleDeleteBankOfUser = async (bank) => {
        await UserPaymentsApi.BankOfUser.Delete(bank.id, User?.id, dispatch, RefreshBankOfUserSuccess, AccessToken, axiosJwt);
    };
    return (
        AccessToken ?
            <div id='user_payments'>
                <div className='user_payments_content bgr_white'>

                    <div className='user_payments_items'>
                        <div className='hearder_hag'>
                            <h1>T??i Kho???n Ng??n H??ng</h1>
                        </div>
                        <div className='table_user_payments'>
                            {
                                BankOfUsers.length > 0 ?
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr className='txt_center'>
                                                <th>#</th>
                                                <th>T??n Ng??n H??ng</th>
                                                <th>M?? Ng??n H??ng</th>
                                                <th>S??? t??i kho???n</th>
                                                <th>Ch??? t??i kho???n</th>
                                                <th>Chi nh??nh</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                BankOfUsers?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className="txt_center">
                                                            <td>{index + 1}</td>
                                                            <td>{item?.Bank?.name}</td>
                                                            <td>{item?.Bank?.sign}</td>
                                                            {
                                                                edit === `${item?.Bank?.id}_${item?.owner}` ?
                                                                    <>

                                                                        <td>
                                                                            <InputGroup>
                                                                                <Form.Control
                                                                                    type={"text"}
                                                                                    placeholder='S??? t??i kho???n'
                                                                                    value={number}
                                                                                    onChange={(e) => setNumber(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                        </td>
                                                                        <td><InputGroup>
                                                                            <Form.Control
                                                                                type={"text"}
                                                                                placeholder='Ch??? t??i kho???n'
                                                                                value={owner}
                                                                                onChange={(e) => setOwner(e.target.value)}
                                                                            />
                                                                        </InputGroup></td>
                                                                        <td>
                                                                            <InputGroup>
                                                                                <Form.Control
                                                                                    type={"text"}
                                                                                    placeholder='Chi Nh??nh'
                                                                                    value={branch}
                                                                                    onChange={(e) => setBranch(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                        </td>
                                                                        <td>
                                                                            <ButtonGroup>
                                                                                <Button onClick={() => handleEditBankOfUser(item)} variant='success'>Save</Button>
                                                                                <Button onClick={() => {
                                                                                    setEdit("");
                                                                                    setNumber("");
                                                                                    setOwner("");
                                                                                    setBranch("")
                                                                                }} variant='danger'>Cancle</Button>
                                                                            </ButtonGroup>
                                                                        </td>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <td>{item?.number}</td>
                                                                        <td>{item?.owner}</td>
                                                                        <td>{item?.branch}</td>
                                                                        <td>
                                                                            <ButtonGroup>
                                                                                <Button onClick={() => {
                                                                                    setEdit(`${item.Bank.id}_${item.owner}`);
                                                                                    setNumber(item.number);
                                                                                    setOwner(item.owner);
                                                                                    setBranch(item.branch)
                                                                                }} variant='success'>Edit</Button>
                                                                                <Button onClick={() => handleDeleteBankOfUser(item)} variant='danger'>Delete</Button>
                                                                            </ButtonGroup>
                                                                        </td>
                                                                    </>
                                                            }

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    :
                                    <div className='table_user_payments'>
                                        <h4 className='text-danger ms-5'>B???n ch??a c?? ng??n h??ng n??o!</h4>
                                    </div>

                            }

                        </div>
                    </div>

                    <div className='user_payments_items'>
                        <div className='hearder_hag'>
                            <h1>Th??m M???i Ng??n H??ng</h1>
                        </div>
                        <div className='add_banks'>
                            <Form.Select onChange={(e) => setIdBank(e.target.value)}>
                                <option value={""}>- Ch???n Ng??n H??ng -</option>
                                {
                                    Banks?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{`${item.name} (${item.sign})`}</option>
                                        )
                                    })
                                }

                            </Form.Select>

                            <InputGroup className="mt-3">
                                <InputGroup.Text id="basic-addon1"><i className="fa fa-id-card"></i></InputGroup.Text>
                                <Form.Control
                                    placeholder="S??? t??i kho???n"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mt-3">
                                <InputGroup.Text id="basic-addon1"><i className="fa fa-user-shield"></i></InputGroup.Text>
                                <Form.Control
                                    placeholder="Ch??? t??i kho???n"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mt-3">
                                <InputGroup.Text id="basic-addon1"><i className="fa fa-code-branch"></i></InputGroup.Text>
                                <Form.Control
                                    placeholder="Chi nh??nh"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            </InputGroup>
                            <div className='mt-3'>
                                <Button disabled={idBank === "" || number === "" || owner === "" || branch === ""} onClick={() => handleAddBankOfUser()}>Th??m</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <ErrorLogin />
    );
}

export default BankOfUser;