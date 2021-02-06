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
      correctUserWords: [],
      userInput: '',
      mistakes: [],
      index: 0,
      rawCPM: 0,
      correctedCPM: 0,
      wpm: 0
    }
  }

  handleChange = event => {
    if (event.nativeEvent.data === ' ' && event.target.value.match(/\S/)) {
      let { words, userWords, correctUserWords, index, mistakes } = this.state;
      userWords.push(event.target.value);
      
      if (event.target.value === words[index] + ' ') {
        correctUserWords.push(event.target.value);
      } else {
        mistakes.push(index);
      }

      this.setState({ userWords, correctUserWords, mistakes, userInput: '', index: index+=1 });
    } else {
      this.setState({ userInput: event.target.value });
    }
  }

  // This function will handle the backspace key, as its undetectable using onChange when the input is already empty
  handleKeyDown = event => {
    if (!event.target.value && event.key === 'Backspace') {
      let { userWords, correctUserWords, mistakes, index } = this.state;
      let userInput = userWords[userWords.length-1];
      let newCorrectUserWords = correctUserWords.filter(word => word !== userWords[userWords.length-1]);
      let newMistakes = mistakes.filter(word => word !== index);

      index = userWords.length ? index - 1 : index;

      userWords.pop();

      this.setState({ userWords, correctUserWords: newCorrectUserWords, mistakes: newMistakes, userInput, index });
    }
  }

  calculateCPM = () => {
    let userWords = this.state.userWords.join("");
    let correctUserWords = this.state.correctUserWords.join("");
    let rawCPM = userWords.length;
    let correctedCPM = correctUserWords.length;
    let wpm = Math.round(correctedCPM / 5);

    this.setState({ rawCPM, correctedCPM, wpm });
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
          <WordBox 
            words={this.state.words} 
            userIndex={this.state.index}
            correctUserWords={this.state.correctUserWords}
            mistakes={this.state.mistakes}
          />
          <UserInput 
            handleKeyDown={this.handleKeyDown}
            handleChange={this.handleChange}
            userInput={this.state.userInput} 
          />
        </div>
        {/* For debugging */}
        <h3>{this.state.userInput}</h3>
        {
          this.state.correctUserWords.map(word => (<h3>{word}</h3>))
        }
        <h4>index: {this.state.index}</h4>
      </div>
    );
  }
}

export default App;
