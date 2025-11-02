<template>
  <div class="carafe">
    <slot name="top"></slot>
    <slot name="mid"></slot>
    <slot name="bottom"></slot>
  </div>
</template>

<style scoped>
.carafe {
  /* Allow foam to extend past the edge */
  min-height: 96px;
  border-radius: 0.05em 0.05em 2.2em 2.2em;
  width: 100%;
  height: 100%;
}
</style>
