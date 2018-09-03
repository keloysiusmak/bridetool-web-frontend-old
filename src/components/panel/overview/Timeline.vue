<template>
  <div id="main_schedule" v-if="schedule && parsedSchedule">
    <br/>
    <div class="timeline is-centered">
      <header class="timeline-header">
        <span class="tag is-medium is-primary">{{schedule.name}}</span>
      </header>
      <div class="timeline-item">
      </div>
      <template v-for="(activities, date) in parsedSchedule">
        <header class="timeline-header">
          <span class="tag is-small is-secondary">{{date}}</span>
        </header>
        <div class="timeline-item" v-for="activity in activities">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <p class="heading">{{formatTime(activity.startTime)}} - {{formatTime(activity.endTime)}}</p>
            <p class="title is-5">{{activity.name}}</p>
            <p class="subtitle is-7">{{activity.description}}</p>
          </div>
        </div>
      </template>
      <div class="timeline-item">
        <div class="timeline-marker">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');
const scheduleHandler = require('../../../handlers/scheduleHandler');
const moment = require('moment');

export default {
  name: 'Main-Schedule',
  props: ['scheduleId'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    parsedSchedule: function() {
      let scheduleDates = {};
      const activeActivities = this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      }).sort((activity1, activity2) => {
        return activity1.startTime - activity2.startTime
      }).forEach(activity => {
        const formattedTime = moment.unix(activity.startTime).format('D MMMM Y');
        if (scheduleDates[formattedTime]) {
          scheduleDates[formattedTime].push(activity);
        } else {
          scheduleDates[formattedTime] = [activity];
        }
      });

      return scheduleDates;
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    formatTime: function(activity) {
      const formattedTime = moment.unix(activity).format('h:mma');

      return formattedTime;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
