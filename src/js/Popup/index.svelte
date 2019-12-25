<script>
  import { rootDirectory, disableSearchBar } from '../store'
  import Children from './Children.svelte'
  import URL from './URL.svelte'
  import CustomStyle from './CustomStyle.svelte'

  let rootNode

  chrome.bookmarks.getSubTree($rootDirectory, nodes => {
    rootNode = nodes[0]
  })

  let keyword = ''
  let result = null

  $: if (keyword.trim() !== '') {
    chrome.bookmarks.search(keyword, nodes => {
      result = nodes
    })
  } else {
    result = null
  }
</script>

<style>
  body {
    overflow: hidden;
  }

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

  .search {
    width: 100%;
    border: 0;
    padding: 0.25em;
    border-bottom: 1px solid lightgray;
  }

  .search:focus {
    outline: none;
  }
</style>

<svelte:body on:contextmenu={e => e.preventDefault()} />

<div class='container'>
  {#if !$disableSearchBar}
    <input type='search' autofocus class='search' placeholder='Type to search...'
        bind:value={keyword} />
  {/if}

  <div id='tree'>
    {#if result}
      <Children nodes={result} level={0} />
    {:else if rootNode}
      <Children nodes={rootNode.children} level={0} />
    {:else}
      Loading...
    {/if}
  </div>
  <URL />
</div>
<CustomStyle />
