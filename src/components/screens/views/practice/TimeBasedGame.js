import React from 'react';
import ProgressBar from "../../../helper/ProgressBar";


const TimeBasedGame = () => {
    return (
        <ProgressBar duration={5000} onFinish={() => console.log('finish')}/>
    );
};

export default TimeBasedGame
