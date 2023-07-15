import { MessageModel, contractMessageListModel } from "@/contract";

function convertUnixToDate(unixTimestamp: string): string {
  const milliseconds = Number(unixTimestamp) * 1000;
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleString(); // O puedes utilizar otros métodos como toDateString() o toISOString()
  return formattedDate;
}

export const contractMessagesToMessageModelMap = (
  userWallet: string,
  list: contractMessageListModel[]
): MessageModel[] => {
  return list.map((element) => {
    return {
      id: Number(element.message.id),
      user: element.user.name,
      text: element.message.content,
      time: convertUnixToDate(element.message.created),
      isMe: userWallet === element.user.wallet,
    };
  });
};
