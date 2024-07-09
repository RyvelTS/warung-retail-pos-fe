export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public isActive: boolean,
        public price: number,
        public sku: string,
        public stock: number,
    ) { }
}
