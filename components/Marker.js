import React, { PropTypes, Component} from 'react/addons';

export default class Marker extends Component {
  onMarkerHovered(_id) {
    this.props.onMarkerHovered(_id);
  }

  onMarkerUnHovered(_id) {
    this.props.onMarkerUnHovered(_id);
  }

  render() {
    const K_SIZE = 20;
    const { _id, lat, lng } = this.props;
    const styles = {
      position: 'absolute',
      width: K_SIZE,
      height: K_SIZE,
      left: -K_SIZE / 2,
      top: -K_SIZE / 2,

      border: '5px solid #f44336',
      borderRadius: K_SIZE,
      backgroundColor: 'white',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4,
      cursor: 'pointer'
    };

    const hoverStyles = {
      ...styles,
      border: '5px solid #3f51b5',
      color: '#f44336'
    };

    const markerHover = this.onMarkerHovered.bind(this, _id);
    const markerUnHover = this.onMarkerUnHovered.bind(this, _id);

    return (
      <div lat={lat} lng={lng} onMouseEnter={markerHover} onMouseLeave={markerUnHover} style={this.props.hovered ? hoverStyles : styles}>
      </div>
    );
  }
}
