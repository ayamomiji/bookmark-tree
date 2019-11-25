<script>
  import Node from './Node.svelte'

  export let node
</script>

{#each node.children as child (child.id)}
  <Node node={child} level={0} />
{/each}
