import { string } from "@hapi/joi"
import { IsString } from "class-validator";

export class ApiKeyDTO {
    @IsString()
    'x-api-key': string;
}
