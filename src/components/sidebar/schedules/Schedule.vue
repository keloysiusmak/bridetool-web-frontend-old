<template>
  <div id="sidebar_schedule" v-if="schedule">
    <aside class="menu">
      <p class="menu-label">Go back</p>
      <ul class="menu-list">
        <li><router-link to="/schedules">All Schedules</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">{{schedule.name}}</p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'getSchedule', params: {scheduleId : schedule._id}, props: true }" append v-bind:class="{ 'is-active': sidebarSelected === 'scheduleoverview' }">Overview</router-link></li>
        <li><router-link :to="{ path: '/schedules/' + schedule._id + '/activities' }" v-bind:class="{ 'is-active': sidebarSelected === 'activities' }">Activities</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">Operations</p>
      <ul class="menu-list">
        <li><router-link :to="{ path: '/schedules/' + scheduleId + '/activity' }" v-bind:class="{ 'is-active': sidebarSelected === 'createactivity' }">Create Activity</router-link></li>
        <li><router-link :to="{ path: '/schedules/' + scheduleId + '/edit' }" v-bind:class="{ 'is-active': sidebarSelected === 'editschedule' }">Edit</router-link></li>
        <li v-if="!schedule.isDeleted"><a v-on:click="removeSchedule();">Delete</a></li>
        <li v-if="schedule.isDeleted"><a v-on:click="restoreSchedule();">Restore</a></li>
      </ul>
    </aside>
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
    removeSchedule: async function() {
      try {
        const removeSchedule = await scheduleHandler.removeSchedule(this.tokens, this.scheduleId);
        this.setState({
          schedule: removeSchedule.schedule
        });
      } catch (e) {
        console.log(e);
      }
    },
    restoreSchedule: async function() {
      try {
        const restoreSchedule = await scheduleHandler.restoreSchedule(this.tokens, this.scheduleId);
        this.setState({
          schedule: restoreSchedule.schedule
        });
      } catch (e) {
        console.log(e);
      }
    },
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
