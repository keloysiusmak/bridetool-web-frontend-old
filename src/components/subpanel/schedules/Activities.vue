<template>
  <div v-if="!schedule || deleteOrRestoreLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule">
    <!-- START deleteActivityModal -->
    <div class="modal" v-bind:class="{ 'is-active': deleteActivityModal }" v-if="activity">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-5">Are you sure you want to delete '{{activity.name}}'?</div>
          <div class="subtitle is-7">
            You can restore this activity later, but all parties assigned to this activity will be unassigned.
          </div>
          <a class="button is-danger is-small" v-on:click="deleteActivity(); deleteActivityModal = false">Delete</a>
          <a class="button is-white is-small" v-on:click="deleteActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->

    <!-- START deleteActivityModal -->
    <div class="modal" v-bind:class="{ 'is-active': restoreActivityModal }" v-if="activity">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-5">Are you sure you want to restore '{{activity.name}}'?</div>
          <div class="subtitle is-7">
            Previously assigned parties cannot be restored.
          </div>
          <a class="button is-success is-small" v-on:click="restoreActivity(); restoreActivityModal = false">Restore</a>
          <a class="button is-white is-small" v-on:click="restoreActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->

    <br/>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <div class="columns is-multiline">
      <div class="column has-text-left">
        <p class="title is-5">{{ (hideDeletedActivities) ? 'Active' : 'Deleted' }} Activites</p>
      </div>
      <div class="column has-text-right-tablet" style="line-height:2.4rem">
        <a href="#" v-on:click="toggleHideDeletedActivities()" class="button is-outlined is-small is-rounded">
          {{ (hideDeletedActivities) ? 'Show' : 'Hide' }} Deleted Activities
        </a>
        <router-link :to="{name:'ActivityAdd'}" class="button is-secondary is-small is-rounded">
          + Add New Activity
        </router-link>
      </div>
    </div>

    <template v-if="!activeActivitiesCount && hideDeletedActivities">
      <p class="is-size-7">
        No activities to show. <router-link :to="{name:'ActivityAdd'}">Add some activites</router-link> and let's get started!
      </p>
    </template>
    <template v-for="(activities, date) in activeActivities" v-if="hideDeletedActivities && activeActivitiesCount">
      <p class="title is-6">{{date}}</p>
      <progress class="progress is-small is-success" v-bind:value="completedActivities(activities)" max="100"></progress>
      <template v-for="activity in activities">
        <article class="media columns is-multiline" v-bind:class="completedActivity(activity.endTime)">
          <div class="column is-3 is-12-mobile">
            <p class="is-size-7" v-html="formatTimes(activity)"></p>
          </div>
          <div class="column is-7 is-12-mobile">
            <p class="is-size-6 has-text-weight-bold">{{activity.name}}</p>
            <p class="is-size-7">{{activity.description}}</p>
            <br/>
            <p class="is-size-7 is-hidden-tablet" v-if="!isCompletedActivity(activity)">
              <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link> &#183; <a v-on:click="confirmDeleteActivity(activity._id);">Delete Activity</a>
            </p>
          </div>
          <div class="column is-2 is-hidden-mobile is-size-7" v-if="!isCompletedActivity(activity)">
            <ul>
              <li><router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link></li>
              <li><a v-on:click="confirmDeleteActivity(activity._id);">Delete Activity</a></li>
            </ul>
          </div>
        </article>
      </template>
      <br/>
    </template>

    <template v-if="!deletedActivitiesCount && !hideDeletedActivities">
      <p class="is-size-7">
        No deleted activities to show. Deleted activities are automatically permanently cleared after 14 days.
      </p>
    </template>
    <template v-for="(activities, date) in deletedActivities" v-if="!hideDeletedActivities && deletedActivitiesCount">
      <p class="title is-6">{{date}}</p>
      <progress class="progress is-small is-success" v-bind:value="completedActivities(activities)" max="100"></progress>
      <template v-for="activity in activities">
        <article class="media" v-bind:class="completedActivity(activity.endTime)">
          <div class="media-left">
            <p class="is-size-7" v-html="formatTimes(activity)"></p>
          </div>
          <div class="media-content">
            <p class="is-size-6 has-text-weight-bold">{{activity.name}}</p>
            <p class="is-size-7">{{activity.description}}</p>
          </div>
          <div class="media-right is-size-7" v-if="!isCompletedActivity(activity)">
            <ul>
              <li><router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link></li>
              <li><a v-on:click="confirmRestoreActivity(activity._id);">Restore Activity</a></li>
            </ul>
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
      deleteActivityModal: false,
      restoreActivityModal: false,
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
        const formattedTime = moment.unix(activity.startTime).format('D MMMM Y');
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
    deleteActivity: async function(activityId) {
      this.deleteOrRestoreLoading = true;
      this.deleteActivityModal = false;
      try {
        const deleteActivity = await activityHandler.deleteActivity(this.tokens, this.activity._id);
        const schedule = this.schedule;
        schedule.scheduleActivities = this.schedule.scheduleActivities.map(activity => {
          if (activity._id === this.activity._id) {
            activity.isDeleted = true;
            return activity;
          } else {
            return activity;
          }
        });
        this.setState({
          schedule: schedule
        })
        this.localSuccess = 'Successfully deleted activity.';
      } catch (e) {
        //
      }
      this.deleteOrRestoreLoading = false;
    },
    restoreActivity: async function(activityId) {
      this.deleteOrRestoreLoading = true;
      this.restoreActivityModal = false;
      try {
        const restoreActivity = await activityHandler.restoreActivity(this.tokens, this.activity._id);
        const schedule = this.schedule;
        schedule.scheduleActivities = this.schedule.scheduleActivities.map(activity => {
          if (activity._id === this.activity._id) {
            activity.isDeleted = false;
            return activity;
          } else {
            return activity;
          }
        });
        this.setState({
          schedule: schedule
        })
        this.localSuccess = 'Successfully restored activity.';
      } catch (e) {
        //
      }
      this.deleteOrRestoreLoading = false;
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
