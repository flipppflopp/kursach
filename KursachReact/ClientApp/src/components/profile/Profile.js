import React, { Component } from 'react';
import {Layout} from "../Layout";
import API_URL from '../../variables'
import './Profile.css';
import {Link, NavLink} from "react-router-dom";

export class Profile extends Component {
    static displayName = Profile.name;
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.location.state.user.username,
            password: this.props.location.state.user.password,
            newPassword: '',
            isAdmin: null
        }

        this.handlePassword = this.handlePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        fetch(API_URL + 'api/users/getPassword/' + this.props.location.state.user.username)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ password: data })
            });
        

        fetch(API_URL + 'api/admins/status/' + this.props.location.state.user.username)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ isAdmin: data })
            });
    }
    

    handlePassword(event) {
        this.setState({ newPassword: event.target.value });
    }

    handleSubmit(event) 
    {
        this.setState({ password: this.state.newPassword });
        fetch('api/users/editProfile', {
            method: 'post',
            body: JSON.stringify({
                name: this.props.location.state.user.username,
                password: this.state.newPassword
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return response;
        }).then((data) => {
        });
        event.preventDefault();
    }
    
    
    
    render () {
        return (
            <Layout user={this.props.location.state.user}>
                <div>
                    <h1>Your profile:</h1>
                    <p>Username: {this.state.username}</p>
                    <p>Password: {this.state.password}</p>

                    
                    <NavLink tag={Link} className="btn btn-secondary"
                             to={{
                                 pathname: "/"
                             }}>
                        Log out
                    </NavLink>
                    
                    <form className="changeProfileForm" onSubmit={this.handleSubmit}>
                        <label><b>Password</b></label>
                        <input  value={this.state.newPassword} onChange={this.handlePassword}
                            type="password" placeholder="Enter new Password" name="psw" required/>

                        <button type="submit">Change password</button>
                    </form>

                </div>
            </Layout>
        );
    }
}
