import React, { useState, useEffect } from 'react'
import PyramidLetter from "./PyramidLetter"

const lettersObject = [
    { letter: "S", amount: 1, active: 0 },
    { letter: "A", amount: 3, active: 0 },
    { letter: "B", amount: 5, active: 0 },
    { letter: "X", amount: 1, active: 0 },
    { letter: "C", amount: 9, active: 0 },
    { letter: "D", amount: 11, active: 0 },
    { letter: "K", amount: 1, active: 0 },
    { letter: "E", amount: 15, active: 0 },
    { letter: "F", amount: 17, active: 0 },
    { letter: "L", amount: 3, active: 0 },
    { letter: "G", amount: 21, active: 0 },
    { letter: "H", amount: 25, active: 0 },
]

const DisplayPyramid = ({ nfts }) => {
    const [letters, setLetters] = useState(lettersObject);
    console.log("nfts", nfts)

    useEffect(() => {

        if (nfts) {
            const letterSums = {};
            nfts?.forEach(nft => {
                nft.metadata.attributes.forEach(attribute => {
                    if (attribute.trait_type.length === 1 && /^[A-Z]$/.test(attribute.trait_type)) {
                        if (!letterSums[attribute.trait_type]) {
                            letterSums[attribute.trait_type] = 0;
                        }
                        letterSums[attribute.trait_type] += attribute.value;
                    }
                });
            });

            // Update state
            setLetters(letters.map(letter => ({
                ...letter,
                active: letterSums[letter.letter] || 0
            })));
        }

    }, [nfts]);

    const totalActive = letters.reduce((sum, letter) => {
        return sum + Math.min(letter.active, letter.amount);
    }, 0);
    return (
        <div>
            <div>DisplayPyramid</div>
            <div className='pyramid-container'>
                {letters.map((letter, index) => (
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


// useEffect(() => {
//     if (nfts) {
//         const updatedLetters = letters.map(letter => {
//             // Find the NFT with the corresponding letter
//             const nft = nfts.find(n => n.metadata.attributes.some(a => a.trait_type === letter.letter && a.display_type === "number"));

//             // Update the 'active' value if the NFT exists
//             if (nft) {
//                 const attribute = nft.metadata.attributes.find(a => a.trait_type === letter.letter);
//                 return { ...letter, active: attribute.value };
//             }
//             return letter;
//         });

//         setLetters(updatedLetters);
//     }
// }, [nfts]);