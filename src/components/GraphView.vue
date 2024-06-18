<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const graph = ref(null)

const nodes = [
  { id: 'dd705aa8-2eca-4c74-bb0a-7f50447269f1', title: 'State Machine' },
  { id: 'af4d9ed4-d909-42e2-b22d-eb1e44d93f33', title: 'Vue 3 - Fragments' },
  { id: '8b2c7b6f-b08d-4fc3-9f78-6664c304d980', title: 'Vue 3 - Provide/Inject' },
  { id: 'e5c7ba7f-3db9-49b8-bfd3-61fd2f75916a', title: 'Vue 3 - Reactivity' },
  { id: 'a011fd79-5271-4394-a857-459e9cf66b16', title: 'Vue 3 - Suspense' },
  { id: '46856c57-b42c-48f0-b230-f5087a087a63', title: 'Vue 3 - Teleport' },
  { id: '865ab0ae-9d0a-4432-95c7-10c60b57ba91', title: 'Vue3' }
]

const links = [
  {
    source: 'af4d9ed4-d909-42e2-b22d-eb1e44d93f33',
    target: '865ab0ae-9d0a-4432-95c7-10c60b57ba91'
  },
  {
    source: '8b2c7b6f-b08d-4fc3-9f78-6664c304d980',
    target: '865ab0ae-9d0a-4432-95c7-10c60b57ba91'
  },
  {
    source: 'e5c7ba7f-3db9-49b8-bfd3-61fd2f75916a',
    target: '865ab0ae-9d0a-4432-95c7-10c60b57ba91'
  },
  {
    source: 'a011fd79-5271-4394-a857-459e9cf66b16',
    target: '865ab0ae-9d0a-4432-95c7-10c60b57ba91'
  },
  {
    source: '46856c57-b42c-48f0-b230-f5087a087a63',
    target: '865ab0ae-9d0a-4432-95c7-10c60b57ba91'
  },
  {
    source: '865ab0ae-9d0a-4432-95c7-10c60b57ba91',
    target: 'af4d9ed4-d909-42e2-b22d-eb1e44d93f33'
  },
  {
    source: '865ab0ae-9d0a-4432-95c7-10c60b57ba91',
    target: 'a011fd79-5271-4394-a857-459e9cf66b16'
  },
  {
    source: '865ab0ae-9d0a-4432-95c7-10c60b57ba91',
    target: '46856c57-b42c-48f0-b230-f5087a087a63'
  },
  {
    source: '865ab0ae-9d0a-4432-95c7-10c60b57ba91',
    target: 'e5c7ba7f-3db9-49b8-bfd3-61fd2f75916a'
  },
  { source: '865ab0ae-9d0a-4432-95c7-10c60b57ba91', target: '8b2c7b6f-b08d-4fc3-9f78-6664c304d980' }
]

const createGraph = () => {}

onMounted(() => {
  createGraph()
})
</script>

<template>
  <div id="graph" ref="graph"></div>
</template>
<style scoped>
#graph {
  border: 1px solid black;
}
</style>
