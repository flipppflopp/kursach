import React, { Component } from 'react';
import './auth.css';
import { Link, NavLink } from "react-router-dom";
import { API_URL } from '../../variables'

export class Register extends Component {
    static displayName = Register.name;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitPassword: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmitPassword(event) {
        this.setState({ submitPassword: event.target.value });
    }



    handleSubmit(event) {

        if (this.state.password !== this.state.submitPassword) {
            alert("Incorrect password")
            this.setState(
                {
                    password: '',
                    submitPassword: ''
                }
            )
        }
        else
        {
            fetch('api/users/add', {
                method: 'post',
                body: JSON.stringify({
                        Name: this.state.username,
                        Password: this.state.password
                    }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((response) => {
                return response;
            }).then((data) => {
                if (data.ok !== true) {
                    alert("This user is already exist")
                    this.setState(
                        {
                            username: '',
                            password: '',
                            submitPassword: ''
                        }
                    )

                    return;
                }
                else
                {
                    let user = 
                        {
                            username: this.state.username,
                            password: this.state.password
                        }
                    this.props.history.push("/home", { user: user });
                }
            });
        }
        event.preventDefault();
    }



    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <h3>Register Form</h3>


                        <label htmlFor="uname"><b>Username</b></label>
                        <input value={this.state.username} onChange={this.handleUsername}
                            type="text" placeholder="Enter Username" name="uname" required />


                        <label htmlFor="psw"><b>Password</b></label>
                        <input value={this.state.password} onChange={this.handlePassword}
                            type="password" placeholder="Enter Password" name="psw" required />


                        <label htmlFor="psw"><b>Confirm password</b></label>
                        <input value={this.state.submitPassword} onChange={this.handleSubmitPassword}
                            type="password" placeholder="Enter Password" name="psw" required />


                        <button type="submit">Create account</button>
                        <NavLink tag={Link} className="text-dark" to="/">Already have account?</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}
