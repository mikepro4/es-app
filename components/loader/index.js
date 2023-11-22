import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

const Loader = (props) => {

        return (
            <div 
                className={classNames({
                    "loader-wrapper": true,
                    "big": props.big,
                  })}
            >
                <div
                    className="loader-container"
                >

                    <div className="ellipse-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="3"
                            height="3"
                            fill="none"
                            viewBox="0 0 3 3"
                        >
                            <circle cx="1.5" cy="1.5" r="0.5" ></circle>
                        </svg>


                    </div>
                    <div className="ellipse-left">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="21"
                            fill="none"
                            viewBox="0 0 22 21"
                        >
                            <path
                                stroke="#000"
                                strokeLinecap="round"
                                d="M19.961 19.563c-1.896 1.895-7.445-.58-12.395-5.53-4.95-4.95-7.426-10.5-5.53-12.396 1.896-1.895 7.445.58 12.395 5.53 4.95 4.95 7.426 10.5 5.53 12.395z"
                            ></path>
                        </svg>
                    </div>

                    <div className="ellipse-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="21"
                            fill="none"
                            viewBox="0 0 22 21"
                        >
                            <path
                                stroke="#000"
                                strokeLinecap="round"
                                d="M2.031 19.563c1.896 1.895 7.445-.58 12.395-5.53 4.95-4.95 7.426-10.5 5.53-12.396-1.895-1.895-7.445.58-12.395 5.53-4.95 4.95-7.426 10.5-5.53 12.395z"
                            ></path>
                        </svg>
                    </div>

                </div>
            </div>
        )
}

export default Loader;
