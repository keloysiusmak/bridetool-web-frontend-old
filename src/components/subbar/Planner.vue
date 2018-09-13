<template>
  <div id="nav_default">
    <nav class="navbar subbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-menu container is-active">
        <div class="navbar-start">
          <router-link to="/budget" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'budget' }">
            Budget
          </router-link>
          <a class="navbar-item is-size-7 has-text-grey">
            <i>(this component is still under development)</i>
          </a>
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
