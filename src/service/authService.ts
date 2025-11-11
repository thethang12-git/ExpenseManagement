export type AuthUser = {
  username: string;
  password: string;
};


const USERS_KEY = "app_users";
const CURRENT_USER_KEY = "current_user";


function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}


function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const authService = {

  getUsers(): AuthUser[] {
    return readJson<AuthUser[]>(USERS_KEY, []);
  },

 
  saveUser(user: AuthUser): void {
    const users = this.getUsers();
    users.push(user);
    writeJson(USERS_KEY, users);
  },

  findUser(username: string, password: string): AuthUser | undefined {
    const users = this.getUsers();
    return users.find(
      (u) => u.username === username && u.password === password
    );
  },

 
  setCurrentUser(user: AuthUser): void {
    writeJson(CURRENT_USER_KEY, user);
  },


  getCurrentUser(): AuthUser | null {
    return readJson<AuthUser | null>(CURRENT_USER_KEY, null);
  },


  logout(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(CURRENT_USER_KEY);
  },
};



