<template>
  <div id="sidebar_schedule" v-if="schedules">
    <nav class="navbar subbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/schedules/" v-bind:class="{ 'is-active': sidebarSelected === 'schedulesoverview' }">Overview</router-link>
          <router-link class="navbar-item" :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }" v-for="schedule in activeSchedules" :key="schedule._id">{{ schedule.name }}</router-link>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/schedules/create">
            <span class="button is-small is-success">Create Schedule</span>
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
  props: ['sidebarSelected'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeSchedules: function() {
      return this.schedules.filter(schedule => {
        return !schedule.isDeleted;
      });
    },
    deletedSchedules: function() {
      return this.schedules.filter(schedule => {
        return schedule.isDeleted;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  },
  async mounted() {
    EventBus.$on('loadSchedules', payload => {
      this.loadSchedules();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
