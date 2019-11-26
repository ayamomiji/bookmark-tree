<script>
  import { moveDirectoriesToListTop } from '../store'
  import Node from './Node.svelte'

  export let level
  export let nodes

  function sort (children) {
    if ($moveDirectoriesToListTop) {
      const directories = []
      const bookmarks = []
      children.forEach(node => {
        if (node.children) {
          directories.push(node)
        } else {
          bookmarks.push(node)
        }
      })

      return directories.concat(bookmarks)
    }
    return children
  }
</script>

{#each sort(nodes) as child (child.id)}
  <Node node={child} level={level} />
{/each}
