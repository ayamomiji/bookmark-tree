<script>
  import { onMount, onDestroy } from 'svelte'
  import { width, height, fontFace, fontSize, customStyle } from '../store'

  let ref
  let styleTag

  onMount(() => {
    styleTag = document.createElement('style')
    document.body.appendChild(styleTag)
    styleTag.textContent = ref.textContent
  })

  onDestroy(() => {
    document.body.removeChild(styleTag)
  })
</script>

<div bind:this={ref} style='display: none;'>
body &#123;
  font-family: {$fontFace};
  font-size: {$fontSize};
}

{#if location.search === '?full'}
#tree &#123;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 1em;
  right: 0;
}

#url &#123;
  width: 100%;
  position: fixed;
  bottom: 0;
}
{:else}
#tree &#123;
  width: {$width}px;
  height: {$height}px;
}

#url &#123;
  width: {$width}px;
}
{/if}

{$customStyle}
</div>
