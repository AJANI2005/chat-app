export interface User{
  id: string;
  name: string;
  password: string;
}
export interface Message{
  id: string;
  text: string;
  user: User;
}
export interface ChatRoom{
  id: string;
  users: User[];
  messages: Message[];
}

