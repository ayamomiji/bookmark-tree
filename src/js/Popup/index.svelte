<script>
  import { width, height } from '../store'
  import Root from './Root.svelte'

  let rootNode

  chrome.bookmarks.getTree(nodes => {
    rootNode = nodes[0]
  })
</script>

<style>
  #tree {
    overflow-y: scroll;
  }

  #url {
    border-top: 1px solid black;
    line-height: 1em;
    font-size: 1em;
    height: 1em;
    overflow: hidden;
  }
</style>

<div id='tree' style={`width: ${$width}px; height: ${$height}px;`}>
  {#if rootNode}
    <Root node={rootNode} />
  {:else}
    Loading...
  {/if}
</div>
<div id='url'>
  TODO
</div>
