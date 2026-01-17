export const normalizeChannels = (value: unknown): string[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .flatMap((v) => {
        if (typeof v === 'string') {
          try {
            // если вдруг это JSON-строка
            const parsed = JSON.parse(v);
            return Array.isArray(parsed) ? parsed : [v];
          } catch {
            return [v];
          }
        }
        return [];
      })
      .filter(Boolean);
  }

  return [];
};
