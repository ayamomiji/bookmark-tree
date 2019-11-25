<script>
  import { openingDirectory, toggleDirectory } from '../store'
  import { executeBookmarkBehavior } from './behaviors'
  import Node from './Node.svelte'

  export let node
  export let level

  let opening = openingDirectory(node.id)
  $: iconUrl = node.children ?
    ($opening ? 'open.png' : 'close.png') :
    `chrome://favicon/${node.url}`

  function handleClick () {
    if (node.children) { // is a directory
      toggleDirectory(node.id)
    } else { // is a bookmark
      executeBookmarkBehavior(node, 'openInNewTab')
    }
  }
</script>

<style>
  .node {
    cursor: pointer;
    display: flex;
  }

  .icon {
    margin-right: 0.25em;
  }

  .node:hover {
    background-color: #ffa;
  }
</style>

<div class='node' style={`padding-left: ${level}em;`} on:click={handleClick}>
  <div class='icon'><img class='icon' src={iconUrl} alt={node.title} /></div>
  <div class='node-title'>{node.title}</div>
</div>
{#if node.children && $opening}
  {#each node.children as child (child.id)}
    <Node node={child} level={level + 1} />
  {/each}
{/if}
