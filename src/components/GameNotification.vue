<template>
  <div class="notification-container" :class="{'show': isVisible}">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const isVisible = ref(false);

const open = () => {
  isVisible.value = true;
}

const close = () => {
  isVisible.value = false;
}

//предоставляем возможность использовать методы снаружи
defineExpose({
  open,
  close
});

</script>