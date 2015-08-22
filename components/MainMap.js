import React, { PropTypes, Component } from 'react/addons';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

export default class MainMap extends Component {
  constructor(props) {
    super(props);
  }

  onCenterChange() {
    console.log(this.refs.map);
    console.log('change');
  }

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
          onMarkerHovered={this.props.onMarkerHovered}
          onMarkerUnHovered={this.props.onMarkerUnHovered}
        />
      );
    });

    return (
      <div style={styles} onMouseUp={::this.onCenterChange}>
        <GoogleMap
          ref="map"
          center={this.props.position}
          zoom={16} >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}
