import axios from 'axios';
import React, { Component } from 'react';
import './signup.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fisrtName: "",
            lastName: "",
            password: "",
            month: "",
            day: "",
            year: "",
            email: "",
            mobileNumber: "",
            formErrors: {},
            isFormSubmitted: false,
            months: [
                { id: 1, name: "January" },
                { id: 2, name: "Febrary" },
                { id: 3, name: "March" },
                { id: 4, name: "April" },
                { id: 5, name: "May" },
                { id: 6, name: "June" },
                { id: 7, name: "July" },
                { id: 8, name: "August" },
                { id: 9, name: "September" },
                { id: 10, name: "October" },
                { id: 11, name: "November" },
                { id: 12, name: "December" },
            ]
        }
        this.initialState = this.state;
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        setTimeout(() => {
            if (this.state.isFormSubmitted === true) {
                this.handleValidation();
            }
        }, 1000)

    }

    handleValidation = () => {
        const { fisrtName, lastName, email, password, mobileNumber, month, day, year } = this.state;
        let formErrors = {};
        let isFormValid = true;

        // for firstName
        if (!fisrtName) {
            isFormValid = false;
            formErrors["firstNameError"] = "First Name is Required"
        }

        // for lastName
        if (!lastName) {
            isFormValid = false;
            formErrors["lastNameError"] = "Last Name is Required"
        }

        // for Email validation
        if (!email) {
            isFormValid = false;
            formErrors["emailError"] = "Email is Required"
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            isFormValid = false;
            formErrors["emailError"] = "Invalid Email Id"
        }

        // for Password validation
        if (!password) {
            isFormValid = false;
            formErrors["passwordError"] = "password is required"
        }

        // for Mobile Number validation
        if (!mobileNumber) {
            isFormValid = false;
            formErrors["mobileNumberError"] = "Mobile number is required"
        } else if (mobileNumber && (mobileNumber.length !== 10)) {
            console.log(mobileNumber, mobileNumber.length, this.state)
            isFormValid = false;
            formErrors["mobileNumberError"] = "mobile Number should be in 10 digit."
        }

        // Dob validation
        if (!month) {
            isFormValid = false;
            formErrors["monthError"] = "Select month"
        }

        if (!day) {
            isFormValid = false;
            formErrors["dayError"] = "Day is required"
        } else if (!(day > 0 && day < 31)) {
            isFormValid = false;
            formErrors["dayError"] = "Invalid Day"
        }

        if (!year) {
            isFormValid = false;
            formErrors["yearError"] = "Year is required"
        } else if (!(year > 1950 && year < 2022)) {
            isFormValid = false;
            formErrors["yearError"] = "Invalid Year"
        }

        this.setState({
            formErrors: formErrors
        })
        return isFormValid;
    }

    handleSubmit = (e) => {
        const { fisrtName, lastName, email, password, month, day, year, mobileNumber } = this.state;
        this.setState({
            isFormSubmitted: true
        })
        e.preventDefault();
        if (this.handleValidation()) {
            let dob = `${month}/${day}/${year}`;
            console.log(dob);
            axios.get('http://atologistinfotech.com/api/register.php', {
                params: {
                    firstname: fisrtName,
                    lastname: lastName,
                    email: email,
                    encryptpassword: password,
                    mobile: mobileNumber,
                    dob: dob

                }
            }
            ).then(data => {

                toast.success(data.data.data)
            }).catch(error => {
                toast.error(error)
            })
            this.setState(this.initialState)
        }
    }

    render() {
        const {
            firstNameError,
            lastNameError,
            emailError,
            passwordError,
            mobileNumberError,
            monthError,
            dayError,
            yearError,

        } = this.state.formErrors
        return (
            <div className="sigup-full-container">
                <div className="signup-container">
                    <div className="signup center">
                        <div className="signup-subcontainer">
                            <h1 className="header-text">Sign Up</h1>
                            <p>create your profile</p>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <div className="fullName">
                                        <div className='firstName'>
                                            <input
                                                type="text"
                                                placeholder="First name"
                                                name="fisrtName"
                                                value={this.state.fisrtName}
                                                onChange={this.handleChange}
                                            />
                                            {firstNameError &&
                                                <div className="error-msg">{firstNameError}</div>}
                                        </div>
                                        <div className="lastName">
                                            <input
                                                type="text"
                                                placeholder="Last name"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                            />
                                            {lastNameError &&
                                                <div className="error-msg">{lastNameError}</div>}
                                        </div>

                                    </div>
                                    <div className="user-email">
                                        <input
                                            type="email"
                                            className="eamil"
                                            placeholder="Email address"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                        {emailError &&
                                            <div className="error-msg">{emailError}</div>}
                                    </div>
                                    <div className="password">
                                        <input
                                            type="password"
                                            className="eamil"
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                        {passwordError &&
                                            <div className="error-msg">{passwordError}</div>}
                                    </div>
                                    <div className="mobile-number">

                                        <div>+91</div>&nbsp;
                                        <input
                                            type="number"
                                            className="eamil"
                                            placeholder="Mobile number"
                                            name="mobileNumber"
                                            value={this.state.mobileNumber}
                                            onChange={this.handleChange}
                                        />

                                    </div>
                                    {mobileNumberError &&
                                        <div className="error-msg">{mobileNumberError}</div>}

                                    <div className="dob">
                                        <div className="month">
                                            <select name="month" id="" className="select-month" onChange={this.handleChange}>
                                                <option disabled selected >Birth month</option>
                                                {this.state.months.map(month => {
                                                    return (
                                                        <option className="month-options" value={month.id}>{month.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {monthError &&
                                                <div className="error-msg">{monthError}</div>}
                                        </div>
                                        <div className="day">
                                            <div>
                                                <input
                                                    type="number"
                                                    placeholder="Day"
                                                    name="day"
                                                    value={this.state.day}
                                                    onChange={this.handleChange}
                                                />
                                                {dayError &&
                                                    <div className="error-msg">{dayError}</div>}
                                            </div>
                                            <div >
                                                <input
                                                    type="number"
                                                    placeholder="Year"
                                                    name="year"
                                                    value={this.state.year}
                                                    onChange={this.handleChange}
                                                />
                                                {yearError &&
                                                    <div className="error-msg">{yearError}</div>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="term-section">
                                        <p className="term-and-condition">By clicking "Continue", you agree to the <a href="/" className="link">Terms</a> and <a href="/" className="link">Privacy Policy</a> </p>
                                    </div>
                                    <div >
                                        <button className="btn">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Signup;
