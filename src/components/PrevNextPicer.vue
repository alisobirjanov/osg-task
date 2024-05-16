<template>
  <div class="prev-next">
    <button @click="emit('prev')">
      <PrevIcon />
    </button>
    <span>{{ text }}</span>
    <button @click="emit('next')">
      <NextIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import PrevIcon from './common/icons/PrevIcon.vue'
import NextIcon from './common/icons/NextIcon.vue'

defineProps<{
  text: string,
}>()

const emit = defineEmits(['prev', 'next'])
</script>


<style scoped>
.prev-next {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background-color: #F8F8F8;
  border-radius: 4px;
  user-select: none;
}

.prev-next button {
  border: 0;
  width: 20px;
  height: 20px;
  background: none;
  cursor: pointer;
}

.prev-next span {
  margin: 0 10px;
}
</style>