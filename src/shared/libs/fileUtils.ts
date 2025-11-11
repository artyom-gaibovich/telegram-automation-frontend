import type { UploadFile } from 'antd/lib';
import { type FileStorage, fileStorageUtils } from '@entities/file';

const formatFileSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 Б';
  }

  const kilo = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const int = Math.floor(Math.log(bytes) / Math.log(kilo));

  const value = bytes / kilo ** int;

  if (Number.isInteger(value)) {
    return `${value} ${sizes[int]}`;
  }

  // Иначе показывать до 2 знаков после запятой
  return `${value.toFixed(2)} ${sizes[int]}`;
};

const getFileExtension = (fileName: string): string => {
  return '.' + fileName.split('.').pop()?.toLowerCase() || '';
};

const getExtensionMimeType = (extension: string): string => {
  switch (extension.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.pdf':
      return 'application/pdf';
    case '.doc':
      return 'application/msword';
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    default:
      return extension;
  }
};

const formatInfoToClient = (fileInfo: FileStorage.ItemInfo): UploadFile => {
  return {
    uid: fileInfo.id,
    name: fileInfo.fileName,
    url: fileStorageUtils.getUrl(fileInfo.id, true),
    status: 'done',
    response: fileInfo,
  };
};

export const fileUtils = {
  formatFileSize,
  getFileExtension,
  getExtensionMimeType,
  formatInfoToClient,
};
