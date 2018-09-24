<template>
  <div v-if="!schedule || deleteOrRestoreLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule">
    <br/>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-6">{{localSuccess}}</span>
    </div>
    <div class="columns is-multiline">
      <div class="column has-text-right-tablet">
        <a href="#" v-on:click="toggleHideDeletedActivities()" class="button is-outlined is-small is-rounded is-hidden-mobile">
          {{ (hideDeletedActivities) ? 'Show' : 'Hide' }} Deleted Activities
        </a>
        <router-link :to="{name:'ActivityAdd'}" class="button is-primary is-small is-rounded">
          + Add New Activity
        </router-link>
      </div>
    </div>

    <template v-if="!activeActivitiesCount && hideDeletedActivities">
      <p class="is-size-6">
        No activities to show. <router-link :to="{name:'ActivityAdd'}">Add some activites</router-link> and let's get started!
      </p>
    </template>
    <template v-for="(activities, date) in activeActivities" v-if="hideDeletedActivities && activeActivitiesCount">
      <table class="table is-fullwidth is-small">
        <thead>
          <tr class="is-uppercase is-size-7">
            <th class="has-text-grey-light" width="40%">{{date}}</th>
            <th class="has-text-grey-light" width="60%">Name</th>
          </tr>
        </thead>
        <tbody>
          <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }" tag="tr" v-for="activity in activities" :key="activity._id">
            <td>
              <p class="is-size-6" v-html="formatTimes(activity)"></p>
            </td>
            <td class="is-size-6">{{activity.name}}</td>
          </router-link>
        </tbody>
      </table>
    </template>

    <template v-if="!deletedActivitiesCount && !hideDeletedActivities">
      <p class="is-size-7">
        No deleted activities to show. Deleted activities are automatically permanently cleared after 14 days.
      </p>
    </template>
    <template v-for="(activities, date) in deletedActivities" v-if="!hideDeletedActivities && deletedActivitiesCount">
      <table class="table is-fullwidth is-small">
        <thead>
          <tr class="is-uppercase is-size-7">
            <th class="has-text-grey-light" width="40%">{{date}}</th>
            <th class="has-text-grey-light" width="60%">Name</th>
          </tr>
        </thead>
        <tbody>
          <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }" tag="tr" v-for="activity in activities" :key="activity._id">
            <td>
              <p class="is-size-7" v-html="formatTimes(activity)"></p>
            </td>
            <td class="is-size-7">{{activity.name}}</td>
          </router-link>
        </tbody>
      </table>
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
      activity: null,
      localSuccess: null,
      hideDeletedActivities: true,
      deleteOrRestoreLoading: false
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivitiesCount: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      }).length;
    },
    deletedActivitiesCount: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return activity.isDeleted;
      }).length;
    },
    activeActivities: function() {
      let scheduleDates = {};
      const activeActivities = this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      }).sort((activity1, activity2) => {
        return activity1.startTime - activity2.startTime
      }).forEach(activity => {
        const formattedTime = moment.unix(activity.startTime).format('ddd, D MMM Y');
        if (scheduleDates[formattedTime]) {
          scheduleDates[formattedTime].push(activity);
        } else {
          scheduleDates[formattedTime] = [activity];
        }
      });

      return scheduleDates;
    },
    deletedActivities: function() {
      let scheduleDates = {};
      const deletedActivities = this.schedule.scheduleActivities.filter(activity => {
        return activity.isDeleted;
      }).sort((activity1, activity2) => {
        return activity1.startTime - activity2.startTime
      }).forEach(activity => {
        const formattedTime = moment.unix(activity.startTime).format('D MMM Y');
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
    hasS: function(count) {
      if (count > 1) {
        return 's';
      }
    },
    formatTimes: function(activity) {
      var start = moment.unix(activity.startTime);
      var end = moment.unix(activity.endTime);
      var duration = moment.duration(end.diff(start));
      var days = Math.floor(duration.asDays());
      let daysElapsed = '';
      if (days > 0) daysElapsed = ' <small class="has-text-grey-light"><i>(+' + days + ' day' + this.hasS(days) + ')</i></small>';
      return this.formatTime(activity.startTime) + " - " + this.formatTime(activity.endTime) + daysElapsed;
    },
    formatTime: function(activity) {
      const formattedTime = moment.unix(activity).format('h:mma');

      return formattedTime;
    },
    confirmDeleteActivity: function(activityId) {
      this.deleteActivityModal = true;
      this.activity = this.schedule.scheduleActivities.find(activity => {
        return activity._id === activityId;
      });
    },
    confirmRestoreActivity: function(activityId) {
      this.restoreActivityModal = true;
      this.activity = this.schedule.scheduleActivities.find(activity => {
        return activity._id === activityId;
      });
    },
    toggleHideDeletedActivities: function() {
      this.hideDeletedActivities = !this.hideDeletedActivities;
    },
    isCompletedActivity: function(activity) {
      return activity.endTime < Date.now() / 1000;
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
  tr {
    cursor: pointer
  }
</style>
