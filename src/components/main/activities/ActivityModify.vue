<template>
  <div id="main_activity_edit">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link v-if="modifyType === 'edit'" :to="{ name: 'getActivity', params: {activityId: activity._id }, props: true }">back to {{ activity.name }}</router-link>
      <router-link v-if="modifyType === 'create'" :to="{ name: 'getSchedule', params: {scheduleId: this.scheduleId }, props: true }">back to schedule</router-link>
      <br/>
      <div v-if="modifyType === 'create'">
        CREATING ACTIVITY
      </div>
      <div v-if="modifyType === 'edit'">
        EDITING Activity Name : {{activity.name}}
      </div>
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
        <br/><br/>
        Activity Assigned Parties:
        <br/>
        {{activityAssignedPartiesId}}
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
const tokenHandler = require('../../../handlers/tokenHandler');

export default {
  name: 'Main-Activity-Edit',
  data() {
    return {
      loading: true,
      activity: null,
      errors: [],
      activityName: null,
      activityStartTime: null,
      activityEndTime: null,
      activityAssignedParties: [],
      activityAssignedPartiesId: []
    }
  },
  props: ['activityId', 'modifyType', 'scheduleId'],
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
        if (this.modifyType === 'edit') {
          this.updateActivity();
        } else if (this.modifyType === 'create') {
          this.addActivity();
        }
      }
    },
    updateActivity: async function() {
      try {
        const fields = {
          name: this.activityName,
          startTime: this.activityStartTime,
          endTime: this.activityEndTime,
          assignedParties: this.activityAssignedPartiesId
        }
        const updateActivity = await activityHandler.updateActivity(this.tokens, this.activity._id, fields);
        this.activity = updateActivity.activity;
        this.populateFields();
        console.log("SUCCESSFULLY UPDATED ACTIVITY");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    addActivity: async function() {
      try {
        const fields = {
          name: this.activityName,
          startTime: this.activityStartTime,
          endTime: this.activityEndTime,
          assignedParties: this.activityAssignedPartiesId
        }
        const addActivity = await activityHandler.addActivity(this.tokens, this.scheduleId, fields);
        this.activity = addActivity.activity;
        this.populateFields();
        console.log("SUCCESSFULLY ADDED ACTIVITY");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    populateFields: function() {
      this.activityName = this.activity.name;
      this.activityStartTime = this.activity.startTime;
      this.activityEndTime = this.activity.endTime;
      this.activityAssignedPartiesId = this.activity.assignedParties.map(party => {
        return party._id;
      });
      this.activityAssignedParties = this.activity.assignedParties;
    }
  },
  async created() {
    try {
      if (this.modifyType === 'edit') {
        const getActivity = await activityHandler.getActivity(this.tokens, this.activityId);
        this.activity = getActivity.activity;
        this.populateFields();
      }
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
