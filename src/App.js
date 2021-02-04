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
      userInput: '',
      mistakes: []
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
          <UserInput />
        </div>
      </div>
    );
  }
}

export default App;
