export const resizeImage = (
  base64Str: string,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.8
): Promise<string> => {
  // Return original if it's not a valid data URL
  if (!base64Str || !base64Str.startsWith('data:image')) {
    return Promise.resolve(base64Str);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback to original if canvas context is not available
        return resolve(base64Str);
      }

      ctx.drawImage(img, 0, 0, width, height);
      // Use image/jpeg for better compression of photographic images.
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      // Fallback to original string if there's an error loading the image
      resolve(base64Str);
    };
  });
};
