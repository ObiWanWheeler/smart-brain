import React from 'react';

const Rank = ({name, entryCount}) => {
    return (
        <React.Fragment>
        <div className='white f2'>
            {`${name} your current rank is...`}
        </div>
        <div className='white f1'>
            {entryCount}
        </div>
        </React.Fragment>
    );
};

export default Rank;