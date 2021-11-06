<template>
  <li :class="['Item', {'--Highlight': item.highlighted}]">
    {{ item.name }}
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ["item"],
};
</script>

<style lang="scss">
.Item {
  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }
  padding: 2px;
  padding-left: 20px;
  min-height: 40px;
  display: flex;
  align-items: center;

  &.--Highlight {
    background-color: #ffe70c88;
  }
}
</style>
