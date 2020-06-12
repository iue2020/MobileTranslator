import React, {Component} from 'react';
import {GiftedChat, Bubble, Send, SendIcon} from 'react-native-gifted-chat';
import { Composer } from 'react-native-gifted-chat'
import Fire from '../config/Fire';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Bubbles} from 'react-native-loader';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from '../config/TextToSpeech';
import { date } from 'yup';
import {
  Button,
  Icon
} from 'native-base';
//import Voice from 'react-native-voice';

class Chat extends Component {
  cText = "";

  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      message: [],
      user: {},
      url: '',
      // recognized: '',
      // started: '',
      // results: [],
    };

    // Voice.onSpeechStart = this.onSpeechStart.bind(this);
    // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    // Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  
  
// componentWillUnmount() {
//     Voice.destroy().then(Voice.removeAllListeners);
//   }
// onSpeechStart(e) {
//     this.setState({
//       started: '√',
//     });
//   };
// onSpeechRecognized(e) {
//     this.setState({
//       recognized: '√',
//     });
//   };
// onSpeechResults(e) {
//     this.setState({
//       results: e.value,
//     });
//   }
// async _startRecognition(e) {
//     this.setState({
//       recognized: '',
//       started: '',
//       results: [],
//     });
//     try {
//       await Voice.start('en-US');
//     } catch (e) {
//       console.error(e);
//     }
//     console.log("okkk")
//   }

  get user() {
    return {
      name: Fire.shared.name,
      _id: Fire.shared.uid,
      avatar: this.state.url !== undefined ? this.state.url : null,
      receiverId: this.props.data[0],
    };
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#BC2C3D',
          },
          left: {
            color: '#EFD2BC',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#c41e3a',
          },
          right: {
            backgroundColor: '#F8B878',
          },
        }}
      />
    );
  };

  onPressAvatar = () => {
    Actions.friend({
      title: this.props.data[1],
      email: this.props.data[2],
      address: this.props.data[3],
      image: this.props.data[4],
    });
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Text style={styles.loadingText}>Please Wait...</Text>
        <Bubbles size={15} color="#BC2C3D" />
      </View>
    ) : (
      <GiftedChat
        alwaysShowSend={true}
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
        renderBubble={this.renderBubble}
        onPressAvatar={this.onPressAvatar}
        //renderInputToolbar={props => this.customtInputToolbar(props)}
        //renderSend={this.renderSend}
        renderComposer={this.renderComposer}
        //text={this.customText()}
        //{this.customText()}
        //onInputTextChanged={text => this.setCustomText(text)}
        //text={this.state.text}
        //text={this.cText}
        //onInputTextChanged={(text) => this.setCustomText(text)}
        onInputTextChanged = {(text) => this.setCustomText(this.text)}
        //onInputTextChanged = {(text) => this.customText()}
        
  
      />
    );
  }

  //  setCustomText(newMessage) {
  //   this.setState( text  =>
  //     text.text= newMessage,
    
  //     );
  //     return "";
  //   }
  
  customText()
    {
      return this.cText;
    }
  // setCustomText(text)
  // {
  //   this.cText = text;
  // }
  setCustomText = (text) => {
    //this.setState({text:text})
    //this.props.text = "asdasd"
    this.cText = text;
    //this.state.text = "asdw"
    }

    setMyLangEasy = (key) => {
        Fire.shared.setMoLang(key);
        
      }

  renderComposer = props => {
    return (
      <View style={{flexDirection: 'row-reverse'}}>
        <Composer {...props} />
        <Send {...props}>
          <View style={{ marginBottom: 7, marginLeft: 5 }}>
            <Ionicons 
              name="md-send"
              size={29}
            />          
          </View>    
        </Send>                
      </View>      
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 6, marginRight: 10 }}>
          <Ionicons 
            name="md-send"
            size={29}
          />          
        </View>    
      </Send>
     
    );
  }

 

  
  componentDidMount() {
    this.getImg();
    this.msg();
    //this.setCustomText("ajk")
  }


  msg() {
    Fire.shared.on(
      message =>
        this.setState(previous => ({
          messages: GiftedChat.append(previous.messages, message),
          isLoading: false,          
        }),
        //Tts.shared.readText(message.text)        
        ),
      //message => Tts.shared.readText(message.text),
      this.props.data[0],
      //message => Tts.shared.readText(message.text),
    );

  }

  getImg() {
    Fire.shared
      .getImage(Fire.shared.uid)
      .then(url => {
        this.setState({url});
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}
//export const c = new Chat();

const ct = new Chat()
export default Chat;
export {ct};


const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon:{
    alignItems: 'center',
    alignSelf:'center'
  }
});
