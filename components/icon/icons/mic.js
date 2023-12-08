import React from "react";
import classNames from "classnames";

function Icon({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="24"
      fill="none"
      viewBox="0 0 19 24"
      className={classNames({ "svg-fill-toggle": fill })}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.989 10.665a.57.57 0 01.647.483 8.2 8.2 0 0016.228 0 .57.57 0 111.13.164 9.341 9.341 0 01-8.673 7.979v3.838a.57.57 0 01-1.142 0v-3.838a9.342 9.342 0 01-8.673-7.98.57.57 0 01.483-.646z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.751 1.209a3.758 3.758 0 00-3.758 3.758v5.01a3.758 3.758 0 107.516 0v-5.01A3.758 3.758 0 009.75 1.209z"
      ></path>
    </svg>
  );
}

export default Icon;
