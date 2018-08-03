<template>
  <div id="main_activity">
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="activity">
      <ul>
        <li><router-link to="/schedules">Schedules</router-link></li>
        <li><router-link :to="{ name: 'getSchedule', params: {scheduleId: activity.schedule._id }, props: true }">{{ activity.schedule.name }}</router-link></li>
        <li><router-link :to="{ path: '/schedules/' + activity.schedule._id + '/activities' }">Activities</router-link></li>
        <li class="is-active"><a href="#" aria-current="page">{{activity.name}}</a></li>
      </ul>
    </nav>

    <div v-if="activity">
      <p class="title is-1">{{activity.name}}</p>
      <p class="subtitle is-4">{{formatActivityTime.startTime + " - " + formatActivityTime.endTime}}</p>
      <p>&nbsp;</p>
      <p class="title is-6">Assigned Parties</p>
      <div class="tags">
        <span class="tag is-medium" v-for="party in activity.assignedParties">
          {{ party.firstName + " " + party.lastName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');
const moment = require('moment');

export default {
  name: 'Main-Activity',
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    formatActivityTime: function() {

      const startTime = moment.unix(this.activity.startTime);
      const endTime = moment.unix(this.activity.endTime);

      const formattedStartTime = startTime.format('D MMMM Y h:mma');;
      const formattedEndTime = endTime.format('D MMMM Y h:mma');
      return {
        startTime: formattedStartTime,
        endTime: formattedEndTime
      }
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
