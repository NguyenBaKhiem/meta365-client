import React from "react";
import "@Assets/css/loading-progress.css";

const LoadingProgress = (props) => {
  const { style, percent } = props;
  const p = parseInt(percent) || 0;
  return (
    <>
      <div style={style} className="progress-bar-bound">
        <div className="progress-bar-bound" />
        <div className="progress-bar progress-bar--info">
          <div
            className="progress-bar__bar"
            style={{ transform: `translateX(${percent}%)` }}
          />
          <div className="progress-bar__number">{p} %</div>
        </div>
      </div>
    </>
  );
};

export default React.memo(LoadingProgress);
