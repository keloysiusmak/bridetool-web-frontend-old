<template>
  <div id="panel_quickstart">
    <div class="has-text-centered">
      <p class="title is-spaced is-3">
        Bridetool is a tool to help<br/> couples with their wedding planning.
      </p>
      <p class="subtitle is-5">
        Here's how you can make you can full use of what we do.
      </p>
      <div class="container has-text-centered" style="max-width:640px;">
        <figure class="image is-4by3">
          <img src="../../../assets/img/temp1.png">
        </figure>
      </div>
    </div>
    <br/>
    <div class="has-text-left">
      <p class="title is-spaced is-3">
        More details.
      </p>
      <p class="subtitle is-5">
        Here's how you can make you can full use of what we do.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');
const scheduleHandler = require('../../../handlers/scheduleHandler');
const moment = require('moment');

export default {
  name: 'Panel-Quickstart',
  props: ['scheduleId'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
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
