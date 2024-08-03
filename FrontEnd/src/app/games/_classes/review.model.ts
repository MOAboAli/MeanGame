export interface ReviewInterface {
    title?: string;
    rating?: number;
    review?: string;
    postDate?: Date;
}

export class Review implements ReviewInterface {
    constructor(
        public _id?: string,
        public title?: string,
        public rating?: number,
        public review?: string,
        public postDate?: Date
    ) { }
}