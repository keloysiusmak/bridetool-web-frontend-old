<template>
  <div v-if="party">
    <p class="title is-5 is-uppercase">
      {{party.firstName + " " + party.lastName}}
    </p>
    <p class="subtitle is-7">
      Here's your list of activities assigned to you!
    </p>
      <br/>
    <template v-for="(activities, date) in parsedActivities">
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

const partyHandler = require('../../../handlers/partyHandler');
const moment = require('moment');

export default {
  data() {
    return {
      party: null
    }
  },
  props: ['partyId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    parsedActivities: function() {
      let scheduleDates = {};
      const activeActivities = this.party.activities.filter(activity => {
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
    loadParty: async function() {
      try {
        if (this.partyId) {
          const getParty = await partyHandler.getParty(this.tokens, this.partyId);
          this.party = getParty.party;
        }
      } catch (e) {
        console.log(e);
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
    this.loadParty();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
