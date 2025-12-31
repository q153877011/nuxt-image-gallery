/**
 * Encode image index for URL usage
 */
export function encodeImageSlug (index: number | string): string {
  return String(index)
}

/**
 * Decode URL slug back to image index
 */
export function decodeImageSlug (slug: string): number {
  const index = parseInt(slug, 10)
  return isNaN(index) ? -1 : index
}

/**
 * Check if image index matches slug
 */
export function isImageMatch (imageId: string, slug: string): boolean {
  return imageId === slug
}
