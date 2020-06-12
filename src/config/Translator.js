import React, { Component, Fragment, useState  } from 'react';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import Tts from './TextToSpeech';



class Translator extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            languageFrom: "",
            languageTo: "",
            languageCode: 'en',
            inputText: "",
            outputText: "",
            submit: false,
            micOn: true,
        };
        //TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyCPTGQAohORrOi52EI8ulbunw9KVSQ0-oo', this.state.languageCode);
        //this._buttonClick = this._buttonClick.bind(this);
    }
    // handleTranslate = () => {
    //     this.setState({submit: true})
    //     const translator = TranslatorFactory.createTranslator();
    //     translator.translate(this.state.inputText).then(translated => {
    //         Tts.getInitStatus().then(() => {
    //             Tts.speak(translated);
    //         });
    //         Tts.stop();
    //     });
    // }
   
    
    setMyLanguage=(key) => 
    {
       
        //this.setState({languageTo: key, languageCode:key});
        this.state.languageTo = key;
        this.state.languageCode = key;
    }

    translateMe = (text) => {
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyCPTGQAohORrOi52EI8ulbunw9KVSQ0-oo', this.state.languageCode);
        this.setState({submit: true})
        const translator = TranslatorFactory.createTranslator();
        translator.translate(text).then(translated => {
            Tts.shared.readText(translated);
            return translated;            
        });
        return "";
    }

    translateMe2 = (text) => {
        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200526T114000Z.7db891912a107bed.f36f3f9b782007a61e87f8233e8d6e6a4cf59ac4a&lang=tr-en&text=' + text)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.text)
        //setResponse(res.text)
        //Tts.shared.readText(res.text);
        return res.text;
      })
      .catch((error) => {
        console.log(error)
      });
      //return "";
    }
}

Translator.shared = new Translator();
export default Translator;