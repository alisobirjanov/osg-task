<template>
  <AuthForm @on-submit="onSubmit" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'
import auth from '../auth'
import type { User } from '../auth'


const router = useRouter()

function onSubmit(formData: User) {
  auth.register(formData)
  router.push({ name: 'login' })
}
</script>