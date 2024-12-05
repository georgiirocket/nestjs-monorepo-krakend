import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { destination } from '@app/libs/constants';

/**
 * Disk storage
 */
export const storage = diskStorage({
  destination,
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    file.originalname = convertHexFileName(file.originalname, extension);

    cb(null, `${randomName}${extension}`);
  },
});

/**
 * Check is hex string
 * @param str
 */
function checkHexString(str: string): boolean {
  if (str.startsWith('0x') || str.startsWith('0X')) {
    str = str.slice(2); // Remove the "0x" part
  }

  const hexRegEx = /^[0-9A-Fa-f]+$/;

  return hexRegEx.test(str);
}

/**
 * Convert hex file name to utf-8
 */
function convertHexFileName(originalName: string, extension: string): string {
  try {
    const baseName = basename(originalName, extension);

    if (!checkHexString(baseName)) {
      return originalName;
    }

    const nameFile = Buffer.from(baseName, 'hex').toString('utf-8');

    return nameFile + extension;
  } catch {
    return originalName;
  }
}
