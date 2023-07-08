import { ComponentOptions, defineComponent } from "vue";
import { Store } from "vuex";
import { connectToMetaMask, getAccountAddress, isConnected } from "@/services/";
import { Web3ProviderStoreModel } from "@/store";
import { ContractUser } from "@/contract";
import Web3 from "web3";
interface StoreMixins extends ComponentOptions<unknown> {
  store: Store<Web3ProviderStoreModel>;
}

const web3ProviderMixin = defineComponent<StoreMixins>({
  data() {
    return {
      store: this.$store as Store<Web3ProviderStoreModel>,
    };
  },
  methods: {
    getUser(): ContractUser {
      return this.store?.state?.user;
    },
    setUser(value: ContractUser): void {
      this.store?.commit("setUser", value);
    },
    isLoggedIn(): boolean {
      return this.store?.state?.loggedIn;
    },
    setIsLoggedIn(value: boolean): void {
      this.store?.commit("setLoggedIn", value);
    },
    async checkMetamaskConnected(): Promise<boolean> {
      let connected = false;

      connected = this.store?.state?.connected;
      if (!connected) {
        connected = await isConnected();
      }
      return connected;
    },
    isConnected(): boolean {
      return this.store?.state?.connected;
    },
    getWallet(): string {
      return this.store?.state?.wallet;
    },
    getProvider(): Web3 {
      return this.store?.state?.provider;
    },
    async connectToMetamask(): Promise<void> {
      const provider = await connectToMetaMask();
      if (provider) {
        const userWallet = await getAccountAddress(provider);
        this.store?.commit("setConnected", true);
        this.store?.commit("setProvider", provider);
        this.store?.commit("setUserWallet", userWallet);
      }
    },
  },
});

export default web3ProviderMixin;
