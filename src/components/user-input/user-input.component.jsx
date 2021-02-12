import React from 'react';

import './user-input.styles.scss';

const UserInput = ({ handleChange, handleKeyDown, userInput, gameStarted }) => {
    return (
        <div className='input-box'>
            <input 
                autoComplete="off"
                type='text' 
                name='Word Input' 
                className='user-input'
                // when game starts, ternary to display placeholder
                placeholder={gameStarted ? '' : 'type here..'}
                value={userInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default UserInput;