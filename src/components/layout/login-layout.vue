<template>
  <div id="login_layout">
    <router-view name="nav"/>
    <br/>
    <hr/>
    <div style="display:inline-block">
      <router-view name="main"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'Login-Layout',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
