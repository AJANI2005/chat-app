export interface User{
  id: string;
  name: string;
  password: string;
  loggedIn?: boolean | false;
}
export interface Message{
  id: string;
  text: string;
  userId: number;
}
export interface ChatRoom{
  id: string;
  userIds: number[]; //ids
  messages: Message[];
}

