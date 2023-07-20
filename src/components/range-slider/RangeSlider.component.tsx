import ReactSlider from "react-slider";
import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
  /* width: 100%; */
  height: 12px;
  display: flex;
  align-items: center;
`;

const StyledThumb = styled.div`
  height: 26px;
  line-height: 26px;
  width: 26px;
  text-align: center;
  background-color: var(--surface);
  color: var(--on-surface);
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
    props.index === 2
      ? "var(--primary)"
      : props.index === 1
      ? "var(--primary-container)"
      : "var(--primary)"};
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
