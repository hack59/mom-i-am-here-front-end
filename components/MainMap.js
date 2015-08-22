import React, { PropTypes, Component } from 'react/addons';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

export default class MainMap extends Component {
  render() {
    const styles = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '65%',
      height: '100%',
    };

    const markers = this.props.markers.map((data)=> {
      const { _id, hovered } = data;
      const { lat, lng } = data.loc;

      return (
        <Marker
          key={_id}
          _id={_id}
          lat={lat}
          lng={lng}
          hovered={hovered}
          onMessageClicked={this.props.onMessageClicked}
          onMessageHovered={this.props.onMessageHovered}
          onMessageUnHovered={this.props.onMessageUnHovered}
        />
      );
    });

    return (
      <div style={styles}>
        <GoogleMap
          center={[25.0210596, 121.5353251]}
          zoom={16} >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}
