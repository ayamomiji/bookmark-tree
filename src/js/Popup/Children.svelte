<script>
  import { sortBy, moveDirectoriesToListTop } from '../store'
  import Node from './Node.svelte'

  export let level
  export let nodes

  function sortByUserPreference (children) {
    switch ($sortBy) {
      case 'index':
        return children.sort((a, b) => a.index - b.index)
      case 'id':
        return children.sort((a, b) => a.id - b.id)
      case 'dateAdded':
        return children.sort((a, b) => a.dateAdded - b.dateAdded)
      case 'title':
        return children.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  function sort (children) {
    children = sortByUserPreference(children)

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
