import InputField from "../../GlobalComponents/InputField";
import CustomButton from '../../GlobalComponents/CustomButton';

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardBack = () => {
    const history = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/signup", {
                name, email, password
            }).then(res => {
                if (res.data === "exist") {
                    alert("User already exists")
                }
                else if (res.data === "notexist") {
                    history("/Calendar", { state: { id: email } })
                }
            })
                .catch(e => {
                    alert("Wrong Details")
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const onChangeN = (value) => {
        setName(value);
    }

    const onChangeE = (value) => {
        setEmail(value);
    }

    const onChangeP = (value) => {
        setPassword(value);
    }

    return (
        <div class="card-back">
            <div class="center-wrap">
                <div class="section text-center">
                    <h4 class="mb-4 pb-3">Sign Up</h4>
                    <form action="/signup" method="POST">
                        <div class="form-group">
                            <InputField
                                name={"fname"}
                                type={"text"}
                                classes={"form-style"}
                                placeholder={"Your Full Name"}
                                icon={"fa fa-user"}
                                value={name}
                                onChange={onChangeN} />
                        </div>
                        <div class="form-group mt-2">
                            <InputField
                                name={"email"}
                                type={"email"}
                                classes={"form-style"}
                                placeholder={"Your Email"}
                                icon={"fa fa-envelope"}
                                value={email}
                                onChange={onChangeE} />
                        </div>
                        <div class="form-group mt-2">
                            <InputField
                                name={"pass"}
                                type={"password"}
                                classes={"form-style"}
                                placeholder={"Your password"}
                                icon={"fa fa-lock"}
                                value={password}
                                onChange={onChangeP} />

                        </div>
                        <CustomButton title={"Submit⇝"} classes={"flexCenter"} custom={"btn button mt-4"} onClick={submit} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CardBack