import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './stats.styles.scss';

const Stats = ({ cpm, wpm, time }) => {
    return (
        <div className='stats-container'>
            <div className='cpm'>
                <h1>{cpm}</h1>
                <h2>CPM</h2>
            </div>
            <div className='wpm'>
                <h1>{wpm}</h1>
                <h2>WPM</h2>
            </div>
            <div className='time'>
                <h1>{time}</h1>
                <h2>Time</h2>
            </div>
        </div>
    );
};

export default Stats;