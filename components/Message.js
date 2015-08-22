import React, { Component, PropTypes } from 'react/addons';
import Comment from './Comment';

export default class Message extends Component{
  constructor(props) {
    super(props);
  }

  onMessageClicked(uid) {
    this.props.onMessageClicked(uid);
  }

  render() {
    const { uid, message } = this.props;
    const messageClick = this.onMessageClicked.bind(this, uid);
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
        <div className="message">
          <h3>{message.title}</h3>
          <hr />
          <p>{message.content}</p>
          <div>
            <button className="btn btn-sm btn-success hack-btn"><span className="fa fa-chevron-up"></span>{message.good}</button>
            <button className="btn btn-sm btn-danger hack-btn"><span className="fa fa-chevron-down"></span>{message.bad}</button>
            <button  className="btn btn-sm btn-primary hack-btn" onClick={messageClick}>
              {message.clicked ? 'Hide' : 'Show'} Comments
            </button>
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
