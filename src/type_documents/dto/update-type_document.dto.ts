import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDocumentDto } from './create-type_document.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
