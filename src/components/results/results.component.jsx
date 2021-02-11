import React from 'react';
import { motion } from 'framer-motion';

import './results.styles.scss';

import { ReactComponent as Arrow } from '../../assets/arrow.svg';

const Results = ({ rawCPM, correctedCPM, wpm, mistakes }) => {
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
                    <h2>{rawCPM}</h2>
                    <h3>Raw CPM</h3>
                </div>
                <div className='corrected-cpm'>
                    <h2>{correctedCPM}</h2>
                    <h3>Corrected CPM</h3>
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
            >
                Like to try again?
                <Arrow  className='arrow' />
            </motion.h1>
        </div>
    );
};

export default Results;