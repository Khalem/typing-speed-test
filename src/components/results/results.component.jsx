import React from 'react';

import './results.styles.scss';

const Results = ({ rawCPM, correctedCPM, wpm, mistakes }) => {
    return (
        <div className='results-container'>
            <h1 className='results-title'>Congrats! You achieved</h1>
            <h1 className='wpm'>{wpm} Words Per Minute!</h1>
            <div className='results'>
                <div>
                    <h2>{rawCPM}</h2>
                    <h3>Raw CPM</h3>
                </div>
                <div>
                    <h2>{correctedCPM}</h2>
                    <h3>Corrected CPM</h3>
                </div>
            </div>
        </div>
    );
};

export default Results;