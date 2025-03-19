import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
