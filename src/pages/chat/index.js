import { handleEvents, SockeContext, SocketContext, useSocket } from '@/config/socketInit';
import { UserSelector } from '@/redux/selector/UserSelector';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import { rootApi } from 'data/api/configApi';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Message = [];
function ChatBox(props) {
    const dispatch = useDispatch();
    const User = useSelector(UserSelector.Auth.User);
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const axiosJwt = CreateAxiosInstance(dispatch, accessToken);


    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState("");

    //Socket    
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (accessToken) {
            handleEvents(socket, User, dispatch, accessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }
    }, [accessToken, socket, User]);


    return (
        <div id='chat_box'>
            <div className='bgr_dark'>
                <div className='hearder_hag'>
                    <h1>Chat Với Admin</h1>
                </div>
                <div className='chatBox_content'>
                    <div className='mess_render'>
                        {
                            chat?.map((item, index) => {
                                return (
                                    <p key={index}>{`${item.user}: ${item.mess}`}</p>
                                )
                            })
                        }
                    </div>
                    <div className='send_mess'>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Type a message..."
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                            {/* <Button onClick={sendMessage}>Send</Button> */}
                        </InputGroup>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ChatBox;