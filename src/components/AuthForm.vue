<template>
  <div class="box">
    <div class="card">
      <form @submit.prevent="onSubmit">
        <h2 class="form-title">{{ login ? ' Tizimga kirish' :  'Ro’yxatdan o’tish' }}</h2>

        <div class="form-input">
          <Input placeholder="Foydalanuvchi ismi" v-model="formData.username" />
          <span class="form-error" v-if="errors.username">Maydon bo'sh bo'lishi mumkin emas</span>
        </div>

        <div class="form-input">
          <PasswordInput placeholder="Parol" v-model="formData.password" />
          <span class="form-error" v-if="errors.password">Maydon bo'sh bo'lishi mumkin emas</span>
        </div>

       
          <div class="form-input" v-if="!login">
            <PasswordInput placeholder="Parolni qayta kiriting" v-model="formData.confirmPassword" />
            <span class="form-error" v-if="errors.confirmPassword">Parollar mos emas!</span>
          </div>

          <div class="form-text" v-if="login">
            <p>Akkauntingiz yo’qmi? <RouterLink to="/register">Tizimga kirish</RouterLink>
            </p>
          </div>

        <Button type="success" block>Ro’yxatdan o’tish</Button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Input from './common/Input.vue'
import PasswordInput from './common/PasswordInput.vue'
import Button from './common/Button.vue'

const props = defineProps<{
  login?: boolean
}>()

const emit = defineEmits(['on-submit'])

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const errors = ref({
  username: false,
  password: false,
  confirmPassword: false
})

function checkForm () {
  errors.value = {
    username: false,
    password: false,
    confirmPassword: false
  }
  const { 
    username, 
    password, 
    confirmPassword 
  } = formData.value

  if(!username.length) {
    errors.value.username = true
  } 

  if(!password.length) {
    errors.value.password = true
  }

  if(!props.login && confirmPassword !== password) {
    errors.value.confirmPassword = true
  }
  
  return !errors.value.password && 
    !errors.value.username &&
    !errors.value.confirmPassword
}

function onSubmit() {
  const {
    username,
    password,
  } = formData.value
  if(checkForm()) {
    emit('on-submit', {
      username, password
    })
  }
}
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.card {
  width: 400px;
  padding: 20px;
  background-color: #D9D9D9;
  border-radius: 8px;
}

.form-title {
  text-align: center;
  margin: 15px;
}

.form-input {
  padding: 9px 0;
}

.form-text {
  margin: 16px;
  text-align: center;
  font-size: 14px;
}

.form-text p a {
  color: #1788DA;
  text-decoration: none;
}


</style>