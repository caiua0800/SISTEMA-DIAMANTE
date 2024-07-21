import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressCircle = ({ percentage, color, hoverColor }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(percentage);
        }, 500); // Delay before starting the animation

        return () => clearTimeout(timeout);
    }, [percentage]);

    return (
        <CircleContainer hoverColor={hoverColor}>
            <Svg viewBox="0 0 36 36">
                <BackgroundPath
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <Path
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    strokeDasharray={`${progress}, 100`}
                    stroke={color}
                />
                <g>
                    <Text x="18" y="18" dy=".3em">
                        {`${percentage.toFixed(2)}%`}
                    </Text>
                </g>
            </Svg>
        </CircleContainer>
    );
};

const TwoCircles = ({ totalSpent, totalValue }) => {
    const spentPercentage = (totalValue && totalSpent) ? (totalSpent / totalValue) * 100 : 0;
    const profitPercentage = (totalValue && totalSpent) ? ((totalValue - totalSpent) / totalValue) * 100 : 0;

    const profitColor = profitPercentage >= 0 ? "#28a745" : "#dc3545"; // Green for profit, red for loss
    const profitHoverColor = profitPercentage >= 0 ? "#71dd8a" : "#ff7f7f"; // Lighter green or red for hover

    return (
        <ParentContainer>
            <ProgressCircle
                percentage={spentPercentage}
                color="#007bff"
                hoverColor="#71c2ff"
            />
            <ProgressCircle
                percentage={profitPercentage}
                color={profitColor}
                hoverColor={profitHoverColor}
            />
        </ParentContainer>
    );
};

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px; 
  z-index: 1;

  @media (max-width: 800px) {
    gap: 10px;
  }
`;

const CircleContainer = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:hover svg path {
    transition: stroke 0.3s ease;
    stroke: ${(props) => props.hoverColor};
  }

  @media (max-width: 800px) {
    width: 130px;
    height: 130px;
  }
`;

const Svg = styled.svg`
  transform: rotate(0deg);
  width: 180px;
  filter: drop-shadow(1px 1px 20px rgba(42, 255, 0, 0.2));
  height: 180px;

  @media (max-width: 800px) {
    width: 130px;
    height: 130px;
  }
`;

const BackgroundPath = styled.path`
  fill: none;
  stroke: #e6e6e6; // Cor neutra para o fundo
  stroke-width: 4.0; // Aumente este valor para aumentar a espessura
  stroke-linecap: round;
`;


const Path = styled.path`
  fill: none;
  stroke-width: 4.0; // Aumente este valor para aumentar a espessura
  // stroke-linecap: round;
  transition: stroke-dasharray 5s ease;
`;


const Text = styled.text`
  font-size: 0.3em;
  text-anchor: middle;
  dominant-baseline: middle;
  fill: #455d7a;
  font-weight: bold;
`;

export default TwoCircles;
