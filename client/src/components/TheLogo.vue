<script setup>
import { useNamespace } from '@icxy/ns'

const ns = useNamespace('logo')
</script>

<template>
  <div :class="ns()">
    <img :class="ns.child('img')" src="/logo.svg" alt="logo">
    <h1>BLOG SYSTEM</h1>
  </div>
</template>

<style lang="scss">
@include b(logo) {
  display: flex;
  gap: 8px;
  align-items: center;
  user-select: none;

  @include e(img) {
    width: 32px;
  }
  h1 {
    margin: 0;
    font-size: 24px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
}
</style>
