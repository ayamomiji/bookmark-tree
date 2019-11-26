<script>
  import Children from './Children.svelte'
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
    <Children nodes={rootNode.children} level={0} />
  {:else}
    Loading...
  {/if}
</div>
<URL />
<CustomStyle />
