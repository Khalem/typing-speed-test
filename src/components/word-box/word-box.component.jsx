import React from 'react';

import './word-box.styles.scss';

const WordBox = ({ words }) => {
    return (
        <div className='word-box'>
            {
              words.map(word => {
                return <span>{word} </span>
              })
            }
          </div>
    );
}

export default WordBox;