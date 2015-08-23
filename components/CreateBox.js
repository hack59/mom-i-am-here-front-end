import React, { Component, PropTypes } from 'react';

export default class CreateBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      target: false
    };

  }

  targetForm() {
    const target = ! this.state.target;

    this.setState({
      target
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const title = React.findDOMNode(this.refs.title).value.trim();
    const content = React.findDOMNode(this.refs.content).value.trim();

    if (! title || ! content ) {
      return
    }

    this.props.createMarker(title, content);

    return;
  }

  render() {
    if (this.state.target) {
      return (
        <form className="createbox" onSubmit={::this.onSubmit}>
          <p><b>Leave a Message...</b></p>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 form-control-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-sm" id="title" ref="title" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="content" className="col-sm-2 form-control-label">Content</label>
            <div className="col-sm-10">
              <textarea className="form-control form-control-sm" id="content" ref="content" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-offset-7 col-sm-2">
              <button type="submit" className="btn btn-primary btn-sm">Send</button>
            </div>
            <div className="col-sm-2">
              <button type="reset" onClick={::this.targetForm} className="btn btn-danger btn-sm">Cancel</button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <button onClick={::this.targetForm} className="btn btn-primary btn-block btn-sm">Create a New Message</button>
      );
    }
  }
}
