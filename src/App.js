import React from 'react';
import RandomWords from 'random-words';
import scrollIntoView from 'scroll-into-view-if-needed'

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

  componentDidMount() {
    // Need to wait for DOM to load as I'm giving ID's based off their top offset
    window.addEventListener('load', this.wordWrap);
  }

  /*
    Because of different window sizes, I won't hard code when each line ends,
    instead I will dynamically give IDs to let me know when a row ends,
    so that I can auto scroll effectively
    (could maybe use this for window resize too?)
  */
  wordWrap = () => {
    const words = document.querySelectorAll('.word');
    let offset = words[0].offsetTop;
    let rows = 0;

    for (let i = 0; i < words.length; i++) {
      if (words[i].offsetTop > offset) {
        words[i-1].id = `row-${rows}`;
        rows+=1;
        offset = words[i].offsetTop;
      }
    }
  }

  /*
    I'm using 'scroll-into-view-if-needed' as vanilla JS' '.scrollIntoView()' doesn't seem to smooth-scroll.
    When a word has an ID, I get the elemenet to scroll to by adding 1 to the ID. 
    This will be called in this.handleChange and this.handleKeyDown to scroll both up and down
  */
  scrollBox = (index, posNeg) => {
    const wordBoxWords = document.querySelectorAll('.word');
    const word = wordBoxWords[index];

    if (word.id) {
      let id = parseInt(word.id.split("-")[1]);
      let newRow = document.querySelector(`#row-${id + posNeg}`);
      if (newRow) scrollIntoView(newRow, { behavior: 'smooth' });
    }
  }

  handleChange = event => {
    if (event.nativeEvent.data === ' ' && event.target.value.match(/\S/)) {
      let { words, userWords, correctUserWords, index, mistakes } = this.state;
      userWords.push(event.target.value);
      
      if (event.target.value === words[index] + ' ') {
        correctUserWords.push(index);
      } else {
        mistakes.push(index);
      }

      this.scrollBox(index, 1);

      this.setState({ userWords, correctUserWords, mistakes, userInput: '', index: index+=1 });
    } else if (event.nativeEvent.data === ' ' && event.target.value.match(/\s/)) {
      // if user only inputs spaces, don't update state
      return false;
    } else {
      this.setState({ userInput: event.target.value });
    }
  }

  // This function will handle the backspace key, as its undetectable using onChange when the input is already empty
  handleKeyDown = event => {
    if (!event.target.value && event.key === 'Backspace') {
      let { userWords, correctUserWords, mistakes, index } = this.state;
      let userInput = userWords[userWords.length-1];
      let newCorrectUserWords = correctUserWords.filter(word => word !== index && word !== index - 1);
      let newMistakes = mistakes.filter(word => word !== index);

      index = userWords.length ? index - 1 : index;

      this.scrollBox(index, -1);

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
            userInput={this.state.userInput}
          />
          <UserInput 
            handleKeyDown={this.handleKeyDown}
            handleChange={this.handleChange}
            userInput={this.state.userInput} 
          />
        </div>
      </div>
    );
  }
}

export default App;
