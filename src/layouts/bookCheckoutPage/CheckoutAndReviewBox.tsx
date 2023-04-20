import {Link} from "react-router-dom";
import BookModel from "../../models/BookModel";
import {LeaveAReview} from "../utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined,
    mobile: boolean,
    currentLoansCount: number,
    isAuthenticated: any,
    isCheckedOut: boolean,
    checkoutBook: Function,
    submitReview: Function,
    isReviewLeft: boolean
}> = ({book, mobile, currentLoansCount, isAuthenticated, isCheckedOut, checkoutBook, submitReview, isReviewLeft}) => {
    const buttonRender = () => {
        if (isAuthenticated) {
            if (!isCheckedOut && currentLoansCount < 5) {
                return (
                    <button className='btn btn-success btn-lg mt-2' onClick={() => checkoutBook()}>Checkout</button>);
            } else if (isCheckedOut) {
                return (<p className='mt-2'><b>Book checked out. Enjoy!</b></p>);
            } else if (!isCheckedOut) {
                return (<p className="text-danger mt-2">Too many books checked out.</p>)
            }
        }
        return (<Link className='btn btn-success btn-lg mt-2' to='/login'>Sign in</Link>);
    };

    const reviewRender = () => {
        if (isAuthenticated && !isReviewLeft) {
            return (<LeaveAReview submitReview={submitReview} />)
        } else if (isAuthenticated && isReviewLeft) {
            return (<p><b>Thank you for your review!</b></p>)
        }
        return (<div>
            <hr/>
            <p>Sign in to be able to leave a review.</p>
        </div>);
    };

    return (
        <div
            className={
                mobile ? "card d-flex mt-5" : "container card d-flex col-3 mb-5"
            }
        >
            <div className="container card-body">
                <div className="mt-3">
                    <p>
                        <b>{currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr/>
                    {book && book.copiesAvailable && book.copiesAvailable > 0 ? (
                        <h4 className="text-success">Available</h4>
                    ) : (
                        <h4 className="text-danger">Wait List</h4>
                    )}
                    <div className="row">
                        <div className="col-6 lead">
                            <b>{book?.copies} </b>
                            copies
                        </div>
                        <div className="col-6 lead">
                            <b>{book?.copiesAvailable} </b>
                            available
                        </div>
                    </div>
                    {buttonRender()}
                    <hr/>
                    <p className="mt-3">
                        This number can be change until placing order has been complete.
                    </p>
                  { reviewRender() }
                </div>
            </div>
        </div>
    );
};
