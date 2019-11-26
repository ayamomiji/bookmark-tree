<script>
  export let value

  let directories = null

  chrome.bookmarks.getTree(rootNodes => {
    let nodes = rootNodes
    let collectedDirectories = []
    let node
    while (node = nodes.pop()) {
      if (node.children) {
        collectedDirectories.push(node)
        node.children.forEach(child => nodes.push(child))
      }
    }
    directories = collectedDirectories
  })
</script>

<!-- svelte does not update selected option after options updated? -->
{#if directories}
  <select class='form-control' id='rootDirectory' bind:value={value}>
    {#each directories as directory}
      <option value={directory.id}>
        {directory.id === '0' ? '(root)' : directory.title}
      </option>
    {/each}
  </select>
{/if}
