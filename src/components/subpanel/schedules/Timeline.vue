<template>
  <div id="subpanel_timeline" v-if="schedule && parsedSchedule">
    <br/>
    <template v-for="(activities, date) in parsedSchedule">
      <p class="title is-6">{{date}}</p>
      <progress class="progress is-small is-success" v-bind:value="completedActivities(activities)" max="100"></progress>
      <template v-for="activity in activities">
        <article class="media" v-bind:class="completedActivity(activity.endTime)">
          <div class="media-left">
            <p class="is-size-6"><small>{{formatTime(activity.startTime)}} - {{formatTime(activity.endTime)}}</small></p>
          </div>
          <div class="media-content">
            <p class="is-size-6 has-text-weight-bold">{{activity.name}}</p>
            <p class="is-size-7">{{activity.description}}</p>
            <br/>
            <p class="is-size-7">
              <span class="has-text-weight-bold">Involved:</span>
              {{ formatParties(activity.assignedParties) }}
            </p>
          </div>
          <div class="media-right">
            <span class="icon is-small is-left">
              <i class="fas fa-th-list"></i>
            </span>
          </div>
        </article>
      </template>
      <br/>
    </template>
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
    },
    formatParties: function(parties) {
      const filteredParties = parties.map(function(party){
        return party.firstName + " " + party.lastName;
      }).join(", ");
      return (filteredParties) ? filteredParties : 'None';
    },
    isActualDay: function(activityDate) {
      const formattedDate = moment.unix(this.schedule.date).format('D MMMM Y');
      return (formattedDate === activityDate);
    },
    completedActivity: function(activityEndTime) {
      const activityEnded = activityEndTime < Date.now() / 1000;
      return {
        'has-text-grey-lighter': activityEnded
      }
    },
    completedActivities: function(activities) {
      const totalActivities = activities.length;
      let completed = 0;
      activities.forEach((activity) => {
        if (activity.endTime < Date.now() / 1000) {
          completed++;
        }
      });
      return completed / totalActivities * 100;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
