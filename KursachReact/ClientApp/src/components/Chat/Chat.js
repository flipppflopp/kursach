import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'jquery'
import 'bootstrap'
import styles from './PrevReplies.module.css'
import { Button, Card, Form } from 'react-bootstrap'
import {Layout} from "../Layout";

export class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentReply: null,
            id: this.props.location.state.chat.id,
            replies: [],
            result: null,
            textField: ""
        }
    }

    componentDidMount()
    {
        this.setState({ currentReply: "" })

        this.getActualReplies()
    }

    getActualReplies()
    {
        
        fetch('api/reply/get/' + this.props.location.state.chat.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ replies: data })
                this.setState({ result: this.PrintPrevReplies() })
            });
    }


    PrintPrevReplies = () => {
        return this.state.replies.map((el) => {
            
            return (
                <div className={styles.PrevReply}>
                    <div className={styles.ReplyTop}>
                        <div><h4>{el.senderName}</h4></div>
                    </div>
                    {el.replyTitle}
                </div>
            )
        })
    }

    addReply(currentReply, id) {
        
        if (this.state.textField != "") {
            fetch("api/reply/add", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    ReplyTitle: currentReply,
                    CommentId: id,
                    SenderName: this.props.location.state.user?.username,
                    chatId: this.props.location.state.chat.id
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                response.json()
            })
                .then(() => {
                    this.getActualReplies()
                });
        }
    }

    AddMemberOnClick(e)
    {
        e.preventDefault();
        let newMemberId = prompt("Enter new member id:");

        fetch('api/chats/addMember/' + newMemberId + '_' + this.props.location.state.chat.id)
            .then(response => response.json())
            .then(data => {
            });
    }
    
    
    
    render() {
      //
      return (
          <Layout user={this.props.location.state.user}>
          <div>

          <button onClick={(e) =>{
              this.AddMemberOnClick(e);
              window.location.reload(false);
          }
          }  className="btn btn-secondary">Add member</button>
          
          {this.state.result}


          <Card>
                      <Form.Control
                              onChange={e =>
                              {
                                  this.setState({
                                      currentReply: e.target.value,
                                      textField: e.target.value })
                              }}
                          placeholder="Leave your reply here"
                              as="textarea" 
                              value={this.state.textField} />
                  
                      <Button onClick={(e) => {
                          e.preventDefault()
                          this.addReply(this.state.currentReply, this.props.location.state.chat.id)
                          this.setState({ textField: "" })
                      }}>
                          Leave reply
                      </Button>
            </Card>
        </div>
          </Layout>
    )
  }
}
