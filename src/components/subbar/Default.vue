<template>
  <div id="nav_default">
    <nav class="navbar subbar is-white" id="subbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-menu is-active">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'overview' }">
              Overview
            </router-link><router-link to="/quickstart" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'quickstart' }">
              Quick Start
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
  import 'jquery'

  export default {
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
