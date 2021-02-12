import React from 'react';
import RandomWords from 'random-words';
import scrollIntoView from 'scroll-into-view-if-needed'

import CustomButton from './components/custom-button/custom-button.component';
import WordBox from './components/word-box/word-box.component';
import UserInput from './components/user-input/user-input.component';
import Stats from './components/stats/stats.component';
import Results from './components/results/results.component';

import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      words: RandomWords({exactly: 200, maxLength: 5 }),
      userWords: [],
      correctUserWords: [],
      userInput: '',
      mistakes: [],
      index: 0,
      rawCPM: 0,
      correctedCPM: 0,
      wpm: 0,
      time: 60,
      gameStarted: false,
      gameOver: false
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
      let newRow = document.getElementById(`row-${id + posNeg}`);
      if (newRow) scrollIntoView(newRow, { behavior: 'smooth' });
    }
  }

  countdown = () => {
    const time = this.state.time - 1;

    // if times up, end countdown and game
    if (time === 0) {
      clearInterval(this.countdownInterval);
      this.setState({ gameOver: true, gameStarted: false, time: 60 });
    } else {
      this.setState({ time });
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
      this.calculateCPM();

      this.setState({ userWords, correctUserWords, mistakes, userInput: '', index: index+=1 });
    } else if (event.nativeEvent.data === ' ' && event.target.value.match(/\s/)) {
      // if user only inputs spaces, don't update state
      return false;
    } else {
      // if game hasn't started yet, start countdown
      if (this.state.gameStarted === false) {
        this.countdownInterval = setInterval(() => {
          this.countdown();
        }, 1000);

        this.setState({ gameStarted: true });
      }

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
    let userCorrectWords = [];

    this.state.correctUserWords.forEach(item => {
      userCorrectWords.push(this.state.words[item]);
    })

    let correctUserWords = userCorrectWords.join("");
    let rawCPM = userWords.length;
    let correctedCPM = correctUserWords.length;
    let wordsPerCPM = Math.round(correctedCPM / 5);
    let wpm = Math.round(wordsPerCPM / ((60 - this.state.time) / 60));

    this.setState({ rawCPM, correctedCPM, wpm });
  }

  restart = () => {
    const state = {
      words: RandomWords({exactly: 200, maxLength: 5 }),
      userWords: [],
      correctUserWords: [],
      userInput: '',
      mistakes: [],
      index: 0,
      rawCPM: 0,
      correctedCPM: 0,
      wpm: 0,
      time: 60,
      gameStarted: false,
      gameOver: false
    }

    this.setState({ ...state });
  }

  render() {
    return (
      <div className='app'>
        {
          !this.state.gameOver ?
          <div>
            <h1 className='title'>Typing Speed Test</h1>
            <h2 className='heading'>In this test, you will be given 60 seconds to type the most common English words as fast as you can.
              You will be judged only on correct words, so accuracy is everything! Your time will start as soon
              as you start typing. Good luck!
            </h2>
            <div className='box'>
            <Stats 
              cpm={this.state.correctedCPM}
              wpm={this.state.wpm}
              time={this.state.time}
            />
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
        :
        <div className='game-over-box'>
          <Results 
            rawCPM={this.state.rawCPM}
            correctedCPM={this.state.correctedCPM}
            wpm={this.state.wpm}
            mistakes={this.state.mistakes}
            restart={this.restart}
          />
        </div>
        }
      </div>
    );
  }
}

export default App;
