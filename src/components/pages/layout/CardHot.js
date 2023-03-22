import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import { DataSelector } from '@/redux/selector/DataSelector';
import { formatMoney } from '@/config/formatMoney';

function CardsHot(props) {
    //Data   
    const Prices = useSelector(DataSelector.Prices).filter(item => item.Card?.change === true);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
        ]
    };
    return (
        <div id='cards_hot' className='mt-3 animate__animated  animate__fadeInRight'>
            <div className='bgr_dark'>
                <div className='hearder_hag'>
                    <h1>Sản Phẩm Hot</h1>
                </div>
                <div className='card_hot_content'>

                    <Slider {...settings}>
                        {
                            Prices?.map((item, index) => {
                                return (
                                    <div key={index} className='card_hot_items'>
                                        <div className='item_img'>
                                            <img src={item.Card?.Img?.path} alt={item.Card?.telco} className='img-fluid' />
                                        </div>
                                        <div className='item_title'>
                                            <h6>{formatMoney(item.Value?.name)}</h6>
                                        </div>
                                        <div className='item_fees'>
                                            {
                                                item.feesChange &&
                                                <p><span className='text-success txt_bold'>Đổi thẻ :</span> {item.feesChange} %</p>
                                            }
                                            {
                                                item.feesBuy &&
                                                <p><span className='text-success txt_bold'>Mua thẻ :</span> {item.feesBuy} %</p>
                                            }
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default CardsHot;