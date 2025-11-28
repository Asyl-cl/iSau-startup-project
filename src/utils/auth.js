import { simpleHash, compareHash } from './simpleHash';

const SECRET_KEY = 'isau-medical-platform-secret-key-2025';

// Простое JWT кодирование/декодирование (для демо)
const encodeJWT = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(SECRET_KEY);
  return `${header}.${encodedPayload}.${signature}`;
};

const decodeJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

// Хранение пользователей в localStorage (в реальном приложении - база данных)
export const getUsers = () => {
  const users = localStorage.getItem('isau_users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem('isau_users', JSON.stringify(users));
};

// Регистрация
export const register = async (email, password, fullName) => {
  const users = getUsers();
  
  // Проверка существующего пользователя
  if (users.find(u => u.email === email)) {
    throw new Error('Бұл электрондық пошта бойынша тіркелген пайдаланушы бар');
  }
  
  // Хэширование пароля
  const hashedPassword = await simpleHash(password);
  
  // Создание нового пользователя
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    fullName,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Создание токена
  const token = encodeJWT({
    userId: newUser.id,
    email: newUser.email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 дней
  });
  
  return { token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName } };
};

// Вход
export const login = async (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Қате электрондық пошта немесе құпия сөз');
  }
  
  // Проверка пароля
  const isValidPassword = await compareHash(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Қате электрондық пошта немесе құпия сөз');
  }
  
  // Создание токена
  const token = encodeJWT({
    userId: user.id,
    email: user.email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 дней
  });
  
  return { token, user: { id: user.id, email: user.email, fullName: user.fullName } };
};

// Проверка токена
export const verifyToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return null;
    
    // Проверка срока действия
    if (decoded.exp && decoded.exp < Date.now()) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
};

// Получение текущего пользователя
export const getCurrentUser = () => {
  const token = localStorage.getItem('isau_token');
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const users = getUsers();
  const user = users.find(u => u.id === decoded.userId);
  
  if (!user) return null;
  
  return { id: user.id, email: user.email, fullName: user.fullName };
};

// Выход
export const logout = () => {
  localStorage.removeItem('isau_token');
};

// Сохранение токена
export const setToken = (token) => {
  localStorage.setItem('isau_token', token);
};

// Получение токена
export const getToken = () => {
  return localStorage.getItem('isau_token');
};

// Проверка авторизации
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  const decoded = verifyToken(token);
  return decoded !== null;
};

