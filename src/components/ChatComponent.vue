<template>
  <!-- Lista de mensajes (chat) -->
  <el-main class="chat-container">
    <el-card class="chat-card" v-if="messagesList.length">
      <div
        v-for="message in messagesList"
        :key="message.id"
        :class="['chat-message', message.isMe ? 'chat-message-me' : '']"
      >
        <div class="chat-message-content">
          <div class="chat-message-header">
            <span class="chat-message-user">{{ message.user }}</span>
            <span class="chat-message-time">{{ message.time }}</span>
          </div>
          <div class="chat-message-text">{{ message.text }}</div>
        </div>
      </div>
    </el-card>
  </el-main>

  <!-- Cuadro de texto y botón de enviar -->
  <el-footer class="chat-footer">
    <el-tooltip
      :disabled="loggedIn"
      content="Inicia sesión para escribir mensajes"
    >
      <el-input
        v-model="newMessage"
        placeholder="Escribe un mensaje..."
        clearable
        class="chat-input"
        style="flex: 1"
        @keyup.enter="sendMessage"
        :disabled="!loggedIn"
      ></el-input>
    </el-tooltip>
    <el-button type="primary" @click="sendMessage">Enviar</el-button>
  </el-footer>
</template>

<script lang="ts">
import { MessageModel } from "@/contract";
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      newMessage: "",
    };
  },
  props: {
    // Define las propiedades y sus tipos
    loggedIn: {
      type: Boolean,
    },
    messagesList: {
      type: Array as () => MessageModel[],
      default: () => [],
    },
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.$emit("onSendMessage", this.newMessage);
      }
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

.navbar {
  background-color: #f5f7fa;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.chat-container {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}

.chat-card {
  padding: 0px;
  background: transparent;
  border: 0;
  box-shadow: 0 0;
  padding-bottom: 50px;
}

.chat-message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  padding: 10px;
  background-color: #f0f2f5;
  border: 1px solid #eeee;
  box-shadow: 2px 2px 3px -1px #3838385e;
}

.chat-message-me {
  align-items: flex-end;
  background-color: #e1f5fe;
}

.chat-message-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chat-message-header {
  display: flex;
  justify-content: space-between;
  color: #999;
}

.chat-message-user {
  font-weight: bold;
}

.chat-message-time {
  font-size: 12px;
}

.chat-message-text {
  margin-top: 5px;
  text-align: left;
}

.chat-footer {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f7fa;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.chat-input {
  margin-right: 10px;
}
</style>
../services/public-messaging-service/map/contract-messages-to-message-model-map
