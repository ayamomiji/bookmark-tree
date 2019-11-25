<script>
  import Root from './Root.svelte'
  import URL from './URL.svelte'
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
</style>

<svelte:body on:contextmenu={e => e.preventDefault()} />

<div id='tree'>
  {#if rootNode}
    <Root node={rootNode} />
  {:else}
    Loading...
  {/if}
</div>
<URL />
<CustomStyle />
