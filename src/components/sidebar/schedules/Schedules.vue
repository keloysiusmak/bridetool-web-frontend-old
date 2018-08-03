<template>
  <div id="sidebar_schedule">
    <div v-if="schedules">
      <aside class="menu">
        <ul class="menu-list">
          <li><router-link to="/schedules/" v-bind:class="{ 'is-active': sidebarSelected === 'schedulesoverview' }">Overview</router-link></li>
        </ul>
        <p>&nbsp;</p>
        <p class="menu-label">Schedules</p>
        <ul class="menu-list">
          <li><router-link to="/schedules/create" v-bind:class="{ 'is-active': sidebarSelected === 'createschedule' }">Create Schedule</router-link></li>
          <li v-for="schedule in activeSchedules"><router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">{{ schedule.name }}</router-link></li>
        </ul>
      </aside>
    </div>
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
    ]),
    loadSchedules: async function() {
      try {
        this.setState({
          schedules: null
        })
        const getSchedules = await scheduleHandler.getSchedules(this.tokens, this.account._id);
        this.setState({
          schedules: getSchedules.schedules
        })
      } catch (e) {
        console.log(e.details);
      }
    }
  },
  async created() {
    this.loadSchedules();
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
