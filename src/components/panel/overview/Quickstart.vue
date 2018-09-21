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
            Hej! (that's Hey! in Swedish)
          </p>
          <p class="subtitle is-5">
            Welcome to bridetool, we're a team of wedding professionals trying to rethink the way we do weddings.
          </p>
          <p class="subtitle is-5">
            We don't believe wedding planning should be hard, and with technology, we hope to abstract most of the
            troubles of wedding planning, so you can focus on enjoying your special day.
          </p>
          <p class="subtitle is-5">
            Everything you need is placed in your <strong>Planner</strong>. We're coming up with new features in
            the coming months, including tie-ups with more vendors in the wedding industry.
          </p>
        </div>
      </div>
    </div>
    <br/>
    <div class="columns">
      <div class="column is-6">
        <div class="has-text-left">
          <p class="title is-spaced is-3">
            Wedding Team
          </p>
          <p class="subtitle is-5">
            In your planner, your Wedding Team is the place for your wedding member, vendors and family. Add important people for your wedding day to your wedding member,
            from your photographers, makeup artists, to your parents!
          </p>
          <p class="subtitle is-5">
            You'll be able to assign activities to them, so they can have
            a clear view of what they have to do to make sure your wedding goes by swimmingly.
          </p>
          <p class="subtitle is-5">
            <span class="tag is-danger">Coming Soon</span>
            <br/>
            <br/>
            You'll soon be able to organize your wedding team into groups, so you can quickly assign
            activities and tasks to multiple people at once!
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
            Share a unique link with every member of your wedding member, so they can
            keep up to date with any changes in the programme.
          </p>
          <p class="subtitle is-5">
            You can also delete or restore activites at any time, in case you change your mind.
          </p>
        </div>
      </div>
    </div>
    <br/>
    <div class="columns">
      <div class="column is-6">
        <div class="has-text-left">
          <p class="title is-spaced is-3">
            Budget
          </p>
          <p class="subtitle is-5">
            Let's keep your finances in check. Budget allows you to keep track of all the spending you've made,
            or any injection of finances for your wedding day, so you always stay in the green.
          </p>
          <p class="subtitle is-5">
            Everything's recorded in the form of records, which you can add or modify at any time.
          </p>
        </div>
      </div>
      <div class="column is-6">
        <figure class="image" style="max-width:640px;">
          <img src="../../../assets/img/temp5.png">
        </figure>
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
