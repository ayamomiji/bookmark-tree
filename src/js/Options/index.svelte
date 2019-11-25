<script>
  import T from './Translation.svelte'
  import Appearance from './Appearance.svelte'
  import Behaviors from './Behaviors.svelte'
  import Shortcuts from './Shortcuts.svelte'
</script>

<div class='container'>
  <h1><T key='optionsPage' /></h1>

  <div class='row'>
    <section class='col-4'>
      <Appearance />
    </section>

    <section class='col-4'>
      <Behaviors />
    </section>

    <section class='col-4'>
      <Shortcuts />
    </section>
  </div>
</div>
