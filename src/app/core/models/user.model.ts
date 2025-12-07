export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user'; // Define los roles que maneja tu aplicación
}

