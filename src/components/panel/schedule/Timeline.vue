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
          <div class="title is-4">Are you sure you want to delete '{{activity.name}}'?</div>
          <div class="subtitle is-6">
            You can restore this activity later, but all members assigned to this activity will be unassigned.
          </div>
          <a class="button is-danger" v-on:click="deleteActivity(); deleteActivityModal = false">Delete</a>
          <a class="button is-white" v-on:click="deleteActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-6">{{localSuccess}}</span>
    </div>
    <template v-if="!parsedScheduleCount">
      <p class="is-size-6">
        Hey! It seems you haven't added any activities to your schedule.
      </p>
      <br/>
      <p class="is-size-6">
        Head on over <router-link to="/schedule/activities">here</router-link> to add some activities, so we can start getting organized!
      </p>
    </template>

    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Timeline</span><br/>
        <span class="title is-4">{{schedule.name}}</span>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-9">
        <div class="timeline">

          <div class="timeline-item" v-if="parsedScheduleCount" v-for="(activities, date) in parsedSchedule">
            <div class="timeline-marker is-primary"></div>
            <div class="timeline-content">
              <p class="heading">{{date}}</p>
              <br/>
              <div class="box" v-for="activity in activities" v-bind:class="completedActivity(activity.endTime)">
                <div class="columns is-multiline">
                  <div class="column is-10 is-12-mobile">
                    <p class="subtitle is-7 has-text-grey-light" v-html="formatTimes(activity)"></p>
                    <p class="title is-spaced is-5 has-text-weight-bold">{{activity.name}}</p>
                    <p class="subtitle is-7">{{activity.description}}</p>
                    <p class="is-size-7 is-12-mobile is-italic has-text-grey-light">
                      <span class="icon"><i class="fas fa-users"></i></span> {{ formatMembers(activity.assignedMembers) }}
                    </p>
                  </div>
                  <div class="column is-2 has-text-right is-hidden-mobile">
                    <span class="icon is-small is-left" v-if="!isCompletedActivity(activity)">
                      <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }" class="has-text-grey-light"><i class="icon fas fa-cog"></i></router-link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
          </div>
        </div>
      </div>
      <div class="column is-3 rightbar">
        <router-link :to="{name:'ActivityAdd'}" class="button is-primary">
          Add New Activity
        </router-link>
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
    formatTime: function(activityTime) {
      const formattedTime = moment.unix(activityTime).format('h:mma');

      return formattedTime;
    },
    formatMembers: function(members) {
      const membersLength = members.filter(function(member) {
        return !member.isDeleted;
      }).length;
      let filteredMembers = members.filter(function(member) {
        return !member.isDeleted;
      }).map(function(member){
        return member.firstName + " " + member.lastName;
      });

      if (membersLength > 2) {
        filteredMembers = filteredMembers.splice(0, 2).join(", ") + " and " + (membersLength - 2) + " more...";
      } else {
        filteredMembers = filteredMembers.join(", ");
      }
      return (filteredMembers) ? filteredMembers : 'None';
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
        'completed': activityEnded
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
  .timeline-content {
    width: 100%;
    max-width: 800px
  }
  .box.completed {
    opacity: 0.4
  }
</style>
