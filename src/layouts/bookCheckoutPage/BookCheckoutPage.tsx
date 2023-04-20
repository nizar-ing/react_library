import {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {StarsReview} from "../utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";
import {LatestReviews} from "./LatestReviews";
import {useOktaAuth} from "@okta/okta-react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
    const {authState} = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans Count State
    const [currentLoanCount, setCurrentLoanCount] = useState(0);
    const [isLoadingCurrentLoanCount, setIsLoadingCurrentLoanCount] = useState(true);

    // Is book Check Out?
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

    const bookId = window.location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const responseJson = await response.json();
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };
            setBook(loadedBook);
            setIsLoading(false);
            window.scrollTo(0, 0);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, [isCheckedOut]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error("Something went wrong !");
            }
            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews += responseData[key].rating;
            }
            if (loadedReviews) {
                const round = (
                    Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
                ).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };
        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReviewResponse = await fetch(url, requestOptions);
                if (!userReviewResponse.ok) throw new Error("Something went wrong.");
                const userReviewResponseJson = await userReviewResponse.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoanCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoanCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoanCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);

    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookid=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);
                if (!bookCheckedOut.ok) {
                    throw new Error('Something went wrong!');
                }
                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson);
            }
            setIsLoadingBookCheckedOut(false);
        };
        fetchUserCheckedOutBook().catch((error: any) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);
            setHttpError(error.message);
        });
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoanCount || isLoadingBookCheckedOut || isLoadingUserReview) {
        return <SpinnerLoading/>;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const checkoutBook = async () => {
        const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsCheckedOut(true);
    }

    const submitReview = async (starInput: number, reviewDescription: string) => {
        let bookId = book?.id ? book.id : 0;
        const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) throw new Error('Something went wrong!');
        setIsReviewLeft(true);

    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? (
                            <img src={book.img} width="226" height="349" alt="Book"/>
                        ) : (
                            <img
                                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                                width="226"
                                height="349"
                                alt="Book"
                            />
                        )}
                    </div>
                    <div className="container col-sm-4 col-md-4">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoanCount}
                                          isAuthenticated={authState?.isAuthenticated}
                                          isCheckedOut={isCheckedOut} isReviewLeft={isReviewLeft}
                                          checkoutBook={checkoutBook} submitReview={submitReview}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ? (
                        <img src={book.img} width="226" height="349" alt="Book"/>
                    ) : (
                        <img
                            src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                            width="226"
                            height="349"
                            alt="Book"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoanCount}
                                      isAuthenticated={authState?.isAuthenticated}
                                      isCheckedOut={isCheckedOut} isReviewLeft={isReviewLeft}
                                      checkoutBook={checkoutBook} submitReview={submitReview}/>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
};
