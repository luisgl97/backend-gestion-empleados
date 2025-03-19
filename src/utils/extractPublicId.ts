export function extractPublicId(url: string): string {
    const parts = url.split('/');
    const fileNameWithExtension = parts[parts.length - 1]; // Obtiene el nombre del archivo con extensión
    const folderPath = parts.slice(parts.indexOf('employees')).join('/'); // Obtiene la ruta completa desde "employees"
    return folderPath.replace(/\.[^/.]+$/, ''); // Elimina la extensión del archivo
  }