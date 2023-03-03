import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationHag({ page, setPage, length, limit }) {
    const lastPage = Math.floor(length / limit) + 1
    const handleFirst = () => {
        setPage(1)
    }
    const handleNext = () => {
        if (page < lastPage)
            setPage(pre => pre + 1)
    }
    const handlePrev = () => {
        if (page > 1)
            setPage(pre => pre - 1)
    };
    const handleLast = () => {
        if (page < lastPage)
            setPage(lastPage)
    };

    const handleRenderPage = () => {
        if (page < 10) {
            return `0${page}`
        } else {
            return page
        }
    }

    return (
        <div id='Pagination_hag' >
            <Pagination >
                <Pagination.First onClick={handleFirst} />
                <Pagination.Prev onClick={handlePrev} />
                <Pagination.Item onClick={() => setPage(1)}>Trang : {handleRenderPage()}</Pagination.Item>
                <Pagination.Next onClick={handleNext} />
                <Pagination.Last onClick={handleLast} />
            </Pagination>

        </div>

    );
}

export default PaginationHag;