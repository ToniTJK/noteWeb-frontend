export class Note {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public createdAt: string,
        public user: string
    ){}
}