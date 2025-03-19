import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDocumentDto {

    @IsString()
    employee_id: number;
    
    @IsNumber()
    type_document_id: number;
    
    @IsString()
    file_path: string;
}
