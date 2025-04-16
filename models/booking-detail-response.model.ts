import { serializable, deserialize } from "serializr";

export class BookingDetailResponse {
    @serializable
    public id!: number;

    @serializable
    public name!: string;

    @serializable
    public email!: string;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(BookingDetailResponse, input));
    }

}
