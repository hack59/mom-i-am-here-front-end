import React, { Component, PropTypes } from 'react/addons';
import Comment from './Comment';

export default class Message extends Component{
  constructor(props) {
    super(props);
  }

  onMessageClicked(uid) {
    this.props.onMessageClicked(uid);
  }

  onMessageHovered(uid) {
    this.props.onMessageHovered(uid);
  }

  onMessageUnHovered(uid) {
    this.props.onMessageUnHovered(uid);
  }

  render() {
    const { uid, message } = this.props;
    const messageClick = this.onMessageClicked.bind(this, uid);
    const messageHover = this.onMessageHovered.bind(this, uid);
    const messageUnHover = this.onMessageUnHovered.bind(this, uid);
    let commentBox;

    if (message.clicked) {
      const comments = message.comments.map((comment) => {
        return <Comment key={comment.uid} comment={comment} />;
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
            <button className="btn btn-sm btn-success-outline hack-btn">
              <span className="fa fa-chevron-up"></span>{message.good}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-danger-outline hack-btn">
              <span className="fa fa-chevron-down"></span>{message.bad}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-primary hack-btn" onClick={messageClick}>
              {message.clicked ? 'Hide' : 'Show'} Comments
            </button>
            &nbsp;·&nbsp;
            <span>{message.time}</span>
          </div>
          <div className="comment">
            <form className="form">
              <input type="email" className="form-control form-control-sm" placeholder="leave a comment for this message..." />
            </form>
          </div>
        </div>
        {commentBox}
      </div>
    );
  }
}
