import React, { Component } from 'react';
import $ from 'jquery';
import MainMap from '../components/MainMap';
import Sidebar from '../components/Sidebar';
import fetch from '../utils/fetch';

const geolocation = (
  'undefined' !== typeof window && navigator && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

export default class Root extends Component {
  constructor(props) {
    super(props);
    // geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;

      // this.setState({
      //   position: [
      //     latitude, longitude
      //   ]
      // });
    // });

    const center = [25.021593, 121.535122];
    const zoom = 17;
    const bounds = [
      25.02394568165151,
      121.53011163356018,
      25.019240273255264,
      121.54013236643982,
    ];

    this.state = {
      center,
      zoom,
      bounds,
      markers: [],
      logined: this.checkLogin(),
    };
  }

  checkLogin() {
    if (localStorage.token == undefined) {
      $.post('http://www.itshowtime.idv.tw/hack59/users/created/')
      .then((data) => {
        localStorage.setItem('token', data.token);
      });
    }

    return true;
  }

  calcBounds(bounds = this.state.bounds) {
    // 0: 25.02394568165151
    // 1: 121.53011163356018
    // 2: 25.019240273255264
    // 3: 121.54013236643982
    const w = [bounds[1], bounds[0]];
    const x = [bounds[3], bounds[0]];
    const y = [bounds[3], bounds[2]];
    const z = [bounds[1], bounds[2]];

    return [w, x, y, z, w];
  }

  getMarkers(bounds) {
    const loc = this.calcBounds(bounds);

    return fetch('http://www.itshowtime.idv.tw/hack59/rooms/search/',{ loc: [loc] });
  }

  getComments(_id) {
    return fetch('http://www.itshowtime.idv.tw/hack59/rooms/search/comment/', {
      _id
    });
  }

  createMarker(title, content) {
    const [lat, lng] = this.state.center;

    fetch('http://www.itshowtime.idv.tw/hack59/rooms/created/', {
      title, content, loc: {
        lng,
        lat
      }
    })
    .then((data) => {
      console.log(data);
    })
    .then(() => {
      this.updateMarkers();
    });
  }

  onMessageClicked(_id) {
    const markers = this.state.markers.map((data) => {
      if (! data.clicked && data._id == _id) {
        return this.getComments(_id)
        .then((res) => {
          data.clicked = true;
          data.comments = res.msg;

          return data;
        });
      } else {
        data.clicked = false;
        data.comments = null;
        return data;
      }
    });

    this.setState({ markers });
  }

  onMarkerOrMessageHover(_id) {
    let position;

    const markers = this.state.markers.map((data) => {
      if (data._id == _id) {
        data.hovered = true;
      } else {
        data.hovered = false;
      }
      return data;
    });
    this.setState({ markers });
  }

  onMarkerOrMessageUnHover(_id) {
    const markers = this.state.markers.map((data) => {
      data.hovered = false;
      return data;
    });

    this.setState({ markers });
  }

  onBoundsChange(data) {
    const { center, zoom, bounds, marginBounds } = data;

    this.setState({
      center,
      zoom,
      bounds,
    });

    this.updateMarkers(bounds);
  }

  onLeaveComment(_id) {

  }

  updateMarkers(bounds) {
    this.getMarkers(bounds)
    .then((data) => {
      console.log(data);
      const markers = data.map((data) => {
        data.clicked = false;
        data.hovered = false;
        return data;
      });

      this.setState({
        markers,
      });
    });
  }

  render() {
    const { markers, center, zoom } = this.state;
    return (
      <div>
        <MainMap
          markers={markers}
          center={center}
          zoom={zoom}
          onBoundsChange={::this.onBoundsChange}
          onMarkerHovered={::this.onMarkerOrMessageHover}
          onMarkerUnHovered={::this.onMarkerOrMessageUnHover}
        />
        <Sidebar
          markers={markers}
          createMarker={::this.createMarker}
          onMessageClicked={::this.onMessageClicked}
          onMessageHovered={::this.onMarkerOrMessageHover}
          onMessageUnHovered={::this.onMarkerOrMessageUnHover}
          onLeaveComment={::this.onLeaveComment}
        />
      </div>
    );
  }
}
