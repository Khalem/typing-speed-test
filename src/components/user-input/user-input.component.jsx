import React from 'react';

import './user-input.styles.scss';

const UserInput = props => {
    return (
        <div className='input-box'>
            <input type='text' name='Word Input' className='user-input' placeholder='type here..' />
        </div>
    );
}

export default UserInput;