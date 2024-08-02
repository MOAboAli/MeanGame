import { Publisher } from './publisher.model';
import { Review } from './review.model';

export interface GameInterface {
    title: string;
    year: number;
    rate?: number;
    price?: number;
    minPlayers?: number;
    maxPlayers?: number;
    publisher?: Publisher;
    reviews?: Review[];
    minAge?: number;
    designers?: string[];
}

export class Game implements GameInterface {
    constructor(
        public title: string,
        public year: number,
        public rate?: number,
        public price?: number,
        public minPlayers?: number,
        public maxPlayers?: number,
        public publisher?: Publisher,
        public reviews?: Review[],
        public minAge?: number,
        public designers?: string[]
    ) { }
}