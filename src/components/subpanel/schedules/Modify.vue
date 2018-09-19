<template>
  <div v-if="!schedule || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule">
    <br/>
    <span class="title is-5">Edit Schedule</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-7">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Name</label>
          <p class="help">Let's give a name to your wedding day. Hashtags maybe?</p>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" id="scheduleName" v-bind:class="{'is-danger': localErrors.scheduleName}" placeholder="Schedule Name" v-model="scheduleName"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.scheduleName">{{localErrors.scheduleName}}</p>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Date</label>
          <p class="help">When's your wedding day?</p>
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.scheduleDate}">
                <select v-model="scheduleDate.date">
                  <option v-for="date in dates" v-bind:value="date">
                    {{ date }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.scheduleDate}">
                <select v-model="scheduleDate.month">
                  <option v-for="month in months" v-bind:value="month">
                    {{ monthNames[month - 1] }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.scheduleDate}">
                <select v-model="scheduleDate.year">
                  <option v-for="year in years" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small" type="submit" value="Save" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const scheduleHandler = require('../../../handlers/scheduleHandler');
const moment = require('moment');

export default {
  name: 'Subpanel-Schedules-Modify',
  data() {
    return {
      scheduleName: null,
      scheduleDate: {
        date: 1,
        month: 1,
        year: 2018
      },
      localErrors: {},
      localSuccess: '',
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dates: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: [2018, 2019, 2020, 2021],
      modifyLoading: false
    }
  },
  props: ['scheduleId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;
      if (!this.scheduleName) {
        this.localErrors.scheduleName = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!this.validateDate(this.scheduleDate)) {
        this.localErrors.scheduleName = 'You have selected an invalid time.';
        hasErrors = true;
      }

      if (!hasErrors) {
        this.updateSchedule();
      }
    },
    formatMoment: function(schedule) {
      const newMoment = moment();
      newMoment.date(schedule.date);
      newMoment.month(schedule.month - 1);
      newMoment.year(schedule.year);

      return newMoment;
    },
    validateDate: function(schedule) {
      const newMoment = this.formatMoment(schedule);
      const amOrPmAdd = (schedule.ampm === 'am') ? 0 : 12;
      const valid = (newMoment.date() == schedule.date) && (newMoment.month() == schedule.month - 1) && (newMoment.year() == schedule.year);

      return valid;
    },
    updateSchedule: async function() {
      this.modifyLoading = true;
      try {
        const date = this.formatMoment(this.scheduleDate);

        const fields = {
          name: this.scheduleName,
          date: date.format('X')
        }
        const updateSchedule = await scheduleHandler.updateSchedule(this.tokens, this.schedule._id, fields);
        this.setState({
          schedule: updateSchedule.schedule
        })
        this.populateFields();
        this.localSuccess = "Successfully updated schedule.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    populateFields: function() {
      this.scheduleName = this.schedule.name;
      const dateMoment = moment.unix(this.schedule.date);
      this.scheduleDate = {
        date: dateMoment.format('D'),
        month: dateMoment.format('M'),
        year: dateMoment.format('Y')
      };
    },
    resetErrors: function() {
      this.localErrors = {
        componentError: null,
        scheduleName: null,
        scheduleDate: null
      }
    }
  },
  watch: {
    schedule: function() {
      this.populateFields();
    }
  },
  async created() {
    this.resetErrors();
    if (this.schedule) {
      this.populateFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
