import React, { Component, PropTypes } from 'react/addons';
import Comment from './Comment';
import classNames from 'classnames';
import moment from 'moment';

export default class Message extends Component{
  constructor(props) {
    super(props);
  }

  onMessageClicked(_id) {
    this.props.onMessageClicked(_id);
  }

  onMessageHovered(_id) {
    this.props.onMessageHovered(_id);
  }

  onMessageUnHovered(_id) {
    this.props.onMessageUnHovered(_id);
  }

  onLeaveComment(e, _id) {
    e.preventDefault();
    console.log(_id);
    // this.props.onLeaveComment(_id, content);
  }

  render() {
    const { message } = this.props;
    const messageClick = this.onMessageClicked.bind(this, message._id);
    const messageHover = this.onMessageHovered.bind(this, message._id);
    const messageUnHover = this.onMessageUnHovered.bind(this, message._id);
    const leaveComment = this.onLeaveComment.bind(this, message._id);
    let commentBox;

    if (message.clicked) {
      const comments = message.comments.map((comment) => {
        return (
          <Comment key={comment._id} comment={comment} />
        );
      });

      commentBox = (
        <div className="comments">
          {comments}
        </div>
      );
    } else {
      const comments = null;
    }

    return (
      <div>
        <div className="message" onMouseEnter={messageHover} onMouseLeave={messageUnHover} style={message.hovered ? {
          backgroundColor: '#eeeeee'} : {}}>
          <h3>{message.title}</h3>
          <hr />
          <p>{message.content}</p>
          <div>
            <button className="btn btn-sm btn-success-outline hack-btn" disabled>
              <span className="fa fa-chevron-up"></span>{message.push.good}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-danger-outline hack-btn" disabled>
              <span className="fa fa-chevron-down"></span>{message.push.bad}
            </button>
            &nbsp;
            <button className={classNames('btn', 'btn-sm', 'btn-primary-outline', 'hack-btn',{'active': message.clicked})} onClick={messageClick} disabled>
              {message.clicked ? 'Hide' : 'Show'} Comments
            </button>
            &nbsp;·&nbsp;
            <span>{moment(message.created_time, 'X').toNow()}</span>
          </div>
          <div className="comment">
            <form className="form" onSubmit={leaveComment}>
              <input type="text" className="form-control form-control-sm" ref="content" placeholder="leave a comment for this message..." disabled/>
            </form>
          </div>
        </div>
        {commentBox}
      </div>
    );
  }
}
