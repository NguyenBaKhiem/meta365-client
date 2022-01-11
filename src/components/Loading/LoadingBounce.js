import React from 'react';

const LoadingBounce = (props) => {
    const { noOverlay } = props;
    if (noOverlay)
        return (
            <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        )
    return (
        <div className="body-sign loading-overlay-showing" data-loading-overlay>
            <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>

        </div>
    )
}
export default React.memo(LoadingBounce);