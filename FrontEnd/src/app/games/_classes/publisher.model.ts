export interface PublisherInterface {
    name?: string;
    location?: {
        coordinates?: number[];
    };
    country?: string;
    established?: number;
}

export class Publisher implements PublisherInterface {
    constructor(
        public name?: string,
        public location?: { coordinates?: number[] },
        public country?: string,
        public established?: number
    ) { }
}