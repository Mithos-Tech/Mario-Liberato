/**
 * Utilidades para optimización dinámica de imágenes y recursos Cloudinary
 * Cumple con Directrices de Rendimiento Móvil (f_auto, q_auto, srcset y sizes escalados)
 */

/**
 * Inserta transformaciones f_auto, q_auto y ancho opcional en una URL de Cloudinary
 */
export function getOptimizedCloudinaryUrl(url?: string, width?: number): string {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('res.cloudinary.com')) return url;

  // Si ya tiene f_auto,q_auto, reemplazar si se pide ancho específico
  if (url.includes('/upload/f_auto,q_auto')) {
    if (width) {
      return url.replace('/upload/f_auto,q_auto', `/upload/f_auto,q_auto,w_${width}`);
    }
    return url;
  }

  const transform = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
  return url.replace('/upload/', `/upload/${transform}/`);
}

/**
 * Genera el atributo srcset con anchos escalados para entregar imágenes óptimas según la pantalla móvil/desktop
 */
export function getCloudinarySrcSet(url?: string, widths: number[] = [400, 720, 1100]): string {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return '';
  return widths.map((w) => `${getOptimizedCloudinaryUrl(url, w)} ${w}w`).join(', ');
}
