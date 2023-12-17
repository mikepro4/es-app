import React from 'react'
import PyramidLetter from "./PyramidLetter"

const lettersObject = [
    { letter: "S", amount: 1, active: 1 },
    { letter: "A", amount: 3, active: 1 },
    { letter: "B", amount: 5, active: 1 },
    { letter: "X", amount: 1, active: 1 },
    { letter: "C", amount: 9, active: 1 },
    { letter: "D", amount: 11, active: 1 },
    { letter: "K", amount: 1, active: 1 },
    { letter: "E", amount: 15, active: 1 },
    { letter: "F", amount: 17, active: 1 },
    { letter: "L", amount: 3, active: 50 },
    { letter: "G", amount: 21, active: 30 },
    { letter: "H", amount: 23, active: 7 },
]

const DisplayPyramid = () => {
    const totalActive = lettersObject.reduce((sum, letter) => {
        return sum + Math.min(letter.active, letter.amount);
    }, 0);
    return (
        <div>
            <div>DisplayPyramid</div>
            <div className='pyramid-container'>
                {lettersObject.map((letter, index) => (
                    <div key={index} >
                        <PyramidLetter letter={letter.letter} amount={letter.amount} active={letter.active} />
                    </div>
                ))}
            </div>
            <div>Total Active: {totalActive}/110</div>

        </div>
    )
}

export default DisplayPyramid