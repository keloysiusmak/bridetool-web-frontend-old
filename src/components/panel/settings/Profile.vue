<template>
  <div id="panel_profile">
    <router-link :to="{ path: '/settings/profile/email' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'email' }">
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>&nbsp;
      Email
    </router-link>
    <router-link :to="{ path: '/settings/profile/switchuser' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'switchuser' }">
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>&nbsp;
      Switch User
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Panel-Schedule',
  props: ['panelSelected'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      });
    },
    deletedActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return activity.isDeleted;
      });
    }
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
