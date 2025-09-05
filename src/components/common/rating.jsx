import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function StarRating({ rating, handleRatingChange }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          color={star <= rating ? "warning" : "default"}
          size="large"
        >
          {star <= rating ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </>
  );
}

export default StarRating;
