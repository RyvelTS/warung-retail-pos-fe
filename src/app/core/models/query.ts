export class Query {
    constructor(
        public page: number = 1,
        public perPage?: number,
        public search?: {
            field: string,
            keyword: string
        },
        public sort?: {
            field: string,
            direction: 'asc' | 'desc'
        }
    ) { }
}