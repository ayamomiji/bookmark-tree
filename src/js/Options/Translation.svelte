<script>
  export let key
</script>

{chrome.i18n.getMessage(key) || `translation missing: ${key}`}
