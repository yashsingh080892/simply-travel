import { deserialize, serializable } from "serializr";

export class Cities {
    @serializable
    public id!: number;
    @serializable
    public name!: string;
    @serializable
    public countryName!: string;
    @serializable
    public airportName!: string;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Cities, input));
    }
}
