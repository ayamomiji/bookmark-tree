<script>
  import T from './Translation.svelte'
  import { width, height, fontFace, fontSize, customStyle } from '../store'

  $: localStorage.setItem('width', $width)
  $: localStorage.setItem('height', $height)
  $: localStorage.setItem('fontFace', $fontFace)
  $: localStorage.setItem('fontSize', $fontSize)
  $: localStorage.setItem('customStyle', $customStyle)
</script>

<h2><T key='appearance' /></h2>

<h3><T key='size' /></h3>

<div class='form-group row'>
  <label for='width' class='col-sm-2 col-form-label'>
    <T key='width' />
  </label>
  <div class='col-sm-10'>
    <input class='form-control' id='width' type='number'
        bind:value={$width} />
  </div>
</div>
<div class='form-group row'>
  <label for='height' class='col-sm-2 col-form-label'>
    <T key='height' />
  </label>
  <div class='col-sm-10'>
    <input class='form-control' id='height' type='number'
        bind:value={$height} />
  </div>
</div>

<h3><T key='font' /></h3>

<div class='form-group row'>
  <label for='fontFace' class='col-sm-2 col-form-label'>
    <T key='fontFace' />
  </label>
  <div class='col-sm-10'>
    <input class='form-control' id='fontFace' type='string'
        bind:value={$fontFace} />
  </div>
</div>
<div class='form-group row'>
  <label for='fontSize' class='col-sm-2 col-form-label'>
    <T key='fontSize' />
  </label>
  <div class='col-sm-10'>
    <input class='form-control' id='fontSize' type='string'
        bind:value={$fontSize} />
  </div>
</div>

<h3><T key='customStyle' /></h3>

<textarea class='form-control' id='fontFace' type='string' rows={10}
    bind:value={$customStyle} />
