import React, { Component } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import { deleteComment } from '../../../store/goods/goodsDescription/goodsDescriptionAsyncActions'
import { NavLink } from 'react-router-dom';

export default class ReplyItem extends Component {

    render() {
        return (
            <div>
                <Card className='mt-1 bg-dark' >
                    <ListGroup variant="flush">
                        <ListGroup.Item>test</ListGroup.Item>
                    </ListGroup>
                </Card >
            </div>
    )
  }
}