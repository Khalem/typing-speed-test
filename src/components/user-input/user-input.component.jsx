import React from 'react';

import './user-input.styles.scss';

const UserInput = ({ handleChange, handleKeyDown, userInput }) => {
    return (
        <div className='input-box'>
            <input 
                autocomplete="off"
                type='text' 
                name='Word Input' 
                className='user-input'
                // when game starts, ternary to display placeholder
                placeholder='type here..'
                value={userInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default UserInput;