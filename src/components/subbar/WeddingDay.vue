<template>
  <div id="nav_default">
    <nav class="navbar subbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link to="/schedule" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'schedule' }">
            Schedule
          </router-link>
          <router-link to="/party" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'party' }">
            Wedding Party
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Nav-Default',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['subbarSelected'],
  methods: {
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
