import React, { useEffect, useState } from "react";
import "./ProgressLine.css";

const ProgressLine = ({
  label,
  backgroundColor = "#e5e5e5",
  // expected format for visual parts
  visualParts = [
    {
      percentage: "0%",
      color: "white"
    }
  ]
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        visualParts.map(item => {
          return item.percentage;
        })
      );
    });
  }, [visualParts]);

  return (
    <>
     { label && <div className="progressLabel">{label}</div>}
      <div
        className="progressVisualFull"
        // to change the background color dynamically
        style={{
          backgroundColor
        }}
      >
        {visualParts.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: widths[index],
                // setting the actual color of bar part
                backgroundColor: item.color
              }}
              className={"progressVisualPart"}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProgressLine;
//!  FOR MORE INFO ABOUT THIS COMPONENT VISIT THIS LINK https://codesandbox.io/s/react-animated-progress-bar-rh3rz?file=/src
//TODO: CALL THIS COMPONENT IN THE PARENT COMPONENT

//  <ProgressLine
//    label=""
//    backgroundColor="#90ADA9"
//    visualParts={[
//      {
//        percentage: "100%",
//        color: "#F37468",
//      },
//    ]}
//  />;