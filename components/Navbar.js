import React, { Component, PropTypes } from 'react/addons';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="/">HACK59</a>
        <form className="form-inline navbar-form pull-right">
          <input className="form-control form-control-sm" type="text" placeholder="Search" />
          <span className="form-group">
            <select className="form-control" id="exampleSelect1">
              <option>Top</option>
              <option>Date DESC</option>
              <option>Date ASC</option>
            </select>
          </span>
          <button className="btn btn-success-outline btn-sm" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}