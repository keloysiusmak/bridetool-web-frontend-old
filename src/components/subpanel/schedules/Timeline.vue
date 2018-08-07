<template>
  <div id="main_schedule" v-if="schedule">
    <br/>
    <div class="timeline is-centered">
      <header class="timeline-header">
        <span class="tag is-medium is-primary">{{schedule.name}}</span>
      </header>
      <div class="timeline-item">
      </div>
      <header class="timeline-header">
        <span class="tag is-small is-secondary">17 February 2018</span>
      </header>
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="heading">11:45AM - 12:45PM</p>
          <p>Gatecrash</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-marker is-icon">
          <i class="fa fa-car"></i>
        </div>
        <div class="timeline-content">
          <p class="heading">12:45PM - 1:30PM</p>
          <p>Travel to Lower Pierce</p>
        </div>
      </div>
      <header class="timeline-header">
        <span class="tag is-small is-secondary">18 February 2018</span>
      </header>
      <div class="timeline-item">
        <div class="timeline-marker is-icon">
          <i class="fa fa-flag"></i>
        </div>
        <div class="timeline-content">
          <p class="heading">March 2017</p>
          <p>Timeline content - Can include any HTML element</p>
        </div>
      </div>
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
