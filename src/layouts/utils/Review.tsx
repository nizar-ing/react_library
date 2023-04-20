import ReviewModel from "../../models/ReviewModel";
import { StarsReview } from "./StarsReview";

export const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
  const date = new Date(review.date);
  const dayOfMonth = date.getDate();
  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateYear = date.getFullYear();
  const dateRender = longMonth + " " + dayOfMonth + ", " + dateYear;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{review.userEmail}</h5>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview rating={review.rating} size={16} />
          </div>
        </div>
        <div className="mt-2">
          <p>{review.reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
