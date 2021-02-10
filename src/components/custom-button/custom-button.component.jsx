import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './custom-button.styles.scss';

const CustomButton = () => (
    <button name='start' className='custom-button'>Let's go! <FontAwesomeIcon icon={faArrowRight} className='icon' /></button>
);

export default CustomButton;

