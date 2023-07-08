import { MessageModel, contractMessageListModel } from "@/contract";

export const contractMessagesToMessageModelMap = (
  userWallet: string,
  list: contractMessageListModel[]
): MessageModel[] => {
  return list.map((element) => {
    return {
      id: Number(element.message.id),
      user: element.user.name,
      text: element.message.content,
      time: element.message.created,
      isMe: userWallet === element.user.wallet,
    };
  });
};
