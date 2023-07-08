<template>
  <el-dialog v-model="getIsVisible" title="Crear Usuario" class="custom-dialog">
    <div class="modal-content">
      <el-input
        v-model="username"
        placeholder="Ingrese su nombre de usuario"
      ></el-input>
      <p class="explanation">Coste: <b>0.01 ETH.</b></p>
      <el-button type="primary" @click="createUser">Crear</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    getIsVisible() {
      return this.visible;
    },
  },

  methods: {
    createUser() {
      this.$emit("createUser", this.username);
      // Lógica para crear el usuario y realizar acciones con la información ingresada
    },
  },
});
</script>

<style scoped>
.custom-dialog .el-dialog__header {
  text-align: left;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal-text {
  text-align: left;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
