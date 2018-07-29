<template>
  <div id="main_activity_edit">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link :to="{ name: 'getActivity', params: {scheduleId: activity._id }, props: true }">back to {{ activity.name }}</router-link>
      <br/>
      EDITING Activity Name : {{activity.name}}
      <br/>

      <form v-on:submit.prevent="checkForm();">
        Activity Name:
        <br/>
        <input placeholder="Activity Name" v-model="activityName"/>
        <br/><br/>
        Activity Start Time:
        <br/>
        <input placeholder="Activity Start Time" v-model="activityStartTime"/>
        <br/><br/>
        Activity End Time:
        <br/>
        <input placeholder="Activity End Time" v-model="activityEndTime"/>
        <br/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');

export default {
  name: 'Main-Activity-Edit',
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
    checkForm: async function() {
      this.errors = [];
      if (!this.activityName) {
        this.errors.push("Activity Name Missing");
      }

      if (!this.activityStartTime) {
        this.errors.push("Start Time Missing");
      }

      if (!this.activityEndTime) {
        this.errors.push("End Time Missing");
      }

      if (!this.errors.length) {
        this.updateActivity();
      }
    },
    updateActivity: async function() {
      try {
        const fields = {
          name: this.activityName,
          startTime: this.activityStartTime,
          endTime: this.activityEndTime
        }
        const updateActivity = await activityHandler.updateActivity(this.accessToken, this.activity._id, fields);
        this.activity = updateActivity.activity;
        this.populateFields();
        console.log("SUCCESSFULLY UPDATED ACTIVITY");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    populateFields: function() {
      this.activityName = this.activity.name;
      this.activityStartTime = this.activity.startTime;
      this.activityEndTime = this.activity.endTime;
    }
  },
  async created() {
    try {
      const getActivity = await activityHandler.getActivity(this.accessToken, this.activityId);
      this.activity = getActivity.activity;
      this.populateFields();
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
