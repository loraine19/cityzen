export class Address {
    id: number = 0;
    address: string = '';
    zipcode: string = '';
    city: string = '';
    lat: number = 0;
    lng: number = 0;
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
    constructor(data?: Partial<Address>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}