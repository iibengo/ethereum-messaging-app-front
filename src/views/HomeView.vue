<template>
  <div class="message-chat">
    <loading :loading="loading" />
    <!-- Modal crear usuario -->
    <CreateUserDialog
      :visible="createDialog"
      @close="createDialog = false"
      @createUser="createUser"
    />
    <!-- Menú superior (navbar) -->
    <MainMenu
      :loggedIn="getIsLoggedIn"
      :connected="getIsConnected"
      :user="getLoginUser"
      :totalMessages="totalMessages"
      @createUser="openCreateUser"
      @connectWallet="connectAndLogin"
      @update="getMessageList"
    />
    <!-- Componente chat -->
    <chat-componet
      v-if="getIsConnected"
      :loggedIn="getIsLoggedIn"
      :messagesList="messageList"
      @onSendMessage="sendMessage($event)"
      @deleteMessage="deleteMessage($event)"
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
  CreateUserDialog,
} from "../components/";
import { web3StoreProviderMixin } from "./mixin/";
import { ContractUser, MessageModel } from "@/contract";
import {
  createUser,
  getMessages,
  getUser,
  writeMessage,
  attachContractEvent,
  deleteMessage,
  getActiveMessages,
} from "@/services/";
import { ElMessage } from "element-plus";
import { netWorkUrl } from "@/config";

export default defineComponent({
  components: {
    CreateUserDialog,
    MainMenu,
    "chat-componet": ChatComponent,
    loading: Loading,
  },
  mixins: [web3StoreProviderMixin],
  data() {
    return {
      createDialog: false,
      totalMessages: 0,
      userWallet: "",
      messageList: [] as MessageModel[],
      loading: false,
      attachedEvent: false,
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
      const created = await createUser(
        name,
        this.getProvider(),
        this.getWallet(),
        this.onConfirmCreate
      );
      this.loading = false;
      if (created) {
        this.onCreateUser(name);
      }
    },

    async connectAndLogin() {
      await this.connectToMetamask();
      await this.getTotalMessages();
      await this.getMessageList();
      this.$forceUpdate();
      const existUser = await getUser(this.getWallet(), this.getProvider());
      this.setIsLoggedIn(!!existUser);
      if (existUser) {
        this.setUser(existUser);
      }
      if (!this.attachedEvent) {
        this.attachedEvent = true;
        attachContractEvent(
          this.getProvider(),
          this.onSendMessage,
          this.onDeleteMessage
        );
      }
    },
    async getMessageList() {
      const response = await getMessages(this.getWallet(), this.getProvider());
      this.messageList = response;
    },
    async getTotalMessages() {
      const response = await getActiveMessages(this.getProvider());
      this.totalMessages = response;
    },
    async sendMessage(msg: string): Promise<void> {
      const newMessage = await writeMessage(
        msg,
        this.getProvider(),
        this.getWallet(),
        (transaction: string) => {
          this.loading = true;
          this.showMessage("Escribiendo mensaje", transaction);
        }
      );
      this.loading = false;
      if (newMessage) {
        this.showMessage(`Mensaje creado: ${newMessage}`);
      }
    },
    async deleteMessage(msgId: number): Promise<void> {
      const isDeleted = await deleteMessage(
        msgId,
        this.getProvider(),
        this.getWallet(),
        (transaction: string) => {
          this.loading = true;
          this.showMessage(`Eliminando mensaje ${msgId}`, transaction);
        }
      );
      this.loading = false;
      if (isDeleted) {
        this.showMessage(`Mensaje eliminado`);
      }
    },
    onConfirmCreate(transaction: string) {
      this.showMessage(`Creando Usuario`, transaction);
      this.loading = true;
      this.closeCreateUser();
    },
    onDeleteMessage() {
      this.getMessageList();
    },
    async onSendMessage() {
      await this.getMessageList();
      await this.getTotalMessages();
      const chatContainer = document.querySelector(
        ".chat-container"
      ) as HTMLElement;
      // Hacer scroll hacia abajo
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    showMessage(content: string, url?: string) {
      const urlElement = url
        ? `<a href="${netWorkUrl.ETHTest}tx/${url}" target="_blank">${url}</a>`
        : "";
      ElMessage({
        showClose: true,
        type: "success",
        dangerouslyUseHTMLString: true,
        message: `<label>${content} ${urlElement}</label>`,
      });
    },
    async onCreateUser(name: string) {
      this.createDialog = false;
      this.showMessage(`Usuario ${name} creado!`);
      await this.connectAndLogin();
      this.$forceUpdate();
    },
  },
});
</script>
<style>
html {
  overflow: hidden !important;
}
</style>

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
