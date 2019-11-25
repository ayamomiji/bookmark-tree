<script>
  import T from './Translation.svelte'
  import {
    disableShortcuts, openBookmarkTreeInNewTab, openBookmarkTreeInNewWindow
  } from '../store'
  import ShortcutInput from './ShortcutInput.svelte'

  $: localStorage.setItem('disableShortcuts', $disableShortcuts)
  $: localStorage.setItem('openBookmarkTreeInNewTab',
                          JSON.stringify($openBookmarkTreeInNewTab))
  $: localStorage.setItem('openBookmarkTreeInNewWindow',
                          JSON.stringify($openBookmarkTreeInNewWindow))
</script>

<h2><T key='shortcuts' /></h2>

<div class='form-check'>
  <input class='form-check-input' type='checkbox' id='disableShortcuts'
      bind:checked={$disableShortcuts}>
  <label class='form-check-label' for='disableShortcuts'>
    <T key='disableShortcuts' />
  </label>
</div>

<div class='form-group'>
  <label><T key='openBookmarkTreeInNewTab' /></label>
  <ShortcutInput bind:value={$openBookmarkTreeInNewTab} />
</div>

<div class='form-group'>
  <label><T key='openBookmarkTreeInNewWindow' /></label>
  <ShortcutInput bind:value={$openBookmarkTreeInNewWindow} />
</div>
