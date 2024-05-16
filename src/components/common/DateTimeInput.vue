<template>
  <div class="wrapper">
    <input type="time" :value="modelValue.time" @input="onChange('time', $event)"/>
    <input type="date" :value="modelValue.date" @input="onChange('date', $event)"/>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: {
    time: string,
    date: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

function onChange(type: string, event: InputEvent) {
  emit('update:modelValue', {
    ...props.modelValue,
    [type]: (event.target as HTMLInputElement)?.value
  })
}

</script>

<style scoped> 

.wrapper {
  height: 33px;
  border: 1px solid #CBCBCB;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0 5px;
}
input {
  border: none;
  display: inline-block;
  outline: none;
} 
</style>
