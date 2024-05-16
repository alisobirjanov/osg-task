<template>
  <AuthForm login @on-submit="onSubmit" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'
import auth from '../auth'
import type { User } from '../auth'


const router = useRouter()

function onSubmit(formData: User) {
  if (auth.login(formData)) {
    return router.push({ name: 'home' })
  }
  alert('Parol yoki Username natogri!')
}
</script>
