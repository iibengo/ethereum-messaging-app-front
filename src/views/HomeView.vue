<template>
  <div class="message-chat">
    <loading :loading="loading" />
    <create-user-modal
      :visible="createDialog"
      @close="createDialog = false"
      @createUser="createUser"
    />
    <!-- Menú superior (navbar) -->
    <MainMenu
      :loggedIn="getIsLoggedIn"
      :connected="getIsConnected"
      :user="getLoginUser"
      @createUser="openCreateUser"
      @connectWallet="connectAndLogin"
    />
    <chat-componet
      v-if="getIsConnected"
      :loggedIn="getIsLoggedIn"
      :messagesList="messages"
      @onSendMessage="sendMessage"
    />
    <div v-else class="login_msg">
      <a href="#">Inicia sesión</a> con metamask para ver los mensajes
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  MainMenu,
  ChatComponent,
  Loading,
  CreateUserModal,
} from "../components/";
import web3ProviderMixin from "./mixin/store-mixing";
import { ContractUser, MessageModel } from "@/contract";
import { createUser, getMessages, getUser } from "@/services/";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    CreateUserModal,
    MainMenu,
    "chat-componet": ChatComponent,
    loading: Loading,
  },
  mixins: [web3ProviderMixin],
  data() {
    return {
      createDialog: false,
      userWallet: "",
      messages: [] as MessageModel[],
      loading: false,
    };
  },
  computed: {
    getIsConnected(): boolean {
      return this.isConnected();
    },
    getIsLoggedIn(): boolean {
      return this.isLoggedIn();
    },
    getLoginUser(): ContractUser | undefined {
      return this.getUser();
    },
  },
  async mounted() {
    const connectedMetamask = await this.checkMetamaskConnected();
    if (connectedMetamask) {
      await this.connectAndLogin();
    }
  },
  methods: {
    closeCreateUser() {
      this.createDialog = false;
      this.$forceUpdate();
    },
    openCreateUser() {
      this.createDialog = true;
      this.$forceUpdate();
    },
    async createUser(name: string) {
      console.log("createuser", name, this.getProvider());
      const created = await createUser(
        name,
        this.getProvider(),
        this.getWallet(),
        this.onConfirmCreate
      );
      this.loading = false;
      console.log("created", created);
      if (created) {
        this.onCreateUser(name);
      }
    },

    async connectAndLogin() {
      await this.connectToMetamask();
      await this.getMessagesData();
      this.$forceUpdate();
      const existUser = await getUser(this.getWallet(), this.getProvider());
      this.setIsLoggedIn(!!existUser);
      if (existUser) {
        this.setUser(existUser);
      }
    },
    async getMessagesData() {
      const messageList = await getMessages(
        this.getWallet(),
        this.getProvider()
      );
      this.messages = messageList;
    },
    async sendMessage() {
      //
    },
    onConfirmCreate() {
      ElMessage({
        showClose: true,
        message: "Creando Usuario",
        type: "warning",
      });
      this.loading = true;
      this.closeCreateUser();
    },
    async onCreateUser(name: string) {
      this.createDialog = false;
      ElMessage({
        showClose: true,
        message: `Usuario ${name} creado!`,
        type: "success",
      });
      await this.connectAndLogin();
      this.$forceUpdate();
    },
  },
});
</script>
<style scoped>
.message-chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.login_msg {
  padding: 50px;
}
</style>
