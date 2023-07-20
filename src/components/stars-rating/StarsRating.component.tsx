import { MdStarRate } from "react-icons/md";

type StarsRatingProps = {
  ratingStars: string;
};

const StarsRating = ({ ratingStars }: StarsRatingProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <MdStarRate />
      <p>{ratingStars}</p>
    </div>
  );
};

export default StarsRating;
