/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {
  RTCView,
  getUserMedia
} from "react-native-webrtc"


var that;

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      stream: undefined
    }
    that = this
  }

  componentDidMount(){
    let isFront = true;
    let videoSourceId;
    
    getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 640, // Provide your own width, height and frame rate here
          minHeight: 360,
          minFrameRate: 30,
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
      }
    }, function (stream) {
      console.log('getUserMedia success', stream);
      
      that.setState({stream: stream.toURL()});
    }, logError);
    
  }

  render() {
    console.log("Render");
    return (
      <View style={styles.container}>
         <RTCView streamURL={this.state.stream} style={{flex:1, height: 200 , width: 200}}/>
      </View>
    );
  }
}

function logError(error) {
  console.log("logError", error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
