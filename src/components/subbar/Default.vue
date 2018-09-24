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
      window.onscroll = function() {myFunction()};

      // Get the offset position of the navbar
      const sticky = $('#subbar').offset().top;

      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      function myFunction() {
        if (window.pageYOffset >= sticky) {
          $("#subbarPad").removeClass("is-hidden");
          $('#subbar').addClass("is-fixed-top");
        } else {
          $('#subbar').removeClass("is-fixed-top");
          $("#subbarPad").addClass("is-hidden");
        }
      }
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
