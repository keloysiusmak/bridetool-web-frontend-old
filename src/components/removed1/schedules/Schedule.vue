<template>
  <div id="sidebar_schedule" v-if="schedule">
    <nav class="navbar sidebar is-white" role="navigation" aria-label="sub navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'getSchedule', params: {scheduleId : schedule._id}, props: true }" append v-bind:class="{ 'is-active': sidebarSelected === 'scheduleoverview' }">Overview</router-link>
          <router-link class="navbar-item" :to="{ path: '/schedules/' + schedule._id + '/activities' }" v-bind:class="{ 'is-active': sidebarSelected === 'activities' }">All Activities</router-link>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" :to="{ path: '/schedules/' + scheduleId + '/activity' }">
            <span class="button is-success">Create Activity</span>
          </router-link>
          <router-link class="navbar-item" :to="{ path: '/schedules/' + scheduleId + '/edit' }">
            <span class="button is-link">Edit Schedule</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Sidebar-Schedule',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['scheduleId', 'sidebarSelected'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadSchedule: async function() {
      try {
        const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.scheduleId);
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
