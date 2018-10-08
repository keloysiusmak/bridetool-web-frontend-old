<template>
  <div v-if="!member" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="member">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Summary</span><br/>
        <span class="title is-4">{{member.firstName + " " + member.lastName}}</span>
      </div>
    </div>
    <p class="has-size-6">
      Here's your list of activities assigned to you!
    </p>
      <br/>
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
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const memberHandler = require('../../../handlers/memberHandler');
const tokenHandler = require('../../../handlers/tokenHandler');
const moment = require('moment');

export default {
  data() {
    return {
      member: null
    }
  },
  props: ['memberId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
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
    formatTime: function(activity) {
      const formattedTime = moment.unix(activity).format('h:mma');

      return formattedTime;
    },
    loadMember: async function() {
      try {
        if (this.memberId) {
          const getMember = await memberHandler.getMember(this.tokens, this.memberId, true);
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
    completedActivity: function(activityEndTime) {
      //const activityEnded = activityEndTime < Date.now() / 1000;
      const activityEnded = activityEndTime < 1545923401;
      return {
        'has-text-grey-lighter': activityEnded
      }
    },
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
    completedActivities: function(activities) {
      const totalActivities = activities.length;
      let completed = 0;
      activities.forEach((activity) => {
        //if (activity.endTime < Date.now() / 1000) {
        if (activity.endTime < 1545923401) {
          completed++;
        }
      });
      return completed / totalActivities * 100;
    }
  },
  async created() {
    try {
      if (!this.memberAccessToken) {
        const getMemberAccessToken = await tokenHandler.getMemberAccessToken(this.memberId);
        this.setState({
          memberAccessToken: getMemberAccessToken.accessToken
        });
      }
    } catch (e) {
      //
    };
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
