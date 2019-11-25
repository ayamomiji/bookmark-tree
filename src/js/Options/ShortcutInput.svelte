<script>
  import T from './Translation.svelte'

  export let value

  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
</script>

<div class='form-row'>
  <div class='col'>
    <select class='form-control' bind:value={value.modifier}>
      <option value='ctrl'><T key='ctrl' /></option>
      <option value='alt'><T key='alt' /></option>
      <option value='meta'><T key='meta' /></option>
    </select>
  </div>
  <div class='col'>
    <select class='form-control' bind:value={value.key}>
      {#each keys as key (key)}
        <option value={key.toLowerCase()}>{key}</option>
      {/each}
    </select>
  </div>
</div>
