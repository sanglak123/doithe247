import { AuthApi } from 'data/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//Action
import { LoginSuccess } from "@/redux/slice/user"


function UserLogin(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [register, setRegister] = useState(false);
    //Data
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
 
    const handleLogin = async () => {
        await AuthApi.Login(userName, pass, dispatch, LoginSuccess, router);
    };

    const handleRegister = async () => {
        if (userName !== "" && pass !== "") {
            await AuthApi.Register(userName, pass, phone, email)
            setRegister(false);
        }
    };

    return (
        <div id='UserLogin'>
            <div className='login_content'>

                <div className='login_item bgr_white'>

                    <div className='login_icon'>
                        <i className="fa fa-user"></i>
                    </div>

                    {/* UserName */}
                    <div className='item'>
                        <div className='item_detail'>
                            {
                                userName === "" ?
                                    <i className="fa fa-user-lock"></i>
                                    :
                                    <i className="fa fa-user-check"></i>
                            }

                            <input
                                type={"text"}
                                className='input_login'
                                placeholder='User name'
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Password */}
                    <div className='item'>
                        <div className='item_detail'>
                            {
                                pass === "" ?
                                    <i className="fa fa-lock"></i>
                                    :
                                    <i className="fa fa-unlock"></i>
                            }

                            <input
                                type={"password"}
                                className='input_login'
                                placeholder='Password'
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>

                    </div>

                    {
                        register &&
                        <>
                            <div className='item'>
                                <div className='item_detail'>
                                    <i className="fa fa-envelope"></i>
                                    <input
                                        type={"text"}
                                        className='input_login'
                                        placeholder='Your Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className='item'>
                                <div className='item_detail'>
                                    <i className="fa fa-phone"></i>
                                    <input
                                        type={"text"}
                                        className='input_login'
                                        placeholder='You phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                            </div>
                        </>

                    }
                    <div className='item fogot_pass mt-3 d-flex justify-content-between align-items-center'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                        <div className='fogot_pass_item'>
                            <Link href={"/users/fogot"}>Fogot password</Link>
                        </div>

                    </div>

                    <div className='item btn_login'>
                        {
                            register ?
                                <button disabled={userName === "" || pass === ""} onClick={handleRegister} className='w-100'>REGISTER</button>
                                :
                                <button disabled={userName === "" || pass === ""} onClick={handleLogin} className='w-100'>SIGN IN</button>
                        }

                    </div>

                    <div className='item btn_register'>
                        {
                            !register ?
                                <button onClick={() => setRegister(true)}>Create your account <i className="fa fa-long-arrow-alt-right"></i></button>
                                :
                                <button onClick={() => setRegister(false)}><i className="fa fa-long-arrow-alt-left me-3"></i>Back</button>
                        }

                    </div>

                </div>
            </div>
            <a className='btn_back' href={"/"}>Back to home</a>

        </div>
    );
}

export default UserLogin;