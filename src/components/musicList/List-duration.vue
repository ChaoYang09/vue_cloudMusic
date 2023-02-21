<template>
  <span class="gray default">{{ scope.row.dt | timeFormat }}</span>
</template>

<script>
export default {
  props: {
    scope: {
      require: true,
    },
  },
}
</script>

<style></style>
