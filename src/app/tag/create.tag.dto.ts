import { IsString, Length, MaxLength } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class CreateTagDTO {
    @IsString()
    userId: string;

    @IsString()
    @Trim()
    @Length(1, 30)
    name: string;

    @IsString()
    @MaxLength(200)
    context?: string;
}
