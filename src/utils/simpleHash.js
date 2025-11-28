// Простое хэширование для демо (в реальном проекте используйте backend)
export const simpleHash = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return '$2a$10$' + hashHex.substring(0, 53); // Формат похожий на bcrypt
};

export const compareHash = async (password, hash) => {
  const newHash = await simpleHash(password);
  return newHash === hash;
};

