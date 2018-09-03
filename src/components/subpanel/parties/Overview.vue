<template>
  <div id="main_party" v-if="party">
    <br/>
    <div class="columns">
      <div class="column">
        <p class="title is-7 is-uppercase">
          {{party.firstName + " " + party.lastName}}'s activities
        </p>
        <article class="media" v-for="activity in activeActivities">
          <div class="media-content">
            <div class="content">
              <p>
                <small>{{formatTime(activity.startTime)}} - {{formatTime(activity.endTime)}}</small>
                <br/>
                <strong>{{activity.name}}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-3">
        <div class="card">
          <div class="card-content">
          <router-link :to="{ name: 'PartyEdit', params: {partyId: party._id }, props: true }" class="is-size-7">Edit</router-link>
            <p class="title is-5">{{party.firstName + " " + party.lastName}}</p>
            <div class="tags">
              <span class="tag is-warning">Bridesmaids</span>
            </div>
          </div>
        </div>
        </br>
        <div class="card">
          <div class="card-content">
            <p class="title is-5">Share with {{party.firstName + " " + party.lastName}}</p>
            <p class="subtitle is-7 has-text-grey">Generate a link to share with {{party.firstName + " " + party.lastName}} so {{ heOrShe(party.gender) }} can keep up to date with {{ hisOrHers(party.gender) }} activities for your wedding.</p>
            <p class="is-size-7 is-italic">No link created</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item is-secondary is-size-7">Generate Link</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const partyHandler = require('../../../handlers/partyHandler');
const moment = require('moment');

export default {
  name: 'Main-Party',
  data() {
    return {
      errors: [],
      party: null
    }
  },
  props: ['partyId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivities: function() {
      return this.party.activities.filter(activity => {
        return !activity.isDeleted;
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
