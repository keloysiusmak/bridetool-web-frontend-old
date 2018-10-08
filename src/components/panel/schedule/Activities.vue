<template>
  <div v-if="!schedule || deleteOrRestoreLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Activities</span><br/>
        <span class="title is-4">{{schedule.name}}</span>
      </div>
    </div>
    <div class="columns">
      <div class="column is-9">
        <div v-if="localSuccess" class="notification is-success">
          <button class="delete" v-on:click="localSuccess = null"></button>
          <span class="is-size-6">{{localSuccess}}</span>
        </div>

        <template v-if="!activeActivitiesCount && hideDeletedActivities">
          <p class="is-size-6">
            No activities to show. <router-link :to="{name:'ActivityAdd'}">Add some activites</router-link> and let's get started!
          </p>
        </template>
        <template v-for="(activities, date) in activeActivities" v-if="hideDeletedActivities && activeActivitiesCount">
          <div class="box" v-for="activity in activities" :key="activity._id">
            <!-- box type 1 -->
            <div class="columns is-multiline" v-if="activity.assignedTasks.length == 0">
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
            <!-- end box type 1 -->

            <!-- box type 2 -->
            <div class="columns is-multiline" v-if="activity.assignedTasks.length > 0">
              <div class="column is-6 is-12-mobile">
                <p class="subtitle is-7 has-text-grey-light" v-html="formatTimes(activity)"></p>
                <p class="title is-spaced is-5 has-text-weight-bold">{{activity.name}}</p>
                <p class="subtitle is-7">{{activity.description}}</p>
                <p class="is-size-7 is-12-mobile is-italic has-text-grey-light">
                  <span class="icon"><i class="fas fa-users"></i></span> {{ formatMembers(activity.assignedMembers) }}
                </p>
              </div>
              <div class="column is-6 has-text-right is-hidden-mobile">
                <span class="icon is-small is-left" v-if="!isCompletedActivity(activity)">
                  <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }" class="has-text-grey-light"><i class="icon fas fa-cog"></i></router-link>
                </span>
                <div class="field has-text-left" v-for="task in activity.assignedTasks">
                  <input class="is-checkradio is-small" v-on:click="mark(task)" v-bind:id="'checkbox' + task._id" type="checkbox" v-bind:name="'checkbox' + task._id" v-bind:checked="isTaskChecked(task)">
                  <label v-bind:class="isCompletedTask(task)" v-bind:for="'checkbox' + task._id">{{task.name}}</label>
                </div>
                <p class="is-size-7 is-12-mobile is-italic has-text-left has-text-grey-light">
                  <small>{{numberCompleted(activity.assignedTasks)}} of {{activity.assignedTasks.length}} tasks completed</small>
                </p>
              </div>
            </div>
            <!-- end box type 2 -->
          </div>
        </template>

        <template v-if="!deletedActivitiesCount && !hideDeletedActivities">
          <p class="is-size-7">
            No deleted activities to show. Deleted activities are automatically permanently cleared after 14 days.
          </p>
        </template>
        <template v-for="(activities, date) in deletedActivities" v-if="!hideDeletedActivities && deletedActivitiesCount">
          <router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }" tag="div" class="box" v-for="activity in activities" :key="activity._id">
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
          </router-link>
        </template>
      </div>
      <div class="column is-3 rightbar">
        <router-link :to="{name:'ActivityAdd'}" class="button is-primary">
          Add New Activity
        </router-link>
        <a href="#" v-on:click="toggleHideDeletedActivities()" class="link toggle" v-html="showHideDeletedActivities()">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');
const scheduleHandler = require('../../../handlers/scheduleHandler');
const taskHandler = require('../../../handlers/taskHandler');
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
        const formattedTime = moment.unix(activity.startTime).format('ddd, D MMM Y');
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
    showHideDeletedActivities: function() {
      if (this.hideDeletedActivities)  {
        return '<span class="icon"><i class="far fa-eye"></i></span> Show Deleted Activities'
      } else {
        return '<span class="icon"><i class="far fa-eye-slash"></i></span> Hide Deleted Activities';
      }
    },
    hasS: function(count) {
      if (count > 1) {
        return 's';
      }
    },
    isCompletedTask: function(task) {
      if (task.status == 'completed') {
        return {
          'has-text-grey-light': true
        }
      } else {
        return {
          'has-text-grey-light': false
        }
      }
    },
    isCompletedActivity: function(activity) {
      return activity.endTime < Date.now() / 1000;
    },
    mark: function(task) {
      if (task.status === 'completed') {
        task.status = 'notstarted';
        this.markTask(task);
      } else if (task.status === 'notstarted') {
        task.status = 'completed';
        this.markTask(task);
      }
    },
    numberCompleted: function(tasks) {
      return tasks.filter((task) => {
        return task.status == 'completed';
      }).length;
    },
    isTaskChecked: function(task) {
      return (task.status === 'completed') ? 'checked' : ''
    },
    markTask: async function(task) {
      try {
        let activityId;
        const schedule = this.schedule.scheduleActivities.forEach((activity) => {
          return activity.assignedTasks.forEach((findTask) => {
            if (findTask._id == task._id) {
              findTask.status = task.status;
              activityId = activity._id;
            }
          });
        });

        const fields = {
          status: task.status,
          activityId: activityId
        }
        const markTask = await taskHandler.markTask(this.tokens, task._id, fields);


        this.setState({
          status: status
        })
      } catch (e) {
        //
      }
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
