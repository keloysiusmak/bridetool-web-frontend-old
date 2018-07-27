<template>
  <div id="main_dashboard">
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="schedule">
      {{schedule.scheduleName}}
      <br/>
      {{schedule._id}}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

const scheduleHandler = require('../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule',
  data() {
    return {
      loading: true,
      schedule: null
    }
  },
  props: ['scheduleId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
  },
  async created() {
    try {
      const getSchedule = await scheduleHandler.getSchedule(this.accessToken, this.scheduleId);
      this.schedule = getSchedule.schedule;
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
