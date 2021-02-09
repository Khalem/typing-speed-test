import React from 'react';

import Letter from '../letter/letter.component';

import './word-box.styles.scss';

const WordBox = ({ words, userIndex, userInput, correctUserWords, mistakes }) => {
    return (
        <div className='word-box'>
            {
              words.map((word, index) => {
                let style = '';
                
                if (correctUserWords.includes(index) && index !== userIndex) {
                  style = 'correct';
                } else if (mistakes.includes(index) && index !== userIndex) {
                  style = 'mistake';
                } else if (index === userIndex) {
                  style = 'active';
                }
                
                // if current word, have each letter a span so user can get live feedback
                if (index === userIndex) {
                  return <div key={index} className={style}>
                    { word.split("").map((letter, index) => (
                      <Letter 
                        letter={letter}
                        index={index}
                        userInput={userInput}
                      />
                    )) }
                  </div>
                } else {
                  return <div key={index} className={style}>{word}</div>
                }
              })
            }
          </div>
    );
}

export default WordBox;