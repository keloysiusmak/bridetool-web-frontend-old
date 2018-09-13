<template>
  <div id="nav_default">
    <nav class="navbar subbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-menu container is-active">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'overview' }">
            Overview
          </router-link><router-link to="/quickstart" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'quickstart' }">
            Quick Start
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
