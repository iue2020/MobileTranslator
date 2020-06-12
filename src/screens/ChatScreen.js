import React from 'react';
import Chat, { ct } from '../components/Chat';
import {
  Header,
  Container,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import {StyleSheet, Platform, ImageBackground,Picker} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Languages from '../config/languages.json'
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import MyVoice from '../config/MyVoice';
// import Voice from 'react-native-voice';


const ChatScreen = props => {

//   this.state = {
//     recognized: '',
//     started: '',
//     results: [],
// };

    // Voice.onSpeechStart = this.onSpeechStart.bind(this);
    // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    // Voice.onSpeechResults = this.onSpeechResults.bind(this);

    
  
  return (
    <Container style={styles.MainContainer}>
      <Picker style={styles.mypicker}
                selectedValue={lang => lang}
                //onValueChange={ lang => this.setState({languageTo: lang, languageCode: lang})}
                onValueChange={ lang => ct.setMyLangEasy(lang)}

                
                >
                    {Object.keys(Languages).map(key => (
                        <Picker.Item label={Languages[key]} value={key} />
                    ))}
            </Picker> 
      <Header style={styles.header} androidStatusBarColor="#BC2C3D">
        <Left>
          <Button transparent onPress={Actions.pop}>
            <Icon name="arrow-back" style={styles.icon} />
          </Button>                 
        </Left>
        <Body>
          <Title style={styles.headerText}>{props.title}</Title>
           
        </Body>
        <Right>  
          <Button transparent onPress={() => this.setMe()}>          
          {/* <Button transparent>     */}
              <Icon name="microphone" style={styles.icon}/>
          </Button>
          
        </Right>
      </Header>
      <ImageBackground
        source={require('../img/bg.png')}
        style={styles.backgroundImage}>
        <Chat
          data={[
            props.receiverId,
            props.title,
            props.email,
            props.address,
            props.image,
          ]}
        />
      </ImageBackground>
    </Container>
  );
};

// onSpeechStart(e) {
//   this.setState({
//     started: '√',
//   });
// }

// onSpeechRecognized(e) {
//   this.setState({
//     recognized: '√',
//   });
// }
// onSpeechResults(e) {
//   this.setState({
//     results: e.value,
//   });
// }

setMe = () => {
  ct.setCustomText("assss");
  MyVoice.shared._startRecognition.bind(this);
  MyVoice.shared.test();
}

export default ChatScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  header: {
    backgroundColor: '#EFD2BC',
  },
  headerText: {
    color: '#BC2C3D',
    marginLeft: -10,
    fontSize: 20,
    fontWeight: '900',
  },
  icon: {
    color: '#BC2C3D',
    fontSize: 26,
  },
  mypicker: {
    color: '#BC2C3D',
    fontSize: 12,
    height:20,
  },
});
