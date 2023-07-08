import Web3 from "web3";

export const getAccountAddress = async (provider: Web3): Promise<string> => {
  let accountAddress = "";
  try {
    const accounts = await provider.eth.getAccounts();
    if (accounts.length > 0) {
      accountAddress = accounts[0];
      return accountAddress;
    } else {
      return accountAddress;
    }
  } catch (error) {
    console.error("Error al obtener la dirección de la cuenta:", error);
    throw error;
  }
};

export async function connectToMetaMask(): Promise<Web3 | undefined> {
  return new Promise<Web3 | undefined>((resolve) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new Web3(window.ethereum);
        window.ethereum
          .enable()
          .then(() => {
            resolve(provider);
          })
          .catch(() => {
            resolve(undefined);
          });
      } catch (error) {
        resolve(undefined);
      }
    } else {
      resolve(undefined);
    }
  });
}
export async function isConnected(): Promise<boolean> {
  let conected = false;
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      conected = true;
    }
    return conected;
  } else {
    return conected;
  }
}
export async function createTransaction(
  provider: Web3,
  transactionObject: object,
  // eslint-disable-next-line @typescript-eslint/ban-types
  onConfirmCallback: Function
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    provider.eth
      .sendTransaction(transactionObject)
      .on("transactionHash", (hash) => {
        onConfirmCallback();
        console.log("Transaction hash:", hash);
      })
      .on("receipt", () => resolve(true))
      .on("error", (err) => {
        console.error("Create user error", err);
        resolve(false);
      });
  });
}
