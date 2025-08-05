import fs from 'fs';
import path from 'path';

export const deleteUploadedFile = (filename) => {
  if (!filename) return;

  const filePath = path.join(process.cwd(), 'public', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err.message);
    }
  });
};