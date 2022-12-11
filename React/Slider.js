import styled from 'styled-components';
import ReactSlider from 'react-slider'

import React from 'react'

function Slider({ defaultValue, onChange, min, max, value }) {
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
    return (<StyledThumb {...props}>{state.valueNow}</StyledThumb>)

  };

  const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? '#55E4B3' : '#ddd')};
    border-radius: 999px;
`;

  const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
  return (
    <div><StyledSlider defaultValue={defaultValue} value={value} renderTrack={Track} renderThumb={Thumb} min={min} max={max}
      onChange={onChange}
    />
    </div>
  )
}

export default Slider