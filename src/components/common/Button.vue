<template>
  <button class="base" :class="[type, block ? 'block' : '']">
    <slot />
  </button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  type?: 'success' | 'secondary'
  block?: boolean
}>(), {
  type: 'secondary'
})
</script>


<style scoped>
.base {
  min-width: 110px;
  height: 32px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.block {
  width: 100%;
}

.success {
  background-color: #39C54F;
}

.secondary {
  background-color: #CBCBCB;
}
</style>
