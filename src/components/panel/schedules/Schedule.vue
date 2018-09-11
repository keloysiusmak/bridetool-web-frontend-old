<template>
  <div id="panel_schedule">
    <router-link :to="{ name: 'ScheduleTimeline' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'timeline' }">
      <span class="icon is-small is-left">
        <i class="fas fa-calendar-alt"></i>
      </span>&nbsp;
      Timeline
    </router-link>

    <router-link :to="{ name: 'ScheduleActivities' }" class="button is-light is-small" v-bind:class="{ 'is-primary': panelSelected === 'activities' }">
      <span class="icon is-small is-left">
        <i class="fas fa-th-list"></i>
      </span>&nbsp;
      Activities
    </router-link>

    <router-link :to="{ name: 'ScheduleManage' }" class="button is-light is-small" v-bind:class="{ 'is-primary': panelSelected === 'manage' }">
      <span class="icon is-small is-left">
        <i class="fas fa-wrench"></i>
      </span>&nbsp;
      Manage
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

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
    ]),
    loadSchedule: async function() {
      try {
        const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.account.couple.schedule);
        this.setState({
          schedule: getSchedule.schedule
        });
      } catch (e) {
        //
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
