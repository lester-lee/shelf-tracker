<template>
  <button :class="['ToggleButton', { '--Active': active }]" @click="onToggle">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ToggleButton",
  props: ["text"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    onToggle() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
.ToggleButton {
  width: 2.5rem;
  height: 2.5rem;
  box-shadow: $shadow;
  border-radius: 50%;
  font-size: 1.5rem;
  &.--Active {
    box-shadow: $inner-shadow;
    color: $--primary-dark;
  }
}
</style>
