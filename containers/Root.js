import React, { Component } from 'react';
import MainMap from '../components/MainMap';
import Sidebar from '../components/Sidebar';

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
    //
    // });
    const marker = this.getMarker().map((data) => {
      data.properties['clicked'] = false;
      data.properties['hovered'] = false;
      return data;
    });

    this.state = {
      marker
    };
  }

  getMarker() {
    return [
      {
        uid: 0,
        type: 'Message',
        geometry: {
          type: 'Point',
          coordinates: [25.021667, 121.535386]
        },
        properties: {
          title: 'HachNTU',
          content: '我在被虐天氣晴',
          good: 18,
          bad: 3,
          didgood: true,
          didbad: false,
          time: '2015/8/22 00:15:00',
        }
      },
      {
        uid: 1,
        type: 'Message',
        geometry: {
          type: 'Point',
          coordinates: [25.020506, 121.533868]
        },
        properties: {
          title: '牛肉麵',
          content: '好ㄘ',
          good: 38,
          bad: 1,
          didgood: false,
          didbad: false,
          time: '2015/8/21 17:15:00',
        }
      }
    ]
  }

  getComments(uid) {
    if (uid == 0) {
      return [
        {
          uid: 0,
          content: 'ㄇㄉ做不出來卡關啦',
          good: 3,
          bad: 0,
          didgood: false,
          didbad: false,
          time: '2015/8/22 03:15:00'
        },
        {
          uid: 1,
          content: '我烏雲籠罩，幹',
          good: 5,
          bad: 1,
          didgood: false,
          didbad: false,
          time: '2015/8/22 03:33:00'
        }
      ];
    } else {
      return [
        {
          uid: 0,
          content: '我也有吃',
          good: 6,
          bad: 0,
          didgood: false,
          didbad: false,
          time: '2015/8/21 18:15:00'
        }
      ];
    }
  }

  onMessageClicked(uid) {
    const marker = this.state.marker.map((data) => {
      if (! data.properties.clicked && data.uid == uid) {
        data.properties.clicked = true;
        data.properties.comments = this.getComments(uid);
      } else {
        data.properties.clicked = false;
        data.properties.comments = null;
      }

      return data;
    });

    this.setState({ marker });
  }

  onMarkerOrMessageHover(uid) {
    const marker = this.state.marker.map((data) => {
      if (data.uid == uid) {
        data.properties.hovered = true;
      } else {
        data.properties.hovered = false;
      }
      return data;
    });

    this.setState({ marker });
  }

  onMarkerOrMessageUnHover(uid) {
    const marker = this.state.marker.map((data) => {
      data.properties.hovered = false;
      return data;
    });

    this.setState({ marker });
  }

  render() {
    const { marker } = this.state;
    return (
      <div>
        <MainMap
          marker={marker}
          onMessageClicked={::this.onMessageClicked}
          onMessageHovered={::this.onMarkerOrMessageHover}
          onMessageUnHovered={::this.onMarkerOrMessageUnHover}
        />
        <Sidebar
          marker={marker}
          onMessageClicked={::this.onMessageClicked}
          onMessageHovered={::this.onMarkerOrMessageHover}
          onMessageUnHovered={::this.onMarkerOrMessageUnHover}
        />
      </div>
    );
  }
}
