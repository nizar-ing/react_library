class HistoryModel {

    constructor(
        public id: number,
        public userEmail: string,
        public checkoutDate: string,
        public returnedDate: string,
        public title: string,
        public author: string,
        public description: string,
        public img: string
        ) {}
}

export default HistoryModel;