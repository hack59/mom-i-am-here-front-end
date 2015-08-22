import React, { PropTypes, Component } from 'react/addons';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

export default class MainMap extends Component {
  constructor(props) {
    super(props);
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
    this.props.onBoundsChange({center, zoom, bounds, marginBounds});
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
      <div style={styles}>
        <GoogleMap
          ref="map"
          center={this.props.center}
          zoom={this.props.zoom}
          onBoundsChange={::this.onBoundsChange}>
          {markers}
        </GoogleMap>
      </div>
    );
  }
}
