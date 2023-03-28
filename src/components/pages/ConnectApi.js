import React, {useState} from "react"
import {Col, Row} from "react-bootstrap"

function ConnectApi(props) {
    const [type, setType] = useState("FeesChange")

    const handRenderApi = () => {
        switch (type) {
            case "FeesBuy":
                return <ApiFeesBuy />

            case "PostCard":
                return <ApiPostCard />

            case "BuyCard":
                return <ApiBuyCard />

            default:
                return <ApiFeesChange />
        }
    }
    return (
        <div id="ConnectApi" className="mt-3 animate__animated animate__fadeIn">
            <div className="api_content">
                <div className="bgr_dark">
                    <div className="hearder_hag">
                        <h1>API DOITHE247</h1>
                    </div>
                    <div className="api_items">
                        <Row>
                            <Col xs={3}>
                                <div
                                    className="api_item bgr_black"
                                    onClick={() => setType("FeesChange")}
                                >
                                    <div className="item_content">
                                        <div className="api_logo">
                                            <span class="material-symbols-outlined">
                                                price_change
                                            </span>
                                        </div>
                                        <div className="api_title">
                                            <p>Giá tẩy thẻ</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div
                                    className="api_item bgr_dark"
                                    onClick={() => setType("FeesBuy")}
                                >
                                    <div className="item_content">
                                        <div className="api_logo">
                                            <span class="material-symbols-outlined">
                                                local_atm
                                            </span>
                                        </div>
                                        <div className="api_title">
                                            <p>Giá mua thẻ</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div
                                    className="api_item bgr_dark"
                                    onClick={() => setType("PostCard")}
                                >
                                    <div className="item_content">
                                        <div className="api_logo">
                                            <span class="material-symbols-outlined">
                                                credit_score
                                            </span>
                                        </div>
                                        <div className="api_title">
                                            <p>Gửi thẻ</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div
                                    className="api_item bgr_dark"
                                    onClick={() => setType("BuyCard")}
                                >
                                    <div className="item_content">
                                        <div className="api_logo">
                                            <span class="material-symbols-outlined">
                                                add_card
                                            </span>
                                        </div>
                                        <div className="api_title">
                                            <p>Mua thẻ</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="bgr_dark mt-3">
                    <div className="code_api">
                        <div className="code_api_content">
                            <div className="code_api_hearder">
                                <div className="hearder_hag">
                                    <h1>{type}</h1>
                                </div>
                            </div>
                            <div className="code_api_render">
                                {handRenderApi()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectApi

const ApiFeesChange = () => {
    return (
        <div id="api_feesChange">
            <div className="list_api code_sample bgr_dark">
                <div className="list_api_item d-flex justify-content-start">
                    <div className="method me-5 mb-3">
                        <p>Method</p>
                        <div id="code_method">GET</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>URL</p>
                        <div>http://localhost:3000/api/data/getprices</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Headers</p>
                        <div>partner_id</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Data</p>
                        <div>Null</div>
                    </div>
                </div>
            </div>

            <div className="sample">
                <p className="mt-2 mb-2">Code mẫu : Nodejs + Axios</p>
                <pre className="code_sample bgr_black">
                    <code>
                        {`import axios from "axios"
const GetPrice = async () => {
        await axios({
        method: "GET",
        url: "http://localhost:3000/api/data/getprices",
        headers: {
            partner_id: "askhthjljhyhy-1545656-221"
        }
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
};
GetPrice();`}
                    </code>
                </pre>
            </div>
        </div>
    )
}
const ApiFeesBuy = () => {
    return (
        <div id="api_feesChange">
            <div className="list_api code_sample">
                <div className="list_api_item d-flex justify-content-start">
                    <div className="method me-5 mb-3">
                        <p>Method</p>
                        <div id="code_method">GET</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>URL</p>
                        <div>http://localhost:3000/api/data/getprices</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Headers</p>
                        <div>partner_id</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Data</p>
                        <div>Null</div>
                    </div>
                </div>
            </div>

            <div className="sample">
                <p className="mt-2 mb-2">Code mẫu : Nodejs + Axios</p>
                <pre className="code_sample bgr_black">
                    <code>
                        {`import axios from "axios"
const GetPrice = async () => {
    await axios({
    method: "GET",
    url: "http://localhost:3000/api/data/getprices",
    headers: {
        partner_id: "askhthjljhyhy-1545656-221"
    }
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err)
})
};
GetPrice();`}
                    </code>
                </pre>
            </div>
        </div>
    )
}

const ApiPostCard = () => {
    return (
        <div id="api_feesChange">
            <div className="list_api code_sample">
                <div className="list_api_item d-flex justify-content-start">
                    <div className="method me-5 mb-3">
                        <p>Method</p>
                        <div id="code_method">GET</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>URL</p>
                        <div>http://localhost:3000/api/data/getprices</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Headers</p>
                        <div>partner_id</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Data</p>
                        <div>Null</div>
                    </div>
                </div>
            </div>

            <div className="sample">
                <p className="mt-2 mb-2">Code mẫu : Nodejs + Axios</p>
                <pre className="code_sample bgr_black">
                    <code>
                        {`import axios from "axios"
const GetPrice = async () => {
    await axios({
    method: "GET",
    url: "http://localhost:3000/api/data/getprices",
    headers: {
        partner_id: "askhthjljhyhy-1545656-221"
    }
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err)
})
};
GetPrice();`}
                    </code>
                </pre>
            </div>
        </div>
    )
}

const ApiBuyCard = () => {
    return (
        <div id="api_feesChange">
            <div className="list_api code_sample">
                <div className="list_api_item d-flex justify-content-start">
                    <div className="method me-5 mb-3">
                        <p>Method</p>
                        <div id="code_method">GET</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>URL</p>
                        <div>http://localhost:3000/api/data/getprices</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Headers</p>
                        <div>partner_id</div>
                    </div>
                    <div className="method me-5 mb-3">
                        <p>Data</p>
                        <div>Null</div>
                    </div>
                </div>
            </div>

            <div className="sample">
                <p className="mt-2 mb-2">Code mẫu : Nodejs + Axios</p>
                <pre className="code_sample bgr_black">
                    <code>
                        {`import axios from "axios"
const GetPrice = async () => {
    await axios({
    method: "GET",
    url: "http://localhost:3000/api/data/getprices",
    headers: {
        partner_id: "askhthjljhyhy-1545656-221"
    }
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err)
})
};
GetPrice();`}
                    </code>
                </pre>
            </div>
        </div>
    )
}
