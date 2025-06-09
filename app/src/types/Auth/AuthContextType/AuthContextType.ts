import User from "../../User/User";

export default interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    username?: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    email: string,
    password: string,
    name?: string,
    username?: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
