<template>
  <div id="main_schedule" v-if="schedule">
    <p class="title is-1">{{schedule.name}}</p>
    <p class="subtitle is-4">Activities</p>

    <div class="tile is-ancestor">
      <div class="tile is-6 is-vertical">
        <router-link :to="{ name: 'getActivity', params: {activityId: activity._id }, props: true }" class="tile is-child notification is-link"  v-for="activity in activeActivities" :key="activity._id">
          <p class="title is-4">{{activity.name}}</p>
          <p class="subtitle is-6">{{formatTime(activity.startTime)}}</p>
        </router-link>
        <router-link :to="{ name: 'getActivity', params: {activityId: activity._id }, props: true }" class="tile is-child notification is-light"  v-if="showDeleted" v-for="activity in deletedActivities" :key="activity._id">
          <p class="title is-4">{{activity.name}}</p>
          <p class="subtitle is-6">{{formatTime(activity.endTime)}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');
const moment = require('moment');

export default {
  name: 'Main-Schedule',
  props: ['scheduleId'],
  data() {
    return {
      showDeleted: true
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      });
    },
    deletedActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return activity.isDeleted;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    formatTime: function(activity) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      const formattedTime = moment.unix(activity).format('D MMMM Y h:mma');

      return formattedTime;
    }
  },
  watch: {
    '$route.params.scheduleId': function () {
      this.loadSchedule();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
