<template>
  <div>
    <nav class="navbar subbar is-white" id="subbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-menu is-active">
          <div class="navbar-start"><router-link to="/schedule" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'schedule' }">
              Schedule
            </router-link><router-link to="/budget" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'budget' }">
              Budget
            </router-link><router-link to="/member" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'member' }">
              Wedding Team
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <nav class="navbar subbar subbarPad is-hidden" id="subbarPad" role="navigation" aria-label="main navigation">
      &nbsp;
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
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
