import React, { PropTypes, Component} from 'react/addons';

export default class Marker extends Component {
  render() {
    const K_SIZE = 20;
    const { lat, lng, children } = this.props;
    const styles = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
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

    return (
      <div lat={lat} lng={lng} style={styles}>
        {children}
      </div>
    );
  }
}
