<script>
  import T from './Translation.svelte'
  import {
    rememberOpenedDirectories, moveDirectoriesToListTop, rootDirectory
  } from '../store'
  import DirectorySelect from './DirectorySelect.svelte'

  $: localStorage.setItem('rememberOpenedDirectories',
                          $rememberOpenedDirectories)
  $: localStorage.setItem('moveDirectoriesToListTop',
                          $moveDirectoriesToListTop)
  $: localStorage.setItem('rootDirectory', $rootDirectory)
</script>

<h2><T key='misc' /></h2>

<div class='form-check'>
  <input class='form-check-input' type='checkbox' id='rememberOpenedDirectories'
      bind:checked={$rememberOpenedDirectories}>
  <label class='form-check-label' for='rememberOpenedDirectories'>
    <T key='rememberOpenedDirectories' />
  </label>
</div>

<div class='form-check'>
  <input class='form-check-input' type='checkbox' id='moveDirectoriesToListTop'
      bind:checked={$moveDirectoriesToListTop}>
  <label class='form-check-label' for='moveDirectoriesToListTop'>
    <T key='moveDirectoriesToListTop' />
  </label>
</div>

<div class='form-group'>
  <label for='rootDirectory'>
    <T key='rootDirectory' />
  </label>
  <DirectorySelect bind:value={$rootDirectory} />
</div>
