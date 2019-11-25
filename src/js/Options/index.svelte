<script>
  import T from './Translation.svelte'
  import Appearance from './Appearance.svelte'
</script>

<div class='container'>
  <h1><T key='optionsPage' /></h1>

  <div class='row'>
    <section class='col-4'>
      <Appearance />
    </section>

    <section class='col-4'>
      <h2><T key='behavior' /></h2>
    </section>

    <section class='col-4'>
      <h2><T key='shortcuts' /></h2>

      TODO...
    </section>
  </div>
</div>
