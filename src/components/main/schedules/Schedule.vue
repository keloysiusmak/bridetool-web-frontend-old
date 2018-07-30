<template>
  <div id="main_schedule">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      {{schedule.name}}
      <br/>
      <router-link :to="{ path: 'newactivity' }" append>new activity</router-link><br/>
      <router-link :to="{ path: 'edit' }" append>edit</router-link><br/>
      <div v-on:click="removeSchedule();" v-if="!schedule.isDeleted">delete</div>
      <div v-on:click="restoreSchedule();" v-if="schedule.isDeleted">restore</div>
      <br/>
      Active:
      <div v-for="activity in activeActivities">
        <router-link :to="{ name: 'getActivity', params: {activityId: activity._id }, props: true }">Activity: {{activity.name}}</router-link>
      </div>
      <br/>
      Deleted:
      <div v-for="activity in deletedActivities">
        <router-link :to="{ name: 'getActivity', params: {activityId: activity._id }, props: true }">Activity: {{activity.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule',
  data() {
    return {
      loading: true,
      schedule: null,
      errors: []
    }
  },
  props: ['scheduleId'],
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
    removeSchedule: async function() {
      try {
        const removeSchedule = await scheduleHandler.removeSchedule(this.tokens, this.scheduleId);
        this.schedule = removeSchedule.schedule;
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    restoreSchedule: async function() {
      try {
        const restoreSchedule = await scheduleHandler.restoreSchedule(this.tokens, this.scheduleId);
        this.schedule = restoreSchedule.schedule;
      } catch (e) {
        this.errors.push(e.details);
      }
    }
  },
  async created() {
    try {
      const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.scheduleId);
      this.schedule = getSchedule.schedule;
      this.loading = false;
    } catch (e) {
      this.errors.push(e.details);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
