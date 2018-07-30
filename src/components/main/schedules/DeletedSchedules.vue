<template>
  <div id="main_schedules">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <div>
        <router-link to="/schedules">Active</router-link> / <router-link to="/schedules/deleted">Deleted</router-link>
      </div>
      <div v-for="schedule in schedules">
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
      loading: true,
      schedules: null,
      errors: []
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
      const getDeletedCustomerSchedules = await scheduleHandler.getDeletedCustomerSchedules(this.tokens, this.account._id);
      this.schedules = getDeletedCustomerSchedules.schedules;
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
