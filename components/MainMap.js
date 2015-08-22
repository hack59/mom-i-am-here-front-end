import React, { PropTypes, Component } from 'react/addons';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

export default class MainMap extends Component {
  render() {
    const { marker } = this.props;
    const styles = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '65%',
      height: '100%',
    };

    const markers = marker.map((data)=> {
      console.log(data);
      const [lat, lng] = data.geometry.coordinates;
      return (
        <Marker
          key={data.uid}
          uid={data.uid}
          lat={lat}
          lng={lng}
          hovered={data.properties.hovered}
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
