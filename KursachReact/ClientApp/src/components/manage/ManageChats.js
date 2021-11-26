import React, { Component } from 'react';
import {Layout} from "../Layout";
import {Link, NavLink} from "react-router-dom";

export class ManageChats extends Component {
    static displayName = ManageChats.name;
    constructor(props) {
        super(props);
        this.state = {
            usersList: null
        }
    };
    
    
    componentDidMount() {
        fetch('api/routes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ usersList: data })
            });
    }


    handleDeleteButton(event, id)
    {
        fetch('api/routes/remove/' + id)
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
                        <td><p>{el}</p></td>
                        <td>
                            <button className="btn btn-danger" onClick={
                            (e) => {
                                this.handleDeleteButton(e, el.id);
                                window.location.reload(false);
                            }
                            }>
                                Delete route
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
                    <h1>Manage chats:</h1>
                    
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
