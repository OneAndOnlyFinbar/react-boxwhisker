import React from "react";
import "../styles/index.css";

// Finds median of sorted array.
const median = (data) => {
  const length = data.length;
  if (length % 2 === 0) {
    return (data[length / 2] + data[length / 2 - 1]) / 2;
  } else {
    return data[Math.floor(length / 2)];
  }
};

// Calculates necessary statistics for box plot given unsorted list of numbers.
const calculateStats = (data) => {
  const sorted = [...data].sort((a, b) => a - b); // don't mutate original array

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const med = median(sorted);

  let lowerHalf, upperHalf;

  if (sorted.length % 2 === 0) {
    // even length
    lowerHalf = sorted.slice(0, sorted.length / 2);
    upperHalf = sorted.slice(sorted.length / 2);
  } else {
    // odd length (exclude median)
    lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    upperHalf = sorted.slice(Math.floor(sorted.length / 2) + 1);
  }

  const q1 = median(lowerHalf);
  const q3 = median(upperHalf);

  return { min, q1, median: med, q3, max };
};

const BoxWhiskerPlot = ({ series, ...props }) => {
  let maximumWidth = 300;

  let graphMinimumRange = 0, graphMaximumRange = 20;

  let height = 0;

  // Bottom gutter/axis/ticks
  height += 30;

  // Axis
  const seriesHeight = 30;
  height += series.length * seriesHeight;

  let gutterWidth = 10;
  let boxplotWidth = maximumWidth - 2 * gutterWidth;

  let tickCount = 10;
  let tickDistance = boxplotWidth / tickCount;
  let tickCoordinates = Array.from({ length: tickCount }, (_, i) => i + 3).map((_, i) => i * tickDistance + gutterWidth);

  return (
    <div>
      <svg width={maximumWidth} height={height} xmlns="http://www.w3.org/2000/svg">
        {series.map((series, seriesIndex) => {
          const { min, max } = calculateStats(series.data);
          return (
            <line
              x1={gutterWidth + min * tickDistance}
              x2={gutterWidth + max * tickDistance}
              y1={seriesIndex * seriesHeight + 15}
              y2={seriesIndex * seriesHeight + 15}
              stroke="black"
              strokeWidth={2}
            />
          );
        })}

        {/* Key horizontal line */}
        <line
          x1={gutterWidth}
          x2={boxplotWidth + gutterWidth}
          y1={height - 20}
          y2={height - 20}
          stroke="#3b3b3b"
          strokeWidth={2}
        />

        {/* Key tick marks */}
        {tickCoordinates.map((x, i) => {
          const isFirstTick = i === 0;
          const isLastTick = i === tickCoordinates.length - 1;

          const tickXOffset =
            isFirstTick
              ? 1
              : isLastTick
                ? -1
                : 0;

          return (
            <g
              key={i}
            >
              <line
                x1={x + tickXOffset}
                x2={x + tickXOffset}
                y1={height - 25}
                y2={height - 15}
                stroke="#3b3b3b"
                strokeWidth={2}
              />
              <text
                x={x}
                y={height}
                fill="#3b3b3b"
                fontSize="12"
                textAnchor="middle"
              >
                {Math.floor((x / tickDistance))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BoxWhiskerPlot;