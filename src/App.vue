<template>

  <GameHeader/>
  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length"/>
    <GameWrongLetters :wrong-letters="wrongLetters"/>
    <GameWord :word="word" :correct-letters="correctLetters"/>
  </div>
  <GamePopup ref="popup" :word="word" @restart="restart"/>
  <GameNotification ref="notification"/>

</template>

<script setup lang="ts">

import GameHeader from "@/components/GameHeader.vue";
import GameFigure from "@/components/GameFigure.vue";
import GameWrongLetters from "@/components/GameWrongLetters.vue";
import GameWord from "@/components/GameWord.vue";
import GamePopup from "@/components/GamePopup.vue";
import GameNotification from "@/components/GameNotification.vue";
import {ref, watch} from "vue";
import {useRandomWords} from "@/composables/useRandomWords.ts";
import {useLetters} from "@/composables/useLetters.ts";

const {word, getRandomWord} = useRandomWords();
const {letters, correctLetters, wrongLetters, isLose, isWin} = useLetters(word);

const notification = ref<InstanceType<typeof GameNotification> | null>(null); // чтобы пользоваться внутренними методами
const popup = ref<InstanceType<typeof GamePopup> | null>(null);

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose');
  }
});

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win');
  }
})

window.addEventListener('keydown', ({key}) => {
  if (isWin.value || isLose.value) {
    return;
  }

  if (letters.value.includes(key)) {
    notification.value?.open();
    setTimeout(() => notification.value?.close(), 2000);
    return
  }

  if (/[а-яА-ЯёЁ]/.test(key)) { //фильтруем только русский алфавит в событии нажатия key
    letters.value.push(key.toLowerCase());
  }
});

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
}

</script>