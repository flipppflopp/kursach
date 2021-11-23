import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'jquery'
import 'bootstrap'
import ReplyItem from './ReplyItem'
import styles from './PrevReplies.module.css'
import { variables } from '../../../../variables'

export default class PrevReplies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			replies: [],
			result: null
		}
	}

	componentDidMount()
	{
		fetch('reply/get/' + this.props.id)
			.then(response => response.json())
			.then(data => {
				this.setState({ replies: data })
				this.setState({ result: this.PrintPrevReplies() })
			});
	}

	PrintPrevReplies = () =>
	{
		return this.state.replies.map((el) =>
		{
			return (
				<div className={styles.PrevReply}>
					{el.replyTitle}
				</div>
				)
		})
	}

	render() {
      return (
		  <div>
			  {this.state.result}
          </div>
    )
  }
}
