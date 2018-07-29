<template>
  <div id="main_activity">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link :to="{ name: 'getSchedule', params: {scheduleId: activity.scheduleId }, props: true }">back to {{ activity.scheduleId }}</router-link>
      <br/>
      <router-link :to="{ path: 'edit' }" append>edit</router-link>
      <br/>
      Activity Name : {{activity.name}}
      <br/>
      Start Time : {{activity.startTime}}
      <br/>
      End Time : {{activity.endTime}}
      <br/>
      Deleted : {{activity.isDeleted}}
      <br/>
      <div v-for="activity in activity.activityActivities">
        Activity: {{activity.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');

export default {
  name: 'Main-Activity',
  data() {
    return {
      loading: true,
      activity: null,
      errors: []
    }
  },
  props: ['activityId'],
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
      const getActivity = await activityHandler.getActivity(this.accessToken, this.activityId);
      this.activity = getActivity.activity;
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
