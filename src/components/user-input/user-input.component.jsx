import React from 'react';

import './user-input.styles.scss';

const UserInput = ({ handleChange, userInput }) => {
    return (
        <div className='input-box'>
            <input 
                type='text' 
                name='Word Input' 
                className='user-input' 
                placeholder='type here..'
                value={userInput}
                onChange={handleChange} 
            />
        </div>
    );
}

export default UserInput;