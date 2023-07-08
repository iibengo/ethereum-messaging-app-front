<template>
  <div v-if="loading" class="loading-indicator">
    <img src="../assets/loading.gif" alt="Cargando..." class="loading_img" />
  </div>
</template>

<script lang="ts">
import { icons } from "@element-plus/icons-vue/global";

export default {
  data() {
    return {
      icons: icons,
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loading-indicator {
  position: absolute;
  top: 5px;
  right: 14px;
  z-index: 9999;
  text-align: right;
  display: inline;
}
.loading-indicator .icon {
  max-width: 40px;
}
.loading-indicator .loading_img {
  max-width: 40px;
}
</style>
