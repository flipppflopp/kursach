import React, { Component } from 'react';
import './auth.css';
import {Link, NavLink} from "react-router-dom";
import API_URL from '../../variables'

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {

        fetch('api/users/validate/' + this.state.username + "_" + this.state.password)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data !== true) {
                    alert("Wrong password or username")
                    this.setState(
                        {
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
        
        
        event.preventDefault();
    }
    
    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <h3>Login Form</h3>
                        <label  htmlFor="uname"><b>Username</b></label>
                        <input  value={this.state.username} onChange={this.handleUsername}
                            type="text" placeholder="Enter Username" name="uname" required/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input  value={this.state.password} onChange={this.handlePassword}
                            type="password" placeholder="Enter Password" name="psw" required/>
                        <button type="submit">Login</button>
                        <NavLink tag={Link} className="text-dark" to="/register">Create account</NavLink>
                    </div>
                </form>
            </div>    
        );
    }
}
