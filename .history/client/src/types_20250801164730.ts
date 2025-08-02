
interface User{
  id: string;
  name: string;
  password: string;
}
interface Message{
  id: string;
  text: string;
  user: User;
}
interface ChatRoom{
  id: string;
  users: User[];
  messages: Message[];
}

