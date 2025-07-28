<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="index" class="letter">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>

<script setup lang="ts">

import type { Word } from "@/types/word.ts";

defineProps<Word>()

</script>