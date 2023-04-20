import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { Review } from "../utils/Review";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}> = ({ reviews, bookId, mobile }) => {
  return (
    <div className={mobile ? "mt-3" : "row mt-5"}>
      <div className={mobile ? "" : "col-sm-2 col-md-2"}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className={mobile ? "" : "col-sm-10 col-md-10"}>
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <Review review={review} key={review.id} />
            ))}
            <div className="m-3">
              <Link
                type="button"
                className="btn btn-md main-color text-white"
                to={`/reviewlist/${bookId}`}
              >
                Reach all reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">
              Currently there are no reviews for this book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
