<script>
  import { hoveringNode } from '../store'
</script>

<style>
  #url {
    border-top: 1px solid lightgray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;
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
