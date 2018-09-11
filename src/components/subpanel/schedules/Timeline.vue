<template>
  <div v-if="!schedule || deleteLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule && parsedSchedule">
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
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deleteActivityModal -->
    <br/>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <p class="title is-5">{{this.schedule.name}}</p>
    <template v-if="!parsedScheduleCount">
      <p class="is-size-6">
        Hey! It seems you haven't added any activities to your schedule.
      </p>
      <br/>
      <p class="is-size-6">
        Head on over <router-link to="/activities">here</router-link> to add some activities, so we can start getting organized!
      </p>
    </template>
    <template v-if="parsedScheduleCount" v-for="(activities, date) in parsedSchedule">
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
            <br/>
            <p class="is-size-7" v-if="!isCompletedActivity(activity)">
              <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link> &#183; <a v-on:click="confirmDeleteActivity(activity._id);">Delete Activity</a>
            </p>
          </div>
          <div class="media-right">
            <span class="icon is-small is-left">
              <i v-bind:class="getIcon(activity.type)"></i>
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
  props: ['scheduleId'],
  data() {
    return {
      deleteActivityModal: false,
      activity: null,
      localSuccess: null,
      deleteLoading: false
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
    },
    parsedScheduleCount: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      }).length;
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
      const filteredParties = parties.filter(function(party) {
        return !party.isDeleted;
      }).map(function(party){
        return party.firstName + " " + party.lastName;
      }).join(", ");
      return (filteredParties) ? filteredParties : 'None';
    },
    confirmDeleteActivity: function(activityId) {
      this.deleteActivityModal = true;
      this.activity = this.schedule.scheduleActivities.find(activity => {
        return activity._id === activityId;
      });
    },
    isActualDay: function(activityDate) {
      const formattedDate = moment.unix(this.schedule.date).format('D MMMM Y');
      return (formattedDate === activityDate);
    },
    isCompletedActivity: function(activity) {
      return activity.endTime < Date.now() / 1000;
    },
    deleteActivity: async function(activityId) {
      this.deleteActivityModal = false;
      this.deleteLoading = true;
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
        console.log(e);
      }
      this.deleteLoading = false;
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
    },
    getIcon: function(activityType) {
      let returnedIcon;

      switch(activityType) {
        case 'teaceremony':
          returnedIcon = 'fas fa-coffee';
          break;
        case 'travel':
          returnedIcon = 'fas fa-car-alt';
          break;
        case 'makeup':
          returnedIcon = 'fas fa-paint-brush';
          break;
        case 'banquet':
          returnedIcon = 'fas fa-utensils';
          break;
        case 'rest':
          returnedIcon = 'fas fa-bed';
          break;
        case 'photoshoot':
          returnedIcon = 'fas fa-camera-retro';
          break;
        case 'preparation':
          returnedIcon = 'fas fa-solar-panel';
          break;
        case 'others':
          returnedIcon = 'fab fa-mixcloud';
          break;
      }
      return returnedIcon;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
