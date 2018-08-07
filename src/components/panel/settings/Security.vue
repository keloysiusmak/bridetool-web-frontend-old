<template>
  <div id="main_schedule" v-if="schedule">
    <p class="title is-4">Security Settings</p>
    <router-link :to="{ path: '/security/password' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'password' }">
      <span class="icon is-small is-left">
        <i class="fab fa-fly"></i>
      </span>&nbsp;
      Password
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule',
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
    ]),
    loadSchedule: async function() {
      try {
        const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.account.couple.schedule);
        this.setState({
          schedule: getSchedule.schedule
        });
        this.loading = false;
      } catch (e) {
        console.log(e.details);
      }
    }
  },
  async created() {
    this.loadSchedule();
  },
  async mounted() {
    EventBus.$on('loadSchedule', payload => {
      this.loadSchedule();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
