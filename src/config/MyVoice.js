import React, { Component } from 'react';
import Voice from 'react-native-voice';

export default class MyVoice {
    

    constructor(props) {
        //super(props);

        this.state = {
          recognized: '',
          started: '',
          results: [],
      };
      Voice.onSpeechStart = this.onSpeechStart.bind(this)
      Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
      Voice.onSpeechResults = this.onSpeechResults.bind(this) 
   
    }

    // componentWillUnmount() {
    //     Voice.destroy().then(Voice.removeAllListeners);
    
    //   }
test()
{

  console.log("asd");
}
      onSpeechStart(e) {
        this.setState({
          started: '√',
        });
      }
      onSpeechRecognized(e) {
        this.setState({
          recognized: '√',
        });
      }
      onSpeechResults(e) {
        this.setState({
          results: e.value,
        });
      }
    _startRecognition(e) {
        console.log("okkk")
        // this.setState({
        //   recognized: '',
        //   started: '',
        //   results: [],
        // });
        try {
           Voice.start('en-US');
        } catch (e) {
          console.error(e);
        }
        console.log("okkk")
      }

    

}

MyVoice.shared = new MyVoice();
//export default MyVoice;
//export {shared};