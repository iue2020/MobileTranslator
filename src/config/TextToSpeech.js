import React, { Component } from 'react';
import Tts from 'react-native-tts';

class TextToSpeech {
    //constructor(props) {
    constructor() {
        //super(props);
        Tts.addEventListener('tts-start'//, event =>
          //this.setState({ ttsStatus: 'started' }), 
        );
        Tts.addEventListener('tts-finish'//, event =>
          //this.setState({ ttsStatus: 'finished' })
        );
        Tts.addEventListener('tts-cancel'//, event =>
          //this.setState({ ttsStatus: 'cancelled' })
        );
        Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
    }

    state = {
        voices: [],
        ttsStatus: 'initiliazing',
         selectedVoice: 'en-EN',
         speechRate: 0.05,
         speechPitch: 1,
        text: 'Enter Text like Hello About React',
      };

      initTts = async () => {
        const voices = await Tts.voices();
        const availableVoices = voices
          .filter(v => !v.networkConnectionRequired && !v.notInstalled)
          .map(v => {
            return { id: v.id, name: v.name, language: v.language };
          });
        let selectedVoice = null;
        if (voices && voices.length > 0) {
          selectedVoice = voices[0].id;
          try {
            await Tts.setDefaultLanguage(voices[0].language);
          } catch (err) {
            //Samsung S9 has always this error: "Language is not supported"
            console.log(`setDefaultLanguage error `, err);
          }
          await Tts.setDefaultVoice(voices[0].id);
          this.setState({
            voices: availableVoices,
            selectedVoice,
            ttsStatus: 'initialized',
          });
        } else {
          this.setState({ ttsStatus: 'initialized' });
        }
      };
    
      readText = async message => {
        Tts.stop();
        Tts.speak(message);
      };
    
      setSpeechRate = async rate => {
        await Tts.setDefaultRate(rate);
        this.setState({ speechRate: rate });
      };
    
      setSpeechPitch = async rate => {
        await Tts.setDefaultPitch(rate);
        this.setState({ speechPitch: rate });
      };
    
      onVoicePress = async voice => {
        try {
          await Tts.setDefaultLanguage(voice.language);
        } catch (err) {
          // My Samsung S9 has always this error: "Language is not supported"
          console.log(`setDefaultLanguage error `, err);
        }
        await Tts.setDefaultVoice(voice.id);
        this.setState({ selectedVoice: voice.id });
      };
    
      renderVoiceItem = ({ item }) => {
        return (
          <Button
            title={`${item.language} - ${item.name || item.id}`}
            color={this.state.selectedVoice === item.id ? undefined : '#969696'}
            onPress={() => this.onVoicePress(item)}
          />
        );
      };
}

TextToSpeech.shared = new TextToSpeech();
export default TextToSpeech;