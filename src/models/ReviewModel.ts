class ReviewModel {
  constructor(
    public id: number,
    public userEmail: string,
    public date: string,
    public rating: number,
    public book_id: string,
    public reviewDescription?: string
  ) {}
}

export default ReviewModel;
