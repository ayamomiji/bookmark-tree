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

#tree &#123;
  width: {$width}px;
  height: {$height}px;
}

#url &#123;
  width: {$width}px;
}

{$customStyle}
</div>
