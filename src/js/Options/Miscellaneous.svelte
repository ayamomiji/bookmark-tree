<script>
  import T from './Translation.svelte'
  import { rememberOpenedDirectories } from '../store'

  $: localStorage.setItem('rememberOpenedDirectories',
                          $rememberOpenedDirectories)
</script>

<h2><T key='misc' /></h2>

<div class='form-check'>
  <input class='form-check-input' type='checkbox' id='rememberOpenedDirectories'
      bind:checked={$rememberOpenedDirectories}>
  <label class='form-check-label' for='rememberOpenedDirectories'>
    <T key='rememberOpenedDirectories' />
  </label>
</div>
