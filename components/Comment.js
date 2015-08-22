import React, { Component, PropTypes } from 'react/addons';

export default class Comment extends Component {
  render() {
    const styles = {
      marginTop: '5px',
    };
    const { comment } = this.props;

    return (
      <div style={styles}>
        <div>{comment.content}</div>
        <button className="btn btn-sm btn-success hack-btn">
          <span className="fa fa-chevron-up"></span>{comment.good}
        </button>
        <button className="btn btn-sm btn-danger hack-btn">
          <span className="fa fa-chevron-down"></span>{comment.bad}
        </button>
        <span>{comment.time}</span>
      </div>
    );
  }
}
