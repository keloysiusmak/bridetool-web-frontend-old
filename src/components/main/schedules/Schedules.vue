<template>
  <div id="main_schedules">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link :to="{ path: 'create' }" append>create schedule</router-link>
      <br/>
      Active: <br/>
      <div v-for="schedule in activeSchedules">
        <router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">{{ schedule.name }}</router-link>
      </div><br/>
      Deleted: <br/>
      <div v-for="schedule in deletedSchedules">
        <router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">{{ schedule.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedules',
  data() {
    return {
      errors: [],
      loading: true,
      schedules: null
    }
  },
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
  async created() {
    try {
      const getSchedules = await scheduleHandler.getSchedules(this.tokens, this.account._id);
      this.schedules = getSchedules.schedules;
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
