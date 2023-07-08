export interface MessageModel {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}
export interface ContractMessage {
  content: string;
  created: string;
  id: string;
  isDeleted: boolean;
  sender: string;
}
export interface ContractUser {
  active: boolean;
  created: string;
  name: string;
  wallet: string;
}

export interface contractMessageListModel {
  message: ContractMessage;
  user: ContractUser;
}
