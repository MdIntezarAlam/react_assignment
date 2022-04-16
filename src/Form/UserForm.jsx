import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd';
import '../Form/userform.css'


const UserForm = () => {

    const initialValues = { email: "", password: "", };
    const [formValue, setFormValues] = useState(initialValues);
    const [formerror, setErrors] = useState({})
    const [isSubmit, setisSubmit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(ValidateFun(formValue))
        setisSubmit(true)
    }


    useEffect(() => {
        fetch("https://reqres.in/api/login")
            .then((res)=>{
                res.JSON().then((formValue)=>{
                    setFormValues(formValue)
                    console.log(formValue);
                })
            })


        if (Object.keys(formerror).length == 0 && isSubmit) {
        }
    }, [formerror])
    const ValidateFun = (value) => {
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.email) {
            errors.email = "email is required"
        }
        else if (!regex.test(value.email)) {
            errors.email = "this is not a valid email format"
        }
        if (!value.password) {
            errors.password = "password is required"
        }
        else if (value.password.length < 6) {
            errors.password = "password should atleast six digits"
        }
        else if (value.password.length > 8) {
            errors.password = "password should not more than eight digits"
        }
        return errors
    }

    const Clicked = () => {
        fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                'email': '',
                'password': '',
            },
            body: JSON.stringify(formValue)
        }).then((result) => {
            result.json().then((formValue) => {
                setFormValues(formValue)
            })
        })

    }

    return (
        <div className='userform_container'>
            {Object.keys(formerror).length == 0 && isSubmit ? (
                <h1 className='heading'>Login Successfully</h1>
            ) : ''
            }
            <div className="userform_container_box">
                <form onSubmit={handleSubmit}>
                    <div className="userform_container_box_input_container">
                        <h1 className='box_heading'>Welcome Back</h1>
                        <p className='box_subtitle'>sub title goes here</p>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Email Address'
                            className='username_inputs'
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        <p className="errors">{formerror.email}</p>

                        <input
                            type="password"
                            name='password'
                            autoComplete='off'
                            placeholder=' password'
                            className='username_inputs'
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        <p className="errors">{formerror.password}</p>
                        <button type='submit' value='submit' className='login_btn' onClick={Clicked}>Login</button>
                        <div className="remember_forget_password">
                            <div> <Checkbox>Remember Password</Checkbox></div>
                            <div>Forget Password</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm