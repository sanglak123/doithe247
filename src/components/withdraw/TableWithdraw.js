import { formatMoney2 } from '@/config/formatMoney';
import PaginationHag from '@/layout/pagination';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';


function TableWithdraw({ Array }) {

    const [PendingRender, setPendingRender] = useState([]);
    //Pending
    const limit = 10;
    const [pagePending, setpagePending] = useState(1);
    useEffect(() => {
        const offset = (pagePending - 1) * limit;
        const listPending = Array.slice(offset, (limit + offset))
        setPendingRender(listPending);
    }, [Array, pagePending]);

    return (
        <div id='TableWithdraw'>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr className='txt_center' >
                        <th>Sign</th>
                        <th>Số tiền</th>
                        <th>Giao dịch</th>
                        <th>Ngân hàng</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        PendingRender?.map((item, index) => {
                            return (
                                <tr className='txt_center' key={index}>
                                    <td>{item.sign}</td>
                                    <td>{formatMoney2(item.amount)}</td>
                                    <td>Rút tiền</td>
                                    <td>{item.BankOfUser?.Bank?.name} - {item.BankOfUser?.number}</td>
                                    <td>{item.status}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <ButtonGroup>
                                            {
                                                item.status === "Pending" ?
                                                    <Button variant='danger'>Hủy</Button>
                                                    :
                                                    <Button variant='danger'>Xóa</Button>
                                            }

                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <PaginationHag
                page={pagePending}
                setPage={setpagePending}
                length={Array.length}
                limit={limit}
            />
        </div>
    );
}

export default TableWithdraw;