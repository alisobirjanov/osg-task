<template>
  <textarea class="text-input" :placeholder="placeholder" :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)">
  </textarea>
</template>

<script setup lang="ts">

defineProps<{
  modelValue?: string,
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>


<style scoped>
.text-input {
  outline: none;
  border: none;
  border: 1px solid #CBCBCB;
  border-radius: 4px;
  padding: 5px;
  width: 100%;
}

.text-input::placeholder {
  color: #D9D9D9;
  font-weight: 500;
  font-size: 14px;
}

</style>