<template>
  <div id="main_schedules">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li class="is-active"><a href="#" aria-current="page">Schedules</a></li>
      </ul>
    </nav>
    <div>
      <p class="title is-1">Hey There!</p>
      <p class="subtitle is-4">Click on a schedule on the left to get started.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

export default {
  name: 'Main-Schedules',
  methods: {
    ...mapMutations([
      'setState'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
