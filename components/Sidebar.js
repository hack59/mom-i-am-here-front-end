import React, { Component, PropTypes } from 'react/addons';
import Message from './Message';
import Navbar from './Navbar';
import CreateBox from './CreateBox';

export default class Sidebar extends Component {
  render() {
    const styles = {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '35%',
      height: '100%',
      boxShadow: '-4px 0px 12px 0px rgba(0,0,0,0.24)',
    }

    const messages = this.props.markers.map((message) => {
      return (
        <Message
          key={message._id}
          message={message}
          onMessageClicked={this.props.onMessageClicked}
          onMessageHovered={this.props.onMessageHovered}
          onMessageUnHovered={this.props.onMessageUnHovered}
        />
      );
    });

    return (
      <div style={styles}>
        <div style={{overflow: 'auto', height: '100%'}}>
          <Navbar />
          <CreateBox />
          {messages}
        </div>
      </div>
    );
  }
}
