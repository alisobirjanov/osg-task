<template>
  <div class="calendar-day" :class="{ drag: isDrag }" @dragleave="dragLeave" @dragover.prevent="dragOver" @drop.prevent="drop">
    {{ day }}
    <div 
      class="events" 
      draggable="true"
      v-for="(item, index) in events.items"
      @dragstart="dragstart(index)"
    >
      <div class="calendat-event">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  date: any,
  day: number,
  events: any
}>()

const emit = defineEmits(['onDragStart', 'onDrop'])

const isDrag = ref(false)

function dragLeave() {
  isDrag.value = false
}
function dragOver() {
  isDrag.value = true
}

function dragstart(idx: number) {
  emit('onDragStart', idx)
}
function drop() {
  emit('onDrop')
  isDrag.value = false
}
</script>

<style>
.calendar-day {
  border: 1px solid #CBCBCB;
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
  letter-spacing: 1px;
  font-size: 12px;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  
}

.bg-gray {
  background-color: rgba(211, 211, 211, 0.219);
}


.drag {
  /* height: 90%;
  border: 1px solid #CBCBCB; */
  background-color: lightblue;
}

.events {
  margin: 10px 0;
}

.calendat-event {
  background-color: #CBCBCB;
  border-radius: 4px;
  padding: 2px 4px;
}

.calendat-event span {
  font-size: 12px;

}
</style>