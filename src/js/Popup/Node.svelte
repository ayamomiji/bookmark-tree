<script>
  import { openingDirectory, hoveringNode } from '../store'
  import { executeBehavior } from './behaviors'
  import Node from './Node.svelte'

  export let node
  export let level

  let opening = openingDirectory(node.id)
  $: iconUrl = node.children ?
    ($opening ? 'open.png' : 'close.png') :
    `chrome://favicon/${node.url}`

  function handleClick (event) {
    executeBehavior(node, event)
  }

  function setHovering () {
    $hoveringNode = node
  }

  function unsetHovering () {
    $hoveringNode = null
  }
</script>

<style>
  .node {
    cursor: pointer;
    display: flex;
  }

  .node-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .icon {
    margin-right: 0.25em;
  }

  .node:hover {
    background-color: #ffa;
  }
</style>

<div class='node' style={`padding-left: ${level}em;`} on:mouseup={handleClick}
    on:mouseenter={setHovering} on:mouseleave={unsetHovering}>
  <div class='icon'><img class='icon' src={iconUrl} alt={node.title} /></div>
  <div class='node-title' title={node.title}>{node.title}</div>
</div>
{#if node.children && $opening}
  {#each node.children as child (child.id)}
    <Node node={child} level={level + 1} />
  {/each}
{/if}
