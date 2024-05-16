<template>
  <div class="container">
    <div class="date-picer">
      <PrewNextPicer :text="monthName" @next="nextMonth" @prev="prevMonth"/>
      <PrewNextPicer :text="year.toString()" @next="nextYear" @prev="prevYear"/>
      <Button type="success" @click="modal.open()">Add Event</Button>

    </div>
    <Calendar :year="year" :month="month" :events="events" @on-change="onChange"/>

    <AddUpdateEventModal ref="modal" @on-submit="onSubmit"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PrewNextPicer from '../components/PrevNextPicer.vue'
import Calendar from '../components/Calendar.vue'
import AddUpdateEventModal from '../components/AddUpdateEventModal.vue'
import Button from '../components/common/Button.vue'

const modal = ref()

const defaultEvents = [{
  date: '2024/05/16',
  items: [
    {
      title: 'Hi title',
      time: '11:43'
    }
  ]
},]

const ev =  JSON.parse(localStorage.getItem('osg-event') as string || '[]') 

const events = ref(ev || defaultEvents)

const date = new Date()
const month = ref(date.getMonth())
const year = ref(date.getFullYear())

const monthName = computed(() => {
  const date = new Date(year.value, month.value)
  return date.toLocaleString('default', { month: 'long' })
})

function prevMonth() {
  const date = new Date(year.value, month.value)
  date.setMonth(date.getMonth() - 1)
  month.value = date.getMonth()
  year.value = date.getFullYear()
}
function nextMonth() {
  const date = new Date(year.value, month.value)
  date.setMonth(date.getMonth() + 1)
  month.value = date.getMonth()
  year.value = date.getFullYear()
}

function prevYear() {
  year.value -=1 
}
function nextYear() {
  year.value +=1 
}


function onChange(data: any) {
  events.value = data
  localStorage.setItem('osg-event', JSON.stringify(data))
}


function onSubmit(data: any) {
  const idx = events.value.findIndex(item => new Date(item.date).getTime() === new Date(data.date).getTime())
  const clonedEvents = JSON.parse(JSON.stringify(events.value))
  const newData = new Date(data.date)

  const formattedData = `${newData.getFullYear()}/${newData.getMonth() + 1}/${newData.getDate()}`
  if(idx < 0) {
    clonedEvents.push({
      date: formattedData,
      items: [data.event]
    })
  } else {
    clonedEvents[idx].items.push(data.event)
  }

  localStorage.setItem('osg-event', JSON.stringify(clonedEvents))
  events.value = clonedEvents

  modal.value.close()
}
</script>


<style>
.container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.date-picer {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>