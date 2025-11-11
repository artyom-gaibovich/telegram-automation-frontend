import { API_SERVICE_BASE_URL } from '@shared/services/ApiService';

const getUrl = (fileId: string, inline?: boolean) => {
  return (
    `${API_SERVICE_BASE_URL}/file/${fileId}` + (inline ? '?inline=true' : '')
  );
};

export const fileStorageUtils = {
  getUrl,
};
