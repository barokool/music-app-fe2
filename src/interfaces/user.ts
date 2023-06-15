export interface User {
  email: string;
  password?: string;
  name: string;
  id: string;
}

export interface LoginUserDto extends Exclude<User, "name id"> {}

export interface RegisterUserDto extends Partial<User> {}
