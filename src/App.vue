<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import auth from './auth'

const router = useRouter()

if(!auth.isAuthenticated()) {
  router.push({name: 'login'})
}
</script>
