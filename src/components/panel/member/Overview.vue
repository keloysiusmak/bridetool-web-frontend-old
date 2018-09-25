<template>
  <div v-if="!member" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="member">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Overview</span><br/>
        <span class="title is-4">{{member.firstName + " " + member.lastName}}</span>
      </div>
    </div>
    <div class="columns">
      <div class="column is-9">
        <template v-if="!hasActivities">
          <p class="is-size-6">
            No activities to show.
          </p>
        </template>
        <div class="timeline">

          <div class="timeline-item" v-for="(activities, date) in parsedActivities">
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
        <div class="box">
          <p class="title is-5">Share with {{member.firstName + " " + member.lastName}}</p>
          <p class="subtitle is-7 has-text-grey">Copy this link to share with {{member.firstName + " " + member.lastName}} so {{ heOrShe(member.gender) }} can keep up to date with {{ hisOrHers(member.gender) }} activities for your wedding.</p>
          <p class="is-size-7 is-italic">
            <a v-on:click="copyToClipboard();">Click here to copy the link</a>
          </p>
        </div>

        <router-link :to="{ name: 'MemberEdit', params: {memberId: member._id }, props: true }" class="link">Edit Member</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const memberHandler = require('../../../handlers/memberHandler');
const moment = require('moment');

export default {
  name: 'Main-Member',
  data() {
    return {
      errors: [],
      member: null
    }
  },
  props: ['memberId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    hasActivities: function() {
      return this.member.activities.filter(activity => {
        return !activity.isDeleted;
      }).length > 0;
    },
    parsedActivities: function() {
      let scheduleDates = {};

      const activeActivities = this.member.activities.filter(activity => {
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
    loadMember: async function() {
      try {
        if (this.memberId) {
          const getMember = await memberHandler.getMember(this.tokens, this.memberId);
          this.member = getMember.member;
        }
      } catch (e) {
        //
      }
    },
    heOrShe: function(gender) {
      return (gender === 'male') ? 'he' : 'she';
    },
    hisOrHers: function(gender) {
      return (gender === 'male') ? 'his' : 'hers';
    },
    copyToClipboard: function() {
      var aux = document.createElement("input");
      aux.setAttribute("value", "http://localhost:1024" + this.$route.fullPath + "/overview");
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
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
  },
  async created() {
    this.loadMember();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timeline-content {
    width: 100%;
    max-width: 800px
  }
</style>
