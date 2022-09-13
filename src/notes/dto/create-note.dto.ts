import { IsNotEmpty, MinLength } from "class-validator";

export class CreateNoteDto {

    @IsNotEmpty()
    @MinLength(4)
    title: string;

    @IsNotEmpty()
    @MinLength(10)
    content: string;

    archived: boolean;
}