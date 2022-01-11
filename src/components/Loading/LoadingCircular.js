import React from 'react';
import '@Assets/css/loading-circular.css';

const LoadingCircular = () => {
    return (
        <div className={'rodal-loader-circular'}>
            <div className="loader-circular"/>
        </div>
    )
}

export default React.memo(LoadingCircular);

