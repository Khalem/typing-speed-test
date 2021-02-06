import React from 'react';

import './word-box.styles.scss';

const WordBox = ({ words, userIndex, correctUserWords, mistakes }) => {
    return (
        <div className='word-box'>
            {
              words.map((word, index) => {
                let style = '';
                
                if (correctUserWords.includes(word + ' ')) {
                  style = 'correct';
                } else if (mistakes.includes(index) && index !== userIndex) {
                  style = 'mistake';
                } else if (index === userIndex) {
                  style = 'active';
                }

                return <div key={index} className={style}>{word}</div>
              })
            }
          </div>
    );
}

export default WordBox;