<script setup lang="ts">
const props = defineProps({
  fontSize: String,
  title: {
    default: 'blogster',
    type: String,
  },
})
</script>

<template>
  <h1 :style="{ fontSize: props.fontSize }">{{ props.title }}</h1>
</template>

<style lang="scss">
h1 {
  position: relative;
  margin: 0;
  font-family: BEYNO;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    left: -5px; top: 3px;
    display: inline-block;
    width: 26px; height: 26px;
    border-radius: 50%;
    background-color: get('color', 'primary');
    opacity: .22;
  }
}
</style>
