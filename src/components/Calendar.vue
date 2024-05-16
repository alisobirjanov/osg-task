
// @ts-no
<template>
  <div class="calendar">
    <div class="week-day-names">
      <div v-for="weekdayName in weekdayNames" :key="weekdayName">
        {{ weekdayName }}
      </div>
    </div>
    <div class="calendar-days">
      <CalendarDay 
        class="bg-gray" 
        v-for="day in prevMonthDays"
        :day="day.day" :date="day.date"
        :events="day.events"
        @onDragStart="onDragStart(day.date, $event)"
        @onDrop="onDrop(day.date)" 
      />
      <CalendarDay 
        v-for="(day) in days"
        :day="day.day"
        :date="day.date" 
        :events="day.events"
        @onDragStart="onDragStart(day.date, $event)" 
        @onDrop="onDrop(day.date)"
      />
      <CalendarDay 
        class="bg-gray"
        v-for="day in nextMonthDays" 
        :day="day.day" :date="day.date" 
        :events="day.events"
        @onDragStart="onDragStart(day.date, $event)" 
        @onDrop="onDrop(day.date)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CalendarDay from './CalendarDay.vue'
import { numDays, getDay, getNextMonth, getPrevMonth } from '../utils'

interface Event {
  date: string
  time: string
  title: string
  description: string
  files: any[]
}

const props = defineProps<{
  year: number
  month: number
  events?: Event[]
}>()


const emit = defineEmits(['onChange'])

const weekdayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba']

const days = computed(() => {
  return Array.from({ length: numDays(props.year, props.month + 1) }).map((_, idx: number) => {
    const date = new Date(props.year, props.month, idx + 1)
    return {
      day: idx + 1,
      date,
      events: eventsFilter(date)
    }
  })
})

const prevMonthDays = computed(() => {
  const prevMonth = getPrevMonth(props.year, props.month + 1)

  const prevMonthDeys = numDays(props.year, prevMonth.getMonth())

  let weekDay = getDay(props.year, props.month)

  if (!weekDay) {
    weekDay = 6
  } else {
    weekDay -= 1
  }

  const arr = Array.from({ length: weekDay }).reduce((acc: object[], _, i) => {
    
    const date = getPrevMonth(props.year, props.month)
    date.setDate(prevMonthDeys - i)
    acc.unshift({
      day: prevMonthDeys - i,
      date,
      events: eventsFilter(date)
    })
    return acc
  }, [])

  return arr
})


const nextMonthDays = computed(() => {
  const nextMonth = getNextMonth(props.year, props.month)

  let weekDay = getDay(props.year, props.month, days.value.length)
  return Array.from({ length: 7 - weekDay }).map((_, i) => {
    return {
      day: i + 1,
      date: nextMonth.setDate(i + 1),
      events: eventsFilter(nextMonth)
    }
  })

})

function eventsFilter(date: Date) {
  const res = props?.events?.reduce((acc, ev) => {
    if (new Date(ev.date).getTime() === new Date(date).getTime()) {
      //@ts-ignore
      acc.items.push(...ev.items)
    }
    return acc
  }, { date, items: [] })

  return res || { date, items: [] }
}

let activeDraggable = {
  date: null,
  itemIdx: NaN
}

function onDragStart(date: Date, itemIdx: number) {
  activeDraggable = { date, itemIdx }
}

function onDrop(currentDate: Date) {

  const clonedEvents = JSON.parse(JSON.stringify(props.events || []))

  const { date, itemIdx } = activeDraggable

  if (date === null || itemIdx === null) {
    return
  }

  const dateIndex = clonedEvents.findIndex(item => new Date(item.date).getTime() === new Date(date).getTime())
  if (dateIndex < 0) {
    return
  }

  const event = clonedEvents[dateIndex].items[itemIdx]

  if (!event) {
    return
  }

  clonedEvents[dateIndex].items.splice(itemIdx, 1)

  if (!clonedEvents[dateIndex].items.length) {
    clonedEvents.splice(dateIndex, 1)
  }


  const toDateIndex = clonedEvents.findIndex(item => new Date(item.date).getTime() === new Date(currentDate).getTime())

  if (toDateIndex < 0) {
    clonedEvents.push({
      date: currentDate,
      items: [event]
    })
  } else {
    clonedEvents[toDateIndex].items.push(event)
  }
  emit('onChange', clonedEvents)
}

</script>


<style>
.calendar {
  height: 700px;
}

.week-day-names {
  width: 100%;
  display: flex;
}

.week-day-names div {
  flex-grow: 7;
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  padding: 12px 0;
}

.calendar-days {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  gap: 5px;

  grid-auto-rows: 120px;
  overflow: auto;
}
</style>