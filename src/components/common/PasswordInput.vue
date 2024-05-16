<template>
  <div class="wrapper">
    <input 
      :type="isView ? 'text' : 'password'" 
      class="password-input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    >
    <button type="button" @click="isView = !isView">
      <P v-if="isView" />
      <W v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import P from './icons/P.vue'
import W from './icons/W.vue'

const isView = ref(false)

defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>


<style scoped>
.wrapper {
  height: 32px;
  border: 1px solid #CBCBCB;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  background-color: #fff;
}

.wrapper .password-input {
  outline: none;
  border: none;
  width: 100%;
}

.wrapper .password-input::placeholder {
  color: #D9D9D9;
  font-weight: 500;
  font-size: 14px;
}

.wrapper button {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
</style>