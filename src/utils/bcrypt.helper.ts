import * as bcrypt from 'bcrypt';

export class BcryptHelper {
  // Encripta una contraseña
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas para generar el hash
    return await bcrypt.hash(password, saltRounds);
  }

  // Compara una contraseña con un hash
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}