<script setup>
import { ref } from 'vue'
import GraphViewExemple from './components/GraphViewExemple.vue'
import GraphView from './components/GraphView.vue'
const isExemple = ref(false)
</script>

<template>
  <main>
    <button @click="isExemple = !isExemple">Toggle Exemple</button>
    <span>Current: {{ isExemple ? 'Exemple' : 'Pas exemple' }}</span>
    <GraphViewExemple v-if="isExemple" />
    <GraphView v-else />
  </main>
</template>
