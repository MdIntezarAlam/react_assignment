import React, { useState, useEffect } from 'react'
import '../Forms/newform.css'
const NewForm = () => {

    const initialValues = { username: "", email: "", password: "", };    //initial value for every input fields
    const [formValue, setFormValues] = useState(initialValues);//passing initial values in this state
    const [formerror, setErrors] = useState({})  //form valid errors
    const [isSubmit, setisSubmit] = useState(false);


    const handleChange = (e) => { //input change function
        const { name, value } = e.target    //we need name and value of the input fields
        setFormValues({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {  //form Submitting function
        e.preventDefault();
        setErrors(ValidateFun(formValue)) //validation 
        setisSubmit(true)
    }


    useEffect(() => {
        if (Object.keys(formerror).length == 0 && isSubmit) {
        }
    }, [formerror])
    //Validation Function for inputs fields
    const ValidateFun = (value) => { //it will take all values which i have submitted (values)
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.username) {
            errors.username = "username is required"
        }
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
        console.log(errors);
    }


    return (
        <div className='newform'>
            {Object.keys(formerror).length == 0 && isSubmit ? (
                <h1 className='heading'>Login Successfully</h1>
            ) : (<pre className='pres'>{JSON.stringify(formValue, undefined, 2)}</pre>)
            }

            <form onSubmit={handleSubmit}>
                <div className="newforms">
                    <h1 className='heading'>Login Form</h1>
                    <div className="username">
                        <label>Username</label>
                        <input type="text"
                            name='username'
                            autoComplete='off'
                            placeholder='enter username'
                            className='username_inputs'
                            value={formValue.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="errors">{formerror.username}</p>
                    <div className="username">
                        <label>Email</label>
                        <input type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='enter email'
                            className='username_inputs'
                            value={formValue.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="errors">{formerror.email}</p>

                    <div className="username">
                        <label>Password</label>
                        <input type="password"
                            name='password'
                            placeholder='enter password'
                            className='username_inputs'
                            value={formValue.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="errors">{formerror.password}</p>

                    <div className="username">
                        <button type='submit' value='submit' className='btn'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewForm