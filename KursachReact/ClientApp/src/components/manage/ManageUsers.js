import React, { Component } from 'react';
import {Layout} from "../Layout";
import {Link, NavLink} from "react-router-dom";

export class ManageUsers extends Component {
    static displayName = ManageUsers.name;
    constructor(props) {
        super(props);
        this.state = {
            usersList: null
        }
    };
    
    
    componentDidMount() {
        fetch('api/users')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ usersList: data })
            });
    }


    handleDeleteButton(event, id)
    {
        fetch('api/users/remove/' + id)
            .then((response) => {
                return response.json();
            })
            .then((data) =>
                {
                    
                }
            )
        this.setState({});
    }



    renderUserList()
    {
        if(this.state.usersList !== null)
        {
            return this.state.usersList.map((el) =>
            {
                if(this.props.location.state.user.username !== el.name){
                return (
                    <tr>
                        <td><p>{el.id}</p></td>
                        <td><p>{el.name}</p></td>
                        <td>
                            <button className="btn btn-danger" onClick={
                            (e) => {
                                this.handleDeleteButton(e, el.id);
                                window.location.reload(false);
                            }
                            }>
                                Delete user
                            </button>
                        </td>
                    </tr>)
                }
                else
                {
                    return(<div></div>)
                }
            })
        }

    }


    render () {
        return (
            <Layout user={this.props.location.state.user}>
                <div>
                    <h1>Manage users:</h1>
                    
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>User name</th>
                            <th></th>
                        </tr>
                        {this.renderUserList()}
                    </table>
                </div>
            </Layout>
        );
    }
}
