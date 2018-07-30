<template>
  <div id="main_activity">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link v-if="!party" :to="{ name: 'getSchedule', params: {scheduleId: activity.schedule._id }, props: true }">back to {{ activity.schedule.name }}</router-link>
      <router-link v-if="party" :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">back to {{ party.firstName + " " + party.lastName }}</router-link>
      <br/>
      <router-link :to="{ path: 'edit' }" append>edit</router-link>
      <div v-on:click="removeActivity();" v-if="!activity.isDeleted && !activity.schedule.isDeleted">delete</div>
      <div v-on:click="restoreActivity();" v-if="activity.isDeleted && !activity.schedule.isDeleted">restore</div>
      <br/>
      Activity Name : {{activity.name}}
      <br/>
      Start Time : {{activity.startTime}}
      <br/>
      End Time : {{activity.endTime}}
      <br/>
      Deleted : {{activity.isDeleted}}
      <br/>
      <br/>
      <div v-for="party in activity.assignedParties">
        {{party.firstName + " " + party.lastName}}
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
  props: ['activityId', 'party'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    removeActivity: async function() {
      try {
        const removeActivity = await activityHandler.removeActivity(this.tokens, this.activityId);
        this.activity = removeActivity.activity;
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    restoreActivity: async function() {
      try {
        const restoreActivity = await activityHandler.restoreActivity(this.tokens, this.activityId);
        this.activity = restoreActivity.activity;
      } catch (e) {
        this.errors.push(e.details);
      }
    }
  },
  async created() {
    try {
      const getActivity = await activityHandler.getActivity(this.tokens, this.activityId);
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
