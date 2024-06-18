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

const createGraph = () => {
  const width = 800
  const height = 600

  const svg = d3.select(graph.value).append('svg').attr('width', width).attr('height', height)

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = svg
    .append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke-width', 2)
    .attr('stroke', '#999')

  const node = svg
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', '#69b3a2')
    .call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = event.x
          d.fy = event.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
    )

  const label = svg
    .append('g')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('dy', -3)
    .attr('dx', 12)
    .text((d) => d.title)

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

    label.attr('x', (d) => d.x).attr('y', (d) => d.y)
  })
}

onMounted(() => {
  createGraph()
})
</script>

<template>
  <div id="graph-exemple" ref="graph"></div>
</template>

<style scoped>
svg {
  border: 1px solid black;
}

#graph-exemple {
  border: 1px solid black;
}
</style>
