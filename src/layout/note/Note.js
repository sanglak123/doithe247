import Link from 'next/link';
import React from 'react';

function Note(props) {
    return (
        <ul id='note' className='mt-3'>
            <li>
                <i className="fa fa-angle-double-right"></i>
                Rút tiền tối thiểu <span className='text-danger txt_bold'>10.000đ</span> -  Xử lý tự động cho đơn dưới <span className='text-success txt_bold'>1.000.000đ</span>
            </li>          
            <li>
                <i className="fa fa-angle-double-right"></i>
                SAI MỆNH GIÁ <span className='text-danger txt_bold'>-50%</span> THỰC NHẬN MỆNH GIÁ NHỎ HƠN
            </li>
            <li>
                <i className="fa fa-angle-double-right"></i>
                HỖ TRỢ,CHECK THẺ LỖI, THẺ TREO : <Link className='text-primary txt_bold' href={"/"}>BẤM VÀO ĐÂY !</Link>
            </li>
            <li>
                <i className="fa fa-angle-double-right"></i>
                THỐNG KÊ SẢN LƯỢNG: <Link href={"/"} className='text-primary txt_bold'>Tại đây.</Link>
            </li>
            <li>
                <i className="fa fa-angle-double-right"></i>
                ĐIỀN SAI SERI THẺ, KHIẾU NẠI WEB KHÔNG HỖ TRỢ.
            </li>
        </ul>
    );
}

export default Note;