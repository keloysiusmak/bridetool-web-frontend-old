<template>
  <div id="panel_overview">
    <p class="title is-5">Thank you, {{ activeParty.firstName + " " + activeParty.lastName }}</p>
    <p class="is-size-7">
      Etiam sed tincidunt purus. Pellentesque et dolor quis velit volutpat iaculis. Cras blandit, arcu vel placerat tempor, felis risus placerat purus, vitae interdum ex massa vitae turpis. Suspendisse suscipit felis sed tortor laoreet lobortis. Fusce mattis volutpat velit in aliquet. Praesent libero nunc, sodales nec nisi nec, volutpat lacinia urna. Morbi in tincidunt lectus.
      <br/><br/>
      Sed porta malesuada dolor, vel congue tortor gravida quis. Donec ut efficitur sem, id cursus tortor. Maecenas eget est sed ex maximus molestie a eget ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet finibus felis, et malesuada turpis imperdiet et. In hac habitasse platea dictumst. Nullam sapien nibh, molestie non sem in, tincidunt imperdiet libero. Ut dignissim tincidunt elementum.
    </p>
    <br/>
    <p class="title is-7">BRIDETOOL TEAM</p>
    <hr/>
    <p class="title is-6">Still unsure on how to use Bridetool?</p>
    <p class="subtitle is-7 has-text-grey">
      Run through the quick start guide! It has everything you need to
      know to get up and running with Bridetool.
    </p>
    <p class="subtitle is-7 has-text-grey">
      <router-link :to="{ path: 'quickstart' }" class="is-size-7">
        Take the Quick Start Guide &nbsp;
        <span class="icon is-small is-left">
        <i class="fas fa-arrow-circle-right"></i>
        </span>
      </router-link>
    </p>
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
