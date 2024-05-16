<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-mask" @click="close">
        <div class="modal-wrapper" @click.stop>
          <button class="close-button" @click="close">
            <XIcon />
          </button>
          <div class="modal-container">
            <div class="modal-header">
              <h2>{{ title }}</h2>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <Button @click.stop="close">{{ cancelTitle }}</Button>
              <Button type="success" @click="emit('ok')">{{ okTitle }}</Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import XIcon from './icons/XIcon.vue'

withDefaults(defineProps<{
  modelValue?: boolean,
  title?: string
  okTitle?: string
  cancelTitle?: string
}>(), {
  modelValue: false,
  title: 'Title',
  okTitle: 'Submit',
  cancelTitle: 'Close'
})

const emit = defineEmits(['update:modelValue', 'ok']);

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  position: relative;
  width: 720px;
}

.modal-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.close-button {
  width: 32px;
  height: 32px;
  position: absolute;
  top: -16px;
  right: -16px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.modal-header h2 {
  font-size: 24px;
}

.modal-body {
  padding: 14px 0;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 10px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
