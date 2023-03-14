import { formatDate3, formatMoney2 } from '@/config/formatMoney';
import PaginationHag from '@/layout/pagination';
import { UserSelector } from '@/redux/selector/UserSelector';
import { UpdateWithdrawSuccess } from '@/redux/slice/user';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';



function TableWithdraw({ Array }) {
    //Data
    const dispatch = useDispatch();
    const User = useSelector(UserSelector.Auth.User);
    const accessToken = useSelector(UserSelector.Auth.AccessToken);

    const [PendingRender, setPendingRender] = useState([]);
    //Pending
    const limit = 10;
    const [pagePending, setpagePending] = useState(1);
    useEffect(() => {
        const offset = (pagePending - 1) * limit;
        const listPending = Array.slice(offset, (limit + offset))
        setPendingRender(listPending);
    }, [Array, pagePending]);

    const handleDeleteWithdraw = async (withdraw) => {

    };
    const handleRefreshWithdraw = async () => {
        await UserPaymentsApi.Withdraws.GettAll(accessToken, dispatch, User?.id, UpdateWithdrawSuccess);
        toast.success("Làm mới thành công!")
    };
    return (
        <div id='TableWithdraw'>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr className='txt_center' >
                        <th>Mã giao dịch</th>
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
                                    <td>{item.sign?.split("_")[2]}</td>
                                    <td>{formatMoney2(item.amount)}</td>
                                    <td className={item.command === "withdraw" ? "text-primary" : "text-success"}>{item.command === "withdraw" ? "Rút tiền" : "Gửi tiền"}</td>
                                    <td>{item.BankOfUser?.Bank?.name} - {item.BankOfUser?.number}</td>
                                    <td className={item.status === "Pending" ? "text-primary" : item.status === "Error" ? "text-danger" : "text-success"}>{item.status === "Pending" ? "Đang xử lý" : item.status === "Success" ? "Thành công" : "Lỗi"}</td>
                                    <td>{formatDate3(item.createdAt)}</td>
                                    <td>
                                        <ButtonGroup>
                                            {
                                                item.status === "Pending" ?
                                                    <Button onClick={() => handleRefreshWithdraw()} variant='primary'>Làm mới</Button>
                                                    :
                                                    <Button onClick={() => handleDeleteWithdraw(item)} variant='danger'>Xóa</Button>
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