<script>
  import { openingDirectory, toggleDirectory } from '../store'
  import Node from './Node.svelte'

  export let node
  export let level

  let opening = openingDirectory(node.id)

  function handleClick () {
    if (node.children) { // is a directory
      toggleDirectory(node.id)
    }
  }
</script>

<style>
  .node {
    cursor: pointer;
  }

  .node:hover {
    background-color: #ffa;
  }
</style>

<div class='node' style={`padding-left: ${level}em;`} on:click={handleClick}>
  {node.title}
</div>
{#if node.children && $opening}
  {#each node.children as child (child.id)}
    <Node node={child} level={level + 1} />
  {/each}
{/if}
