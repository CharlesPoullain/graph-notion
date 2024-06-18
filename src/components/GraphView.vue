<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const graph = ref(null)

// import FetchPosts from '../services/FetchPosts.js'
// const data = FetchPosts.execute()
import data from '../posts.json'
const nodes = data?.results?.map(page => ({
  id: page.id,
  title: page.properties.Name.title[0].plain_text
}))

const links = []

data?.results?.forEach(page => {
  const sourceId = page.id
  const related = page.properties['Related base test'].relation
  related.forEach(relation => {
    links.push({
      source: sourceId,
      target: relation.id
    })
  })
})

// Pour garantir des liens réciproques
data?.results?.forEach(page => {
  const targetId = page.id
  const relatedBack = page.properties['Related back to base test'].relation
  relatedBack.forEach(relation => {
    links.push({
      source: relation.id,
      target: targetId
    })
  })
})

const createGraph = () => {
  const width = 800
  const height = 600
  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10)

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.

  // Create a simulation with several forces.
  const simulation = d3
  .forceSimulation(nodes)
  .force(
    'link',
    d3.forceLink(links).id((d) => d.id).distance(100)
  )
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(0, 0))
  .force('collision', d3.forceCollide().radius(50))
  .force('x', d3.forceX(0).strength(0.1)) 
  .force('y', d3.forceY(0).strength(0.1))

  // Create the SVG container.
  const svg = d3
    .select(graph.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  // Add a line for each link, and a circle for each node.
  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.4)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d) => Math.sqrt(d.value))

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', (d) => color(d.group))
    .attr('cursor', 'pointer')

  node.append('title').text((d) => d.id)

  const label = svg
  .append('g')
  .selectAll('text')
  .data(nodes)
  .enter()
  .append('text')
  .attr('dy', -3)
  .attr('dx', 12)
  .attr('cursor', 'default')
  .text((d) => d.title)


  // Add a drag behavior.
  node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    label.attr('x', (d) => d.x).attr('y', (d) => d.y)
  })

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  // When this cell is re-run, stop the previous simulation. (This doesn’t
  // really matter since the target alpha is zero and the simulation will
  // stop naturally, but it’s a good practice.)
  // invalidation.then(() => simulation.stop())
}

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
svg {
  border: 1px solid black;
}
</style>
