import ReactSlider from "react-slider";
import styled from "styled-components";

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

const Thumb = (props: any, state: any) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div<{ index: number }>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#0f0" : "#ddd"};
  border-radius: 999px;
`;

const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);

const RangeSlider = (props: any) => {
  return (
    <StyledSlider
      defaultValue={props.defaultValue}
      renderTrack={Track}
      renderThumb={Thumb}
    />
  );
};

export default RangeSlider;
