<template>
  <div id="main_activity">
    <div v-if="activity">
      <div class="content">
        <p class="title is-1">{{activity.name}}</p>
        <p class="subtitle is-4">{{formatActivityTime.startTime + " - " + formatActivityTime.endTime}}</p>
        <div v-for="party in activity.assignedParties">
          {{party.firstName + " " + party.lastName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');

export default {
  name: 'Main-Activity',
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    formatActivityTime: function() {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      const startTime = new Date(this.activity.startTime * 1000);
      const endTime = new Date(this.activity.endTime * 1000);

      const formattedStartTime = startTime.getDate() + " " + months[startTime.getMonth()] + " " + startTime.getFullYear();
      const formattedEndTime = endTime.getDate() + " " + months[endTime.getMonth()] + " " + endTime.getFullYear();
      return {
        startTime: formattedStartTime,
        endTime: formattedEndTime
      }
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
