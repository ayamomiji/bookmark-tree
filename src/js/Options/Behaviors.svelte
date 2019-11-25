<script>
  import T from './Translation.svelte'
  import {
    bookmarkLeftBehavior, bookmarkMiddleBehavior, bookmarkRightBehavior,
    directoryLeftBehavior, directoryMiddleBehavior, directoryRightBehavior
  } from '../store'

  $: localStorage.setItem('bookmarkLeftBehavior', $bookmarkLeftBehavior)
  $: localStorage.setItem('bookmarkMiddleBehavior', $bookmarkMiddleBehavior)
  $: localStorage.setItem('bookmarkRightBehavior', $bookmarkRightBehavior)
  $: localStorage.setItem('directoryLeftBehavior', $directoryLeftBehavior)
  $: localStorage.setItem('directoryMiddleBehavior', $directoryMiddleBehavior)
  $: localStorage.setItem('directoryRightBehavior', $directoryRightBehavior)
</script>

<h2><T key='behaviors' /></h2>

<h3><T key='bookmarkBehaviors' /></h3>

<div class='form-group'>
  <label for='bookmarkLeftBehavior'>
    <T key='bookmarkLeftBehavior' />
  </label>
  <select class='form-control' id='bookmarkLeftBehavior'
      bind:value={$bookmarkLeftBehavior}>
    <option value='openInNewTab'><T key='openInNewTab' /></option>
    <option value='openInCurrentTab'><T key='openInCurrentTab' /></option>
    <option value='openInBackgroundTab'><T key='openInBackgroundTab' /></option>
    <option value='openInNewWindow'><T key='openInNewWindow' /></option>
  </select>
</div>

<div class='form-group'>
  <label for='bookmarkMiddleBehavior'>
    <T key='bookmarkMiddleBehavior' />
  </label>
  <select class='form-control' id='bookmarkMiddleBehavior'
      bind:value={$bookmarkMiddleBehavior}>
    <option value='openInNewTab'><T key='openInNewTab' /></option>
    <option value='openInCurrentTab'><T key='openInCurrentTab' /></option>
    <option value='openInBackgroundTab'><T key='openInBackgroundTab' /></option>
    <option value='openInNewWindow'><T key='openInNewWindow' /></option>
  </select>
</div>

<div class='form-group'>
  <label for='bookmarkRightBehavior'>
    <T key='bookmarkRightBehavior' />
  </label>
  <select class='form-control' id='bookmarkRightBehavior'
      bind:value={$bookmarkRightBehavior}>
    <option value='openInNewTab'><T key='openInNewTab' /></option>
    <option value='openInCurrentTab'><T key='openInCurrentTab' /></option>
    <option value='openInBackgroundTab'><T key='openInBackgroundTab' /></option>
    <option value='openInNewWindow'><T key='openInNewWindow' /></option>
  </select>
</div>

<h3><T key='directoryBehaviors' /></h3>

<div class='form-group'>
  <label for='directoryLeftBehavior'>
    <T key='directoryLeftBehavior' />
  </label>
  <select class='form-control' id='directoryLeftBehavior'
      bind:value={$directoryLeftBehavior}>
    <option value='toggle'><T key='toggle' /></option>
    <option value='openAllInCurrentWindow'><T key='openAllInCurrentWindow' /></option>
    <option value='openAllInNewWindow'><T key='openAllInNewWindow' /></option>
  </select>
</div>

<div class='form-group'>
  <label for='directoryMiddleBehavior'>
    <T key='directoryMiddleBehavior' />
  </label>
  <select class='form-control' id='directoryMiddleBehavior'
      bind:value={$directoryMiddleBehavior}>
    <option value='toggle'><T key='toggle' /></option>
    <option value='openAllInCurrentWindow'><T key='openAllInCurrentWindow' /></option>
    <option value='openAllInNewWindow'><T key='openAllInNewWindow' /></option>
  </select>
</div>

<div class='form-group'>
  <label for='directoryRightBehavior'>
    <T key='directoryRightBehavior' />
  </label>
  <select class='form-control' id='directoryRightBehavior'
      bind:value={$directoryRightBehavior}>
    <option value='toggle'><T key='toggle' /></option>
    <option value='openAllInCurrentWindow'><T key='openAllInCurrentWindow' /></option>
    <option value='openAllInNewWindow'><T key='openAllInNewWindow' /></option>
  </select>
</div>
