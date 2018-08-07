<template>
  <div id="main_schedule" v-if="schedule">
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
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deleteActivityModal -->

    <br/>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <div class="columns">
      <div class="column has-text-right">
        <router-link :to="{name:'ActivityAdd'}" class="button is-secondary is-small is-rounded">
          + Add New Activity
        </router-link>
      </div>
    </div>
    <div class="card" v-for="activity in activeActivities" :key="activity._id">
      <div class="card-content">
        <div class="columns">
          <div class="column is-10">
            <p class="title is-5">{{activity.name}}</p>
            <p class="subtitle is-7 is-italic has-text-grey">{{formatTime(activity.startTime)}}</p>
            <div class="content">
              <p class="is-size-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
              </p>
            </div>
            <div class="tags">
              <span class="tag is-secondary" v-for="party in activity.assignedParties">{{party.firstName + " " + party.lastName}}</span>
            </div>
          </div>
          <div class="column is-2 has-text-right is-size-7">
            <ul>
              <li><router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link></li>
              <li><a v-on:click="confirmDeleteActivity(activity._id);">Delete Activity</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr/>

    <div class="card" v-for="activity in deletedActivities" :key="activity._id">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <p class="title is-5">{{activity.name}}</p>
            <p class="subtitle is-7 is-italic has-text-grey">{{formatTime(activity.startTime)}}</p>
            <div class="content">
              <p class="is-size-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
              </p>
            </div>
            <div class="tags">
              <span class="tag is-danger">Deleted</span>
            </div>
          </div>
          <div class="column has-text-right is-size-7">
            <ul>
              <li><router-link :to="{ name: 'ActivityEdit', params: {activityId: activity._id} }">Edit Activity</router-link></li>
              <li><a v-on:click="confirmRestoreActivity(activity._id);">Restore Activity</a></li>
            </ul>
          </div>
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
      deleteActivityModal: false,
      restoreActivityModal: false,
      activity: null,
      localSuccess: null
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
    deleteActivity: async function(activityId) {
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
        console.log(e);
      }
    },
    restoreActivity: async function(activityId) {
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
        console.log(e);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
