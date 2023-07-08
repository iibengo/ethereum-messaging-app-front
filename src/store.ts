import { createStore } from "vuex";
import Web3 from "web3";
import { ContractUser } from "./contract";

export interface Web3ProviderStoreModel {
  loggedIn: boolean;
  connected: boolean;
  provider: Web3;
  wallet: string;
  user: ContractUser;
}
export default createStore({
  state: {
    loggedIn: false,
    connected: false,
    provider: undefined,
    wallet: "",
    user: undefined,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setConnected(state, value) {
      state.connected = value;
    },
    setProvider(state, value) {
      state.provider = value;
    },
    setUserWallet(state, value) {
      state.wallet = value;
    },
    setUser(state, value) {
      state.user = value;
    },
  },
});
