import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDynamicDocumentsPipe implements PipeTransform {
  transform(value: any) {
    const allowedPattern = /^documento_\d+$/; // Patrón para "documento_1", "documento_2", etc.

    // Validar las llaves dinámicas
    Object.keys(value).forEach((key) => {
      // Si la llave comienza con "documento_" pero no sigue el patrón, eliminarla
      if (key.startsWith('document_') && !allowedPattern.test(key)) {
        delete value[key];
      }

      // Si la llave comienza con "documento_" pero su valor no es un string, lanzar un error
      if (key.startsWith('document_') && typeof value[key] !== 'string') {
        throw new BadRequestException(
          `El valor de ${key} debe ser un string.`,
        );
      }
    });

    return value; // Retornar el objeto filtrado
  }
}