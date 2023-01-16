import styled from "styled-components";
import ReactSlider from "react-slider";

import React from "react";

function Slider({
  defaultValue,
  onChange,
  min,
  max,
  value,
  filledColor,
  unFilledColor,
  disabled,
  onBeforeChange,
  onAfterChange,
  marks,
  ImageThumbSrc,
  noThumb
}) {
  const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
  `;

  const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
  `;

  const Thumb = (props, state) => {
    return ImageThumbSrc === "noThumb" ? (
      <div {...props}></div>
    ) : ImageThumbSrc ? (
      <div {...props}>
        <img src={ImageThumbSrc} alt="Thumb" width="40px" height="40px" />
      </div>
    ) : (
      <StyledThumb {...props}>{state.valueNow}</StyledThumb>
    );
  };

  const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props) =>
      props.index === 2
        ? "#ddd"
        : props.index === 1
        ? unFilledColor
          ? unFilledColor
          : "#ddd"
        : filledColor
        ? filledColor
        : "#ddd"};
    border-radius: 999px;
  `;

  const Track = (props, state) => (
    <StyledTrack {...props} index={state.index} />
  );
  return (
    <div>
      <StyledSlider
        defaultValue={defaultValue}
        value={value}
        renderTrack={Track}
        renderThumb={Thumb}
        min={min}
        max={max}
        onChange={onChange}
        disabled={disabled}
        onAfterChange={onAfterChange}
        onBeforeChange={onBeforeChange}
        marks={marks}
      />
    </div>
  );
}

export default Slider;

//**TODO CALLING WAY*/
{/* <Slider
value={q1}
min={0}
max={100}
onChange={(e) => {
  setq1(e);
}}
defaultValue=[1,56]
filledColor="rgba(239, 91, 12, 1)"
unFilledColor="rgba(239, 91, 12, 1)"

/> */}
