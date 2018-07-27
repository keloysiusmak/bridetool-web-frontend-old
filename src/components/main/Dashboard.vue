<template>
  <div id="main_dashboard">
    <div v-if="loading">
      Loading...
    </div>
    <div v-for="schedule in sortedSchedules" v-if="sortedSchedules">
      <router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">{{ schedule._id }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

const scheduleHandler = require('../../handlers/scheduleHandler');

export default {
  name: 'Main-Dashboard',
  data() {
    return {
      loading: true,
      sortedSchedules: null,
      schedules: null
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
  },
  async created() {
    try {
      const getCustomerSchedules = await scheduleHandler.getCustomerSchedules(this.accessToken, this.account._id);
      this.schedules = getCustomerSchedules.schedules

      const primarySchedule = this.schedules.filter(schedule => {
        return schedule._id === this.account.primarySchedule
      });

      const secondarySchedule = this.schedules.filter(schedule => {
        return schedule._id !== this.account.primarySchedule
      });

      const preSortedSchedule = primarySchedule.concat(secondarySchedule);
      let isPrimary = true;
      this.sortedSchedules = preSortedSchedule.map(schedule => {
        schedule.isPrimary = isPrimary;
        isPrimary = false;
        return schedule;
      })

      this.loading = false;
    } catch (e) {
      this.setState({
        errors: e.message
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
