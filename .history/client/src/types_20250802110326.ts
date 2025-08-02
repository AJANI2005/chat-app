export interface User{
  id: string;
  name: string;
  password: string;
  loggedIn?: boolean | false;
}
export interface Message{
  id: string;
  text: string;
  userId: string;
}
export interface ChatRoom{
  id: string;
  userIds: string[]; //ids
  messages: Message[];
}

