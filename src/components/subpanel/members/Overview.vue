<template>
  <div v-if="!member" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="member">
    <br/>
    <div class="columns">
      <div class="column">
        <p><router-link :to="{ name: 'MemberEdit', params: {memberId: member._id }, props: true }" class="is-size-6">Edit Member</router-link></p>
        <p class="title is-4">
          {{member.firstName + " " + member.lastName}}'s Activities
        </p>
        <template v-if="!hasActivities">
          <p class="is-size-6">
            No activities to show.
          </p>
        </template>
        <template v-for="(activities, date) in parsedActivities">
          <p class="title is-4">{{date}}</p>
          <progress class="progress is-small is-success" v-bind:value="completedActivities(activities)" max="100"></progress>
          <template v-for="activity in activities">
            <article class="media columns is-multiline" v-bind:class="completedActivity(activity.endTime)">
              <div class="column is-3 is-12-mobile">
                <p class="is-size-6" v-html="formatTimes(activity)"></p>
              </div>
              <div class="column is-7 is-12-mobile">
                <p class="is-size-4 has-text-weight-bold">{{activity.name}}</p>
                <p class="is-size-6">{{activity.description}}</p>
              </div>
              <div class="column is-2 is-hidden-mobile has-text-right">
                <span class="icon is-small is-left">
                  <i v-bind:class="getIcon(activity.type)"></i>
                </span>
              </div>
            </article>
          </template>
          <br/>
        </template>
      </div>
      <div class="column is-3">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">Share with {{member.firstName + " " + member.lastName}}</p>
            <p class="subtitle is-6 has-text-grey">Copy this link to share with {{member.firstName + " " + member.lastName}} so {{ heOrShe(member.gender) }} can keep up to date with {{ hisOrHers(member.gender) }} activities for your wedding.</p>
            <p class="is-size-6 is-italic">
              <a v-on:click="copyToClipboard();">Click here to copy the link</a>
            </p>
          </div>
        </div>
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
  },
  async created() {
    this.loadMember();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
