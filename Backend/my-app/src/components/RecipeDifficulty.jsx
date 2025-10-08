import React from "react";

const RecipeDifficulty = ({timeInMins}) => {
    let difficulty;

    if (timeInMins <=30) {
        difficulty = 'Easy Peasy';
    } else if (timeInMins <= 60)  {
        difficulty = 'It´s Mid';
        } else {
            difficulty = '"It´s RAW!" Qouted by Gordon Ramsey (Hard)'
        }


        return (
<p>

<strong> Difficulty: </strong> {difficulty}
</p>
);
};

export default RecipeDifficulty