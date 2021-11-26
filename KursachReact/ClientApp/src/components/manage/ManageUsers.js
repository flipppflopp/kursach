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
        if(this.props.location.state.user.id)
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



    renderRoutesList()
    {
        if(this.state.usersList !== null)
        {
            return this.state.usersList.map((el) =>
            {
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
                            <th>Chat name</th>
                            <th></th>
                        </tr>
                        {this.renderRoutesList()}
                    </table>
                </div>
            </Layout>
        );
    }
}
