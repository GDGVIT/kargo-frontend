"use client";

import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loop cubes">
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 20, 40, 0.85); // dark bluish overlay
  opacity: 0;
  animation: fadeIn 0.4s ease-in forwards;
  padding: 0.5rem; // Responsive padding for small screens

  @media (max-width: 640px) {
    padding: 0.5rem;
    .loop {
      transform: scale(0.7) rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }

  .cubes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
  }

  .loop {
    transform: rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
  }

  @keyframes s {
    to {
      transform: scale3d(0.2, 0.2, 0.2);
    }
  }

  .item {
    margin: -1.5625em;
    width: 3.125em;
    height: 3.125em;
    transform-origin: 50% 50% -1.5625em;
    box-shadow: 0 0 0.125em currentColor;
    background: currentColor;
    animation: s 0.6s cubic-bezier(0.45, 0.03, 0.51, 0.95) infinite alternate;
  }

  .item:before,
  .item:after {
    position: absolute;
    width: inherit;
    height: inherit;
    transform-origin: 0 100%;
    box-shadow: inherit;
    background: currentColor;
    content: "";
  }

  .item:before {
    bottom: 100%;
    transform: rotateX(90deg);
  }

  .item:after {
    left: 100%;
    transform: rotateY(90deg);
  }

  .item:nth-child(1) {
    margin-top: 6.25em;
    color: #1e3a8a; // dark blue
    animation-delay: -1.2s;
  }

  .item:nth-child(1):before {
    color: #2563eb; // blue-600
  }

  .item:nth-child(1):after {
    color: #3b82f6; // blue-500
  }

  .item:nth-child(2) {
    margin-top: 3.125em;
    color: #2563eb; // blue-600
    animation-delay: -1s;
  }

  .item:nth-child(2):before {
    color: #60a5fa; // blue-400
  }

  .item:nth-child(2):after {
    color: #38bdf8; // sky-400
  }

  .item:nth-child(3) {
    margin-top: 0em;
    color: #3b82f6; // blue-500
    animation-delay: -0.8s;
  }

  .item:nth-child(3):before {
    color: #0ea5e9; // sky-500
  }

  .item:nth-child(3):after {
    color: #06b6d4; // cyan-500
  }

  .item:nth-child(4) {
    margin-top: -3.125em;
    color: #0ea5e9; // sky-500
    animation-delay: -0.6s;
  }

  .item:nth-child(4):before {
    color: #38bdf8; // sky-400
  }

  .item:nth-child(4):after {
    color: #67e8f9; // cyan-300
  }

  .item:nth-child(5) {
    margin-top: -6.25em;
    color: #06b6d4; // cyan-500
    animation-delay: -0.4s;
  }

  .item:nth-child(5):before {
    color: #22d3ee; // cyan-400
  }

  .item:nth-child(5):after {
    color: #67e8f9; // cyan-300
  }

  .item:nth-child(6) {
    margin-top: -9.375em;
    color: #0e7490; // cyan-700
    animation-delay: -0.2s;
  }

  .item:nth-child(6):before {
    color: #0891b2; // cyan-600
  }

  .item:nth-child(6):after {
    color: #22d3ee; // cyan-400
  }
`;

export default Loader;
