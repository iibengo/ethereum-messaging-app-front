<template>
  <!-- Menú superior (navbar) -->
  <el-header class="navbar">
    <el-menu mode="horizontal" active-text-color="#409EFF">
      <el-menu-item v-if="!connected" @click="connectWallet"
        >Conectar</el-menu-item
      >
      <el-menu-item>Chat</el-menu-item>
      <el-menu-item v-if="!loggedIn && connected" @click="createUser"
        >Crear usuario</el-menu-item
      >
      <el-menu-item v-if="loggedIn"> {{ `Hola ${user.name}` }} </el-menu-item>
      <el-menu-item v-if="loggedIn" @click="$emit('update')">
        Actualizar
      </el-menu-item>
      <el-menu-item v-if="loggedIn">
        {{ `Mensajes: ${totalMessages}` }}
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ContractUser } from "@/contract";

export default defineComponent({
  data() {
    return {
      createDialog: false,
    };
  },
  props: {
    totalMessages: {
      type: Number,
      default: 0,
    },
    connected: {
      type: Boolean,
    },
    loggedIn: {
      type: Boolean,
    },
    user: {
      type: Object as () => ContractUser,
      default: () => ({} as ContractUser),
    },
  },
  methods: {
    connectWallet() {
      this.$emit("connectWallet");
    },
    createUser() {
      this.$emit("createUser");
    },
  },
});
</script>
<style scoped>
.navbar {
  background-color: #f5f7fa;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
