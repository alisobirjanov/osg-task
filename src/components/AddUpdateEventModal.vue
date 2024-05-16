<template>
  <Modal 
    title="Yangi event"
    ok-title="Qo’shish"
    cancel-title="Orqaga"
    @ok="onSubmit"
    v-model="open"
  > 
    <form>
      <div class="form-fields">
        <div class="fileld-wrapper">
          <Input placeholder="Title" v-model="formData.title"/>
          <span class="form-error" v-if="errors.title">Maydon bo'sh bo'lishi mumkin emas</span>
        </div>
        <div>
          <DateTimeInput v-model="dateTime"  />
          <div>
            <span class="form-error" v-if="errors.dateTime">Maydon bo'sh bo'lishi mumkin emas</span>
          </div>
        </div>
      </div>

      <div class="form-input">
        <Textarea placeholder="Description" v-model="formData.description" rows="8"/>
      </div>
      <div class="form-input">
        <FileUploder v-model="files" />
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from './common/Modal.vue'
import Input from './common/Input.vue'
import Textarea from './common/Textarea.vue'
import DateTimeInput from './common/DateTimeInput.vue'
import FileUploder from './common/FileUploder.vue'


const emit = defineEmits(['onSubmit'])

const open = ref(false)

const errors = ref({
  title: false,
  dateTime: false
})

const dateTime = ref({
  time: '',
  date: ''
})
const formData = ref({
  title: '',
  description: '',
})


const files = ref([])

function onSubmit() {
  if(checkForm()) {
    emit('onSubmit', {
      date: dateTime.value.date,
      event: {
        ...formData.value,
        time: dateTime.value.time,
        //@ts-ignore
        files: files.value.map(i => ({name: i.name}))
      }
    })
    dateTime.value = {
      time: '',
      date: ''
    }
    formData.value = {
      title: '',
      description: '',
    }
    files.value = []
  }
}


function checkForm() {
  const { title } = formData.value
  const { date, time } = dateTime.value
  errors.value = {
    title: false,
    dateTime: false
  }

  if(!title.length) {
    errors.value.title = true
  }

  if(!date || !time) {
    errors.value.dateTime = true
  }

  return !errors.value.dateTime && !errors.value.title
}

defineExpose({
  open: () => open.value = true,
  close: () => open.value = false,
})
</script>


<style scoped>
.form-fields {
  display: flex;
  gap: 10px;
}

.fileld-wrapper {
  width: 100%;
}
.form-input {
  padding: 9px 0;
}
</style>