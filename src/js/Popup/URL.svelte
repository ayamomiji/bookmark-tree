<script>
  import { hoveringNode } from '../store'
</script>

<style>
  #url {
    border-top: 1px solid gray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

<div id='url'>
  {#if $hoveringNode}
    {#if $hoveringNode.children}
      {$hoveringNode.children.length} item(s).
    {:else}
      {$hoveringNode.url}
    {/if}
  {/if}
  &nbsp;
</div>
