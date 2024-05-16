<template>
  <label for="file-input">
    <input type="file" multiple id="file-input" @input="onChange">
    <div 
      class="drop-zone"
      @dragstart="dragStartHandler"
      @dragleave="dragLeaveHandler"
      @dragover="dragStartHandler"
      @drop="dropHandler" 
      :style="{
        backgroundColor: drag ? 'lightblue' : '#fff'
      }"
    >
      <div>
        <UploadIcon />
        <div>
          <span class="text">Fayl yuklang</span>
        </div>
      </div>
    </div>
  </label>
    <div class="files">
      <div class="file-item" v-for="(file, index) in modelValue">
        <span>
          <AttachIcon />
        </span>
        <span>{{ file.name }}</span>
        <button @click="removeFile(index)">
          <XIcon />
        </button>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XIcon from './icons/XIcon.vue'
import AttachIcon from './icons/AttachIcon.vue'
import UploadIcon from './icons/UploadIcon.vue'

interface Files {
  name: string
}

const props = defineProps<{
  modelValue: Files[]
}>()

const emit = defineEmits(['update:modelValue'])

const drag = ref(false)

function dragStartHandler(event: DragEvent) {
  event.preventDefault()
  drag.value = true
}

function dragLeaveHandler(event: DragEvent) {
  event.preventDefault()
  drag.value = false
}


function addFiles(files: FileList) {
  console.log('FileList')
  emit('update:modelValue', [
    ...props.modelValue,
    ...files
  ])
}

function dropHandler(event: DragEvent) {
  event.preventDefault()
  drag.value = false
  if (event.dataTransfer?.files) {
    addFiles(event.dataTransfer.files)
  }
}

function onChange(event: Event) {
  const files = (event.target as HTMLInputElement)?.files
  if(files) {
    addFiles(files)
  }
}

function removeFile(idx: number) {
  emit('update:modelValue', props.modelValue.filter((_, index) => index !== idx))
}

</script>

<style>
#file-input {
  display: none;
}

.drop-zone {
  cursor: pointer;
  color: #CBCBCB;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px dashed #CBCBCB;
  border-radius: 4px;
  padding: 20px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin-bottom: 20px;
}

.text {
  cursor: pointer;
  font-size: 12px;
}


.files {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.file-item {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 15px;
  background-color: #F0F0F0;
  display: inline-block;
  line-height: 1.25;
}

.file-item span {
  margin: 0 4px;
}

.file-item button {
  border: none;
  cursor: pointer;
}
</style>