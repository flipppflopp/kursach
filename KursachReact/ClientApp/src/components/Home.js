import React, { Component } from 'react';
import { Layout } from './Layout';
import API_URL from '../variables'
import './Home.css';
import {Link, NavLink} from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            chatsList: [],
            userId: null
        };
    }
  
    componentDidMount() {
        fetch('/api/chats/getByUsername/' + this.props.location.state.user.username)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ chatsList: data })
            });

        fetch('/api/users/getUserId/' + this.props.location.state.user.username)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ userId: data })
            });
    }

    
    renderChatsList()
    {
        if(this.state.chatsList !== null)
        {
            return this.state.chatsList.map((el) => 
            {
                return (
                    <tr>
                        <td><p>{el.name}</p></td>
                        <td>
                            <NavLink tag={Link} className="btn btn-secondary"
                                     to={{
                                         pathname: "/chat",
                                         state: {
                                             chat: el,
                                             user: this.props.location.state.user
                                         }
                                     }}>
                            Write message
                            </NavLink>
                        </td>
                    </tr>)
        })
        }
        
    }
  
    
    createChatOnClick(e)
    {
        e.preventDefault();
        let newChatName = prompt("Enter new chat name:");
        fetch('api/chats/add', {
            method: 'post',
            body: JSON.stringify({
                name: newChatName,
                OwnerId: this.state.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return response;
        }).then((data) => {
        });
    }
    
  render () {
    return (
        <Layout user={this.props.location.state.user}>
            <button onClick={(e) =>{
                this.createChatOnClick(e);
                window.location.reload(false);
            }
            }  className="btn btn-secondary">Create chat</button>
            <table>
                <tr>
                    <th>Chats</th>
                    <th></th>
                </tr>
                {this.renderChatsList()}
            </table>
        </Layout>
    );
  }
}
