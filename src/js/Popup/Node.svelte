<script>
  import Node from './Node.svelte'

  export let node
  export let level
</script>

<style>
  .node {
    cursor: pointer;
  }

  .node:hover {
    background-color: #ffa;
  }
</style>

<div class='node' style={`padding-left: ${level}em;`}>
  <div>{node.title}</div>
</div>
{#if node.children}
  {#each node.children as child (child.id)}
    <Node node={child} level={level + 1} />
  {/each}
{/if}
