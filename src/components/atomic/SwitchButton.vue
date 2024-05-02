<template>
  <div class="form-check form-switch">
    <input :id="'flexSwitchCheckDefault'" class="form-check-input" type="checkbox" role="switch" v-model="switchState" />
    <label class="form-check-label" :for="['flexSwitchCheckDefault']">
      {{ label }}
    </label>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  props: ['label', 'initialSwitchState'],
  setup(props) {
    const switchState = ref(props.initialSwitchState)
    return {
      switchState,
    };
  },
  watch: {
    switchState(newVal) {
      this.$emit('switchStateChanged', newVal)
    }
  }
}
</script>
