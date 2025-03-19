import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'DNI es requerido' })
  dni: string;

  @IsString()
  @IsNotEmpty({ message: 'Nombre es requerido' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Apellido es requerido' })
  last_name: string;

  @IsEmail({}, { message: 'Email no es válido' })
  @IsNotEmpty({ message: 'Email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password es requerido' })
  password: string;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Posición debe ser un número' })
  @IsNotEmpty({ message: 'Posición es requerida' })
  position_id: number;

  @IsNumber({}, { message: 'Salario debe ser un número' })
  @Transform(({ value }) => parseFloat(value)) // Convierte de string a number
  @IsNotEmpty({ message: 'Salario es requerido' })
  salary: number;

  @IsIn(['A', 'I'], { message: "Status must be 'A' or 'I'" })
  @IsNotEmpty({ message: 'Estado es requerido' })
  status?: 'A' | 'I';
}
