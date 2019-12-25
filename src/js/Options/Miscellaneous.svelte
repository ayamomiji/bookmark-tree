<script>
  import T from './Translation.svelte'
  import {
    rememberOpenedDirectories, moveDirectoriesToListTop, disableSearchBar,
    rootDirectory, sortBy
  } from '../store'
  import DirectorySelect from './DirectorySelect.svelte'

  $: localStorage.setItem('rememberOpenedDirectories',
                          $rememberOpenedDirectories)
  $: localStorage.setItem('moveDirectoriesToListTop',
                          $moveDirectoriesToListTop)
  $: localStorage.setItem('disableSearchBar',
                          $disableSearchBar)
  $: localStorage.setItem('rootDirectory', $rootDirectory)
  $: localStorage.setItem('sortBy', $sortBy)
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

<div class='form-check'>
  <input class='form-check-input' type='checkbox' id='disableSearchBar'
      bind:checked={$disableSearchBar}>
  <label class='form-check-label' for='disableSearchBar'>
    <T key='disableSearchBar' />
  </label>
</div>

<div class='form-group'>
  <label for='rootDirectory'>
    <T key='rootDirectory' />
  </label>
  <DirectorySelect bind:value={$rootDirectory} />
</div>

<div class='form-group'>
  <label for='sortBy'>
    <T key='sortBy' />
  </label>
  <select class='form-control' id='sortBy' bind:value={$sortBy}>
    <option value='index'><T key='index' /></option>
    <option value='id'><T key='id' /></option>
    <option value='dateAdded'><T key='dateAdded' /></option>
    <option value='title'><T key='title' /></option>
  </select>
</div>
