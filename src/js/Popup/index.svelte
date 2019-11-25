<script>
  import Root from './Root.svelte'
  import CustomStyle from './CustomStyle.svelte'

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

<svelte:body on:contextmenu={e => e.preventDefault()} />

<div id='tree'>
  {#if rootNode}
    <Root node={rootNode} />
  {:else}
    Loading...
  {/if}
</div>
<div id='url'>
  TODO
</div>
<CustomStyle />
