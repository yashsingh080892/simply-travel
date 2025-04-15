import { serializable, deserialize } from "serializr";

export class BookingDetailResponse {
    @serializable
    public id!: number;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(BookingDetailResponse, input));
    }

}
