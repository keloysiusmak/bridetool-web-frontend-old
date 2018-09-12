<template>
  <div id="panel_quickstart">
    <div class="has-text-centered">
      <p class="title is-spaced is-3">
        Bridetool is a tool to help<br/> couples with their wedding planning.
      </p>
      <p class="subtitle is-5">
        Here's how you can make you can full use of what we do<br/> to help you with planning your wedding.
      </p>
      <div class="container has-text-centered" style="max-width:640px;">
        <figure class="image is-4by3">
          <img src="../../../assets/img/temp1.png">
        </figure>
      </div>
    </div>
    <br/>
    <div class="columns">
      <div class="column is-6">
        <figure class="image" style="max-width:640px;">
          <img src="../../../assets/img/temp4.jpg">
        </figure>
      </div>
      <div class="column is-6">
        <div class="has-text-left">
          <p class="title is-spaced is-3">
            Hej!
          </p>
          <p class="subtitle is-5">
            We never liked the idea of having two separate accounts for a couple. In bridetool,
            every couple shares one account, just as you would share many good times in your marriage.
          </p>
          <p class="subtitle is-5">
            During signup we'll ask that one of you be the primary user for the account,
            but if you want to switch users at any time, it is easy to do so <router-link to="/settings/profile/switchuser">here</router-link>.
          </p>
        </div>
      </div>
    </div>
    <br/>
    <div class="columns">
      <div class="column is-6">
        <div class="has-text-left">
          <p class="title is-spaced is-3">
            Wedding Party
          </p>
          <p class="subtitle is-5">
            The place for friends and family. Add important people for your wedding day to your wedding party,
            from your groomsmen and bridesmaids to your parents!
          </p>
          <p class="subtitle is-5">
            <span class="tag is-danger">Coming Soon</span>
            <br/>
            <br/>
            You'll also be able to organize your wedding party into groups, so you can quickly assign
            activities and tasks!
          </p>
        </div>
      </div>
      <div class="column is-6">
        <figure class="image" style="max-width:640px;">
          <img src="../../../assets/img/temp2.jpg">
        </figure>
      </div>
    </div>
    <br/>
    <div class="columns">
      <div class="column is-6">
        <figure class="image" style="max-width:640px;">
          <img src="../../../assets/img/temp3.png">
        </figure>
      </div>
      <div class="column is-6">
        <div class="has-text-left">
          <p class="title is-spaced is-3">
            Schedule
          </p>
          <p class="subtitle is-5">
            Here's where you enter all the activities happening before and on your wedding day!
            <router-link :to="{ name: 'ScheduleTimeline' }">Timeline</router-link> allows you to have an overview
            on what's going on, so you never miss a thing.
          </p>
          <p class="subtitle is-5">
            Activities can be assigned to members of your wedding party, so everyone's clear on what
            they have to do. Share a unique link with every member of your wedding party, so they can
            keep up to date with any changes in the programme.
          </p>
        </div>
      </div>
    </div>
    <br/>
    <div class="has-text-centered">
      <p class="title is-spaced is-3">
        Ready to get started?
      </p>
      <p class="subtitle is-5">
        We're ready too! Let's make this wedding an awesome one!
      </p>
      <p class="subtitle is-5">
        <router-link to="/schedule">Let's Go!</router-link>
      </p>
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
  name: 'Panel-Quickstart',
  props: ['scheduleId'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
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
