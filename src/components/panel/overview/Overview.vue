<template>
  <div id="panel_overview">
    <div class="box">
      <p class="title is-4">Hey, {{ loggedInMember.firstName + " " + loggedInMember.lastName }}</p>
      <p class="is-size-6">
        Thank you for helping us in our step to make the challenges of wedding planning a thing of the past. We're committed to finding ways to help couples better plan their weddings, in the hope that the stresses of
        wedding planning will cease to exist and couples can fully immerse themselves in enjoying one of the biggest days in their lives.
        <br/><br/>
        Bridetool is still in its <strong>beta testing</strong> stage and we're always working to make bridetool more useful for couples and for you, and we would always love feedback on how we can make this better. Feel free to let us know by dropping us an email at
        <a href="mailto:keloysiusmak@hotmail.com">keloysiusmak@hotmail.com</a>. We deeply appreciate the constructive feedback and we can't wait to make this better for you.
      </p>
      <br/>
      <p class="title is-6">WITH LOVE, THE BRIDETOOL TEAM</p>
    </div>
    <div class="box">
      <p class="title is-4">Still unsure on how to use Bridetool?</p>
      <p class="subtitle is-6 has-text-grey">
        Run through the quick start guide! It has everything you need to
        know to get up and running with Bridetool.
      </p>
      <p class="subtitle is-6 has-text-grey">
        <router-link :to="{ path: 'quickstart' }" class="is-size-6">
          Take the Quick Start Guide &nbsp;
          <span class="icon is-small is-left">
          <i class="fas fa-arrow-circle-right"></i>
          </span>
        </router-link>
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
  name: 'Panel-Overview',
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
