import { Permission } from "./permission";

export class Role {
    constructor(
        public id: string,
        public name: string,
        public permissions: Permission[]
    ) { }
}
