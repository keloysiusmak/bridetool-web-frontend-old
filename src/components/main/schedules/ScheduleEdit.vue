<template>
  <div id="main_schedule_edit">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">back to {{ schedule.name }}</router-link>
      <br/>
      EDITING Schedule Name : {{schedule.name}}
      <br/>

      <form v-on:submit.prevent="checkForm();">
        Schedule Name:
        <br/>
        <input placeholder="Schedule Name" v-model="scheduleName"/>
        <br/><br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule-Edit',
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
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.errors = [];
      if (!this.scheduleName) {
        this.errors.push("Schedule Name Missing");
      }

      if (!this.errors.length) {
        this.updateSchedule();
      }
    },
    updateSchedule: async function() {
      try {
        const fields = {
          name: this.scheduleName
        }
        const updateSchedule = await scheduleHandler.updateSchedule(this.tokens, this.schedule._id, fields);
        this.schedule = updateSchedule.schedule;
        this.populateFields();
        console.log("SUCCESSFULLY UPDATED SCHEDULE");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    populateFields: function() {
      this.scheduleName = this.schedule.name;
    }
  },
  async created() {
    try {
      const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.scheduleId);
      this.schedule = getSchedule.schedule;
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
