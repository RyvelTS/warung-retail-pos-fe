export class Response {
    constructor(
        public type: 'success' | 'warning' | 'danger' | 'info',
        public message: string,
        public status: number,
        public data: any
    ) { }
}
