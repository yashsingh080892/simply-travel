import { deserialize, serializable } from "serializr";

export class PaymentDetails {

    deserialize(input: any): this {
        return Object.assign(this, deserialize(PaymentDetails, input));
    }
}
