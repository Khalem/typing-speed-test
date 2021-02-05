import React from 'react';
import RandomWords from 'random-words';

import CustomButton from './components/custom-button/custom-button.component';
import WordBox from './components/word-box/word-box.component';
import UserInput from './components/user-input/user-input.component';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      words: RandomWords(200),
      userWords: [],
      userInput: '',
      mistakes: [],
      index: 0
    }
  }

  handleChange = event => {
    if (event.nativeEvent.data === ' ' && event.target.value.match(/\S/)) {
      let userWords = this.state.userWords;
      userWords.push(event.target.value);
      this.setState({ userWords, userInput: '' });
    } else {
      this.setState({ userInput: event.target.value });
    }
  }

  render() {
    return (
      <div className='app'>
        <h1 className='title'>Typing Speed Test</h1>
        <h2 className='heading'>In this test, you will be given 60 seconds to type the most common English words as fast as you can.
          You will be judged only on correct words, so accuracy is everything! Your time will start as soon
          as you start typing. Good luck!
        </h2>
        <div className='box'>
          <WordBox words={this.state.words} />
          <UserInput handleChange={this.handleChange} userInput={this.state.userInput} />
        </div>
        <h3>{this.state.userInput}</h3>
        {
          this.state.userWords.map(word => (<h3>{word}</h3>))
        }
      </div>
    );
  }
}

export default App;
