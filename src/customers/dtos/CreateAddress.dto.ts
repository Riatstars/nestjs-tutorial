import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    line1: string;

    line2: string;

    @IsNotEmpty()
    zip: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    
}