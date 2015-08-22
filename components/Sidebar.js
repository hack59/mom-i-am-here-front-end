import React, { Component, PropTypes } from 'react/addons';
import Message from './Message';
import Navbar from './Navbar';

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

    const messages = this.props.marker.map((message) => {
      const { uid, properties } = message;
      return <Message key={uid} uid={uid} message={properties} onMessageClicked={this.props.onMessageClicked}/>
    });

    return (
      <div style={styles}>
        <div style={{overflow: 'auto', height: '100%'}}>
          <Navbar />
          {messages}
        </div>
      </div>
    );
  }
}
