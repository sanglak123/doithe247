import PaginationHag from '@/layout/pagination';
import { DataSelector } from '@/redux/selector/DataSelector';
import { ChangeTypeCardSuccess, EditCardSuccess, UpdateCardSuccess } from '@/redux/slice/dataPublic';
import { AdminApiCards } from 'data/api/admin/cards';
import { DataPublicApi } from 'data/api/datapublic';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function AdminCards({ accessToken }) {
    const dispatch = useDispatch();


    //Data
    const Cards = useSelector(DataSelector.Cards);

    //List Card
    const limit = 10;
    const [pageCard, setPageCard] = useState(1);
    const [ListCard, setListCard] = useState([]);

    useEffect(() => {
        const offset = (pageCard - 1) * limit;
        const lits = Cards?.slice(offset, (offset + limit));
        setListCard(lits);
    }, [Cards, pageCard]);

     const [edit, setEdit] = useState("");
    const [telco, setTelco] = useState("");
    const [photo, setPhoto] = useState("");
    const [change, setChange] = useState(false);

    const handleEditCard = async (card) => {
        await AdminApiCards.Edit(card.id, telco, photo, change, dispatch, accessToken);
        await DataPublicApi.Cards.GetAll(dispatch, UpdateCardSuccess);
        setEdit("")
    };
    const handleChangeTypeCard = async (card) => {
        await AdminApiCards.ChangeType(accessToken, dispatch, card.id, ChangeTypeCardSuccess);
    }
    //Delete
    const handleDeleteCard = async (card) => {
        await ApiAdmins.Cards.Delete(card.id)
    };

    return (
        <div id='List_Cards'>
            <div className='table_card_list bgr_white mt-2'>
                <div className='hearder_hag'>
                    <h1>Cards List</h1>
                </div>
                <div className='table_card'>
                    <Table bordered size="sm">
                        <thead>
                            <tr className='txt_center txt_white'>
                                <th>#</th>
                                <th>Telco</th>
                                <th>Logo</th>
                                <th>Type</th>
                                <th>Change</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ListCard?.map((item, index) => {
                                    return (
                                        <tr className='txt_center txt_white' key={index}>
                                            <td>{index + 1}</td>
                                            {
                                                edit === `${item.telco}_${item.id}` ?
                                                    <>
                                                        <td className='txt_light'>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    placeholder="Telco"
                                                                    aria-label="Telco"
                                                                    aria-describedby="basic-telco"
                                                                    autoFocus
                                                                    value={telco}
                                                                    onChange={(e) => setTelco(e.target.value)}
                                                                />
                                                            </InputGroup>
                                                        </td>
                                                        <td>  <InputGroup className="mb-3">
                                                            <Form.Control
                                                                type='file'
                                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                            />
                                                        </InputGroup>
                                                        </td>
                                                        <td>{item.TypeCard?.name}</td>
                                                        <td>
                                                            <Form.Check
                                                                type={"switch"}
                                                                checked={change}
                                                                onChange={() => setChange(!change)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => handleEditCard(item)} variant='success'>Save</Button>
                                                                <Button onClick={() => {
                                                                    setEdit("");
                                                                    setTelco("");
                                                                    setPhoto("");
                                                                }} variant='danger'>Cancle</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>{item.telco}</td>
                                                        <td>
                                                            <div className='logo' style={{ maxWidth: "100px", margin: "0 auto" }}>
                                                                <img src={item.Img?.path} alt={item.telco} className="img-fluid" />
                                                            </div>
                                                        </td>
                                                        <td>{item.TypeCard?.name}</td>
                                                        <td>
                                                            <Form.Check
                                                                type={"switch"}
                                                                checked={item.change}
                                                                onChange={() => handleChangeTypeCard(item)}
                                                            />
                                                        </td>

                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => {
                                                                    setEdit(`${item.telco}_${item.id}`);
                                                                    setTelco(item.telco);
                                                                    setChange(item.change)
                                                                }} variant='success'>Edit</Button>
                                                                <Button onClick={() => handleDeleteCard(item)} variant='danger'>Delete</Button>
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
                    <PaginationHag
                        limit={limit}
                        page={pageCard}
                        setPage={setPageCard}
                        length={Cards.length}
                    />
                </div>
            </div>
            <Button variant='outline-danger' className='btn_add_card txt_bold'>+</Button>
        </div>
    );
}

export default AdminCards;