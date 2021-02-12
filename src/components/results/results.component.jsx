import React from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import './results.styles.scss';

import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Results = ({ rawCPM, correctedCPM, wpm, restart }) => {
    /*
        All elements will share the same animation, only difference is the delay,
        so I will use dynamic variants to avoid DRY code
    */
    const resultVariants = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 1 * i
            }
        })
    }

    return (
        <div className='results-container'>
            <motion.h1 className='results-title' initial='hidden' custom={.25} animate='visible' variants={resultVariants} >Congrats! You achieved</motion.h1>
            <motion.h1 className='wpm' initial='hidden' custom={.35} animate='visible' variants={resultVariants}>{wpm} Words Per Minute!</motion.h1>
            <motion.div
                className='results'
                custom={1}
                initial='hidden'
                animate='visible'
                variants={resultVariants}
            >
                <div className='raw-cpm'>
                    <ReactTooltip className='information-text' id='raw_info' arrowColor='var(--light-bg)'>
                        Raw CPM is the total amount of characters you typed in a minute. This includes mistakes and is not
                        considered when calculating your WPM.
                    </ReactTooltip>
                    <h2>{rawCPM}</h2>
                    <h3><FontAwesomeIcon icon={faQuestionCircle} className='information' data-tip data-for='raw_info' /> Raw CPM</h3>
                </div>
                <div className='corrected-cpm'>
                    <ReactTooltip className='information-text' id='corrected_info' arrowColor='var(--light-bg)'>
                        Corrected CPM is the amount of characters you typed that were correct. This the value we use to determine
                        your WPM. 
                    </ReactTooltip>
                    <h2>{correctedCPM}</h2>
                    <h3><FontAwesomeIcon icon={faQuestionCircle} className='information' data-tip data-for='corrected_info' /> Corrected CPM</h3>
                </div>
            </motion.div>
            <motion.h1
                className='restart'
                custom={2}
                initial='hidden'
                animate='visible'
                variants={resultVariants}
                whileHover={{
                    x: -20
                }}
                onClick={restart}
            >
                Like to try again?
                <Arrow  className='arrow' />
            </motion.h1>
        </div>
    );
};

export default Results;