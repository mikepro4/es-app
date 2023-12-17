import React from 'react'
import classNames from 'classnames';

const PyramidLetter = ({ letter, amount, active }) => {

    const letters = Array.from({ length: amount }, (_, index) => {
        // Apply red color to the first 'active' letters
        const letterClass = classNames({
            'red-letter': index < active,
            "letter": true

        });

        return (
            <p className={letterClass} key={index}>
                {letter}


            </p>
        );
    });
    return (
        <div>
            <div className='letter-container'>{letters}{active > amount && <span className='letter-exponent'>{active - amount}</span>}</div>

        </div>

    )
}

export default PyramidLetter