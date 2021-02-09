import React from 'react';

import './letter.styles.scss';

const Letter = ({ letter, index, userInput }) => {
    let style = '';

    if (userInput && letter === userInput[index]) {
        style = 'correctLetter';
    } else if (userInput && userInput.length > index && letter !== userInput[index]) {
        style = 'incorrectLetter';
    }

    return (
        <span className={style}>{letter}</span>
    );
}

export default Letter;