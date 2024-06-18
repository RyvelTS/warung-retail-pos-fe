export class Permission {
    constructor(
        public resource: string,
        public actions: string[]
    ) { }
}