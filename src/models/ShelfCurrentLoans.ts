import BookModel from "./BookModel";

class ShelfCurrentLoans {
    constructor(public book: BookModel, public daysLeft: number) {}
}

export default ShelfCurrentLoans;