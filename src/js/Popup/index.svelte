<script>
  import { rootDirectory } from '../store'
  import Children from './Children.svelte'
  import URL from './URL.svelte'
  import CustomStyle from './CustomStyle.svelte'

  let rootNode

  chrome.bookmarks.getSubTree($rootDirectory, nodes => {
    rootNode = nodes[0]
  })
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }

  #tree {
    overflow-y: scroll;
    flex-grow: 1;
  }

  .search:focus {
    outline: none;
  }
</style>

<svelte:body on:contextmenu={e => e.preventDefault()} />

<div class='container'>
  <div id='tree'>
    {#if rootNode}
      <Children nodes={rootNode.children} level={0} />
    {:else}
      Loading...
    {/if}
  </div>
  <URL />
</div>
<CustomStyle />
