import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import { colors } from "../../theme/colors";

const StyledForbidden = styled.div`
  background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  color: white;
  font-family: "Bungee", cursive;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 40px;
    line-height: 50px;
    margin-bottom: 30px;
  }
  a {
    color: #2aa7cc;
    text-decoration: none;
  }
  a:hover {
    color: white;
  }
  svg {
    width: 50vw;
  }
  .lightblue {
    fill: #0b163f;
  }
  .eye {
    cx: calc(115px + 30px * var(--mouse-x));
    cy: calc(50px + 30px * var(--mouse-y));
  }
  #eye-wrap {
    overflow: hidden;
  }
  .error-text {
    font-size: 120px;
  }
  .alarm {
    animation: alarmOn 0.5s infinite;
  }

  @keyframes alarmOn {
    to {
      fill: darkred;
    }
  }
`;

export default function Forbidden(props) {
  useEffect(() => {
    var root = document.documentElement;
    var eyef = document.getElementById("eyef");
    var cx = document.getElementById("eyef").getAttribute("cx");
    var cy = document.getElementById("eyef").getAttribute("cy");
    root.style.setProperty("--mouse-x", 0.5);
    root.style.setProperty("--mouse-y", 0.5);
    document.addEventListener("mousemove", (evt) => {
      let x = evt.clientX / window.innerWidth;
      let y = evt.clientY / window.innerHeight;
      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);

      cx = 115 + 30 * x;
      cy = 50 + 30 * y;
      eyef.setAttribute("cx", cx);
      eyef.setAttribute("cy", cy);
    });

    document.addEventListener("touchmove", (touchHandler) => {
      let x = touchHandler.touches[0].clientX / window.innerWidth;
      let y = touchHandler.touches[0].clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);
    });
    return ()=>{
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("touchmove", () => {});
    }
  }, []);
  return (
    <StyledForbidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
      >
        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />{" "}
          </clipPath>
          <text id="text-s" className="error-text" y="106">
            {props.text}
          </text>
        </defs>
        <path
          className="alarm"
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="#0B163F"></use>
        <use xlinkHref="#text-s" fill="#2C375B"></use>
        <g id="robot">
          <g id="eye-wrap">
            <use xlinkHref="#white-eye"></use>
            <circle
              id="eyef"
              className="eye"
              clipPath="url(#white-clip)"
              fill="#000"
              stroke="#2aa7cc"
              strokeWidth="2"
              strokeMiterlimit="10"
              cx="130"
              cy="65"
              r="11"
            />
            <ellipse
              id="white-eye"
              fill="#2C375B"
              cx="130"
              cy="40"
              rx="18"
              ry="12"
            />
          </g>
          <circle
            className="lightblue"
            cx="105"
            cy="32"
            r="2.5"
            id="tornillo"
          />
          <use xlinkHref="#tornillo" x="50"></use>
          <use xlinkHref="#tornillo" x="50" y="60"></use>
          <use xlinkHref="#tornillo" y="60"></use>
        </g>
      </svg>
      <h1>
        {props.text === "403" ? <>Access forbidden!</> : <>Page not found!</>}
      </h1>
      <Link to="/">
        <Button color={colors.new_button}>Go to Homepage</Button>
      </Link>
    </StyledForbidden>
  );
}
