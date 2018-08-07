<template>
  <div id="main_activity_edit">
    <br/>
    <span class="title is-5" v-if="modifyType === 'edit'">Edit Activity</span>
    <span class="title is-5" v-if="modifyType === 'create'">Create Activity</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      {{localErrors.componentError}}
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="Activity Name" v-model="activityName"  v-bind:class="{'is-danger': localErrors.activityName}"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <p class="help is-danger" v-if="localErrors.activityName">{{localErrors.activityName}}</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <!--START TIME-->
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Start Time</label>
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.date">
                  <option v-for="date in dates" v-bind:value="date">
                    {{ date }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.month">
                  <option v-for="month in months" v-bind:value="month">
                    {{ monthNames[month - 1] }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.year">
                  <option v-for="year in years" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.hour">
                  <option v-for="hour in hours" v-bind:value="hour">
                    {{ hour }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.minute">
                  <option v-for="minute in minutes" v-bind:value="minute">
                    {{ String(minute).padStart(2, '0') }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityStartTime}">
                <select v-model="activityStartTime.ampm">
                  <option v-for="ampm in ampms" v-bind:value="ampm">
                    {{ ampm }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" v-if="localErrors.activityStartTime">
        <div class="field-label"></div>
        <div class="field-body">
          <p class="help is-danger">{{localErrors.activityStartTime}}</p>
        </div>
      </div>
      <!--END START TIME-->
      <br/>
      <!--END TIME-->
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">End Time</label>
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.date">
                  <option v-for="date in dates" v-bind:value="date">
                    {{ date }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.month">
                  <option v-for="month in months" v-bind:value="month">
                    {{ monthNames[month - 1] }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.year">
                  <option v-for="year in years" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.hour">
                  <option v-for="hour in hours" v-bind:value="hour">
                    {{ hour }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.minute">
                  <option v-for="minute in minutes" v-bind:value="minute">
                    {{ String(minute).padStart(2, '0') }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityEndTime}">
                <select v-model="activityEndTime.ampm">
                  <option v-for="ampm in ampms" v-bind:value="ampm">
                    {{ ampm }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" v-if="localErrors.activityEndTime">
        <div class="field-label"></div>
        <div class="field-body">
          <p class="help is-danger">{{localErrors.activityEndTime}}</p>
        </div>
      </div>
      <!--END END TIME-->
      <hr/>
      <div class="field is-horizontal">

        <div class="field-label is-small">
          <label class="label">Assigned Parties</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control" v-if="!activityAssignedParties.length">
              <p class="help">There are currently no members of your party assigned to this activity.</p>
            </div>
            <div class="control" v-if="activityAssignedParties.length" v-for="party in activityAssignedParties">
              <div class="tags has-addons">
                <span class="tag is-small">
                  {{ party.firstName + " " + party.lastName }}
                </span>
                <label class="checkbox">
                  <input type="checkbox" class="hidden" v-bind:value="party._id" v-bind:id="'party' + party._id" v-model="activityAssignedPartiesId">
                  <a class="tag is-small is-danger">delete</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Available Parties</label>
          <p class="help">Don't see some members of your wedding party? <a>Find out why.</a></p>
        </div>
        <div class="field-body">
          <div v-if="availablePartiesLoading">
            <a class="button is-loading is-medium is-text"></a>
          </div>
          <div class="field is-grouped is-grouped-multiline" v-if="!availablePartiesLoading">
            <div class="control" v-if="!activityAvailableParties.length">
              <p class="help">There are currently no members of your party available to be assigned.</p>
            </div>
            <div class="control" v-if="activityAvailableParties.length" v-for="party in activityAvailableParties">
              <div class="tags has-addons">
                <span class="tag is-small">
                  {{ party.firstName + " " + party.lastName }}
                </span>
                <label class="checkbox">
                  <input type="checkbox" class="hidden" v-bind:value="party._id" v-bind:id="'party' + party._id" v-model="activityAssignedPartiesId">
                  <a class="tag is-small is-success">
                    add
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small" type="submit" value="Save" v-if="modifyType === 'edit'" />
              <input class="button is-link is-small" type="submit" value="Create" v-if="modifyType === 'create'" />
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
import _ from 'lodash'
import { EventBus } from '../../../events/event-bus.js';

const activityHandler = require('../../../handlers/activityHandler');
const partyHandler = require('../../../handlers/partyHandler');
const tokenHandler = require('../../../handlers/tokenHandler');
const moment = require('moment');

export default {
  name: 'Main-Activity-Edit',
  data() {
    return {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dates: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: [2018, 2019, 2020, 2021],
      hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      ampms: ['am', 'pm'],

      activityName: null,
      activityStartTime: {
        date: 1,
        month: 1,
        year: 2018,
        hour: 12,
        minute: 0,
        ampm: 'am'
      },
      activityEndTime: {
        date: 1,
        month: 1,
        year: 2018,
        hour: 12,
        minute: 0,
        ampm: 'am'
      },
      activityAssignedParties: [],
      activityAssignedPartiesId: [],
      activityAvailableParties: [],

      availablePartiesLoading: false,
      localErrors: {},
      localSuccess: '',
      activity: null
    }
  },
  props: ['activityId', 'modifyType'],
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

      if (!this.activityName) {
        this.localErrors.activityName = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!this.validateDate(this.activityStartTime)) {
        this.localErrors.activityStartTime = 'You have selected an invalid time.';
        hasErrors = true;
      }

      if (!this.validateDate(this.activityEndTime)) {
        this.localErrors.activityEndTime = 'You have selected an invalid time.';
        hasErrors = true;
      }

      if (this.dateElapsed(this.activityStartTime)) {
        this.localErrors.activityStartTime = 'You have selected a time that has already elapsed.';
        hasErrors = true;
      }

      if (this.dateElapsed(this.activityEndTime)) {
        this.localErrors.activityEndTime = 'You have selected a time that has already elapsed.';
        hasErrors = true;
      }

      if (this.formatMoment(this.activityStartTime).format('X') >= this.formatMoment(this.activityEndTime).format('X')) {
        this.localErrors.activityEndTime = 'Your activity must end after it has started.';
        hasErrors = true;
      }

      if (!hasErrors) {
        if (this.modifyType === 'edit') {
          this.updateActivity();
        } else if (this.modifyType === 'create') {
          this.addActivity();
        }
      }
    },
    updateActivity: async function() {
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);

        const fields = {
          name: this.activityName,
          startTime: startTime.format('X'),
          endTime: endTime.format('X'),
          assignedParties: this.activityAssignedPartiesId
        }
        const updateActivity = await activityHandler.updateActivity(this.tokens, this.activity._id, fields);
        this.activity = updateActivity.activity;
        this.populateFields();
        EventBus.$emit('loadSchedule', {});
        this.localSuccess = 'Successfully updated activity.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    addActivity: async function() {
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);

        const fields = {
          name: this.activityName,
          startTime: startTime.format('X'),
          endTime: endTime.format('X'),
          assignedParties: this.activityAssignedPartiesId
        }
        const addActivity = await activityHandler.addActivity(this.tokens, this.scheduleId, fields);
        this.activity = addActivity.activity;

        this.populateFields();
        EventBus.$emit('loadSchedule', {});
        this.localSuccess = 'Successfully added activity.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    formatMoment: function(activity) {
      const newMoment = moment();
      newMoment.second(0);
      newMoment.minute(activity.minute);
      const amOrPmAdd = (activity.ampm === 'am') ? 0 : 12;
      newMoment.hour(parseInt(activity.hour) % 12 + amOrPmAdd);
      newMoment.date(activity.date);
      newMoment.month(activity.month - 1);
      newMoment.year(activity.year);

      return newMoment;
    },
    validateDate: function(activity) {
      const newMoment = this.formatMoment(activity);
      const amOrPmAdd = (activity.ampm === 'am') ? 0 : 12;
      const valid = (newMoment.minutes() == activity.minute) && (newMoment.hours() == activity.hour % 12 + amOrPmAdd) && (newMoment.date() == activity.date) && (newMoment.month() == activity.month - 1) && (newMoment.year() == activity.year);

      return valid;
    },
    dateElapsed: function(activity) {
      const newMoment = this.formatMoment(activity);
      return newMoment.format('X') < Math.floor(Date.now() / 1000);
    },
    populateFields: function() {
      this.activityName = this.activity.name;

      const startTimeMoment = moment.unix(this.activity.startTime);
      this.activityStartTime = {
        date: startTimeMoment.format('D'),
        month: startTimeMoment.format('M'),
        year: startTimeMoment.format('Y'),
        hour: startTimeMoment.format('h'),
        minute: startTimeMoment.format('m'),
        ampm: startTimeMoment.format('a')
      };


      const endTimeMoment = moment.unix(this.activity.endTime);
      this.activityEndTime = {
        date: endTimeMoment.format('D'),
        month: endTimeMoment.format('M'),
        year: endTimeMoment.format('Y'),
        hour: endTimeMoment.format('h'),
        minute: endTimeMoment.format('m'),
        ampm: endTimeMoment.format('a')
      };

      this.activityAssignedPartiesId = this.activity.assignedParties.map(party => {
        return party._id;
      });
      this.activityAssignedParties = this.activity.assignedParties;
    },
    getAvailableParties: async function() {
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);
        const getAvailableParties = await partyHandler.getAvailableParties(this.tokens, this.account._id, startTime.format('X'), endTime.format('X'));
        this.activityAvailableParties = getAvailableParties.parties.filter(party => {
          return !this.activityAssignedPartiesId.includes(party._id);
        });
        this.availablePartiesLoading = false;
      } catch (e) {
      }
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        activityName: null,
        activityStartTime: null,
        activityEndTime: null
      }
    },
    loadActivity: async function() {
      try {
        const getActivity = await activityHandler.getActivity(this.tokens, this.activityId);
        this.activity = getActivity.activity;
        this.populateFields();
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    activityStartTime: {
      handler: function() {
        this.availablePartiesLoading = true;
        this.debouncedGetAvailableParties();
      },
      deep: true
    },
    activityEndTime: {
      handler: function() {
        this.availablePartiesLoading = true;
        this.debouncedGetAvailableParties();
      },
      deep: true
    },
    activityAssignedPartiesId: function() {
      const previouslyAssignedParties = this.activityAssignedParties.filter(party => {
        return this.activityAssignedPartiesId.includes(party._id);
      });
      const newlyAssignedParties = this.activityAvailableParties.filter(party => {
        return this.activityAssignedPartiesId.includes(party._id);
      })

      const previouslyUnassignedParties = this.activityAvailableParties.filter(party => {
        return !this.activityAssignedPartiesId.includes(party._id);
      });

      const newlyUnassignedParties = this.activityAssignedParties.filter(party => {
        return !this.activityAssignedPartiesId.includes(party._id);
      });

      this.activityAssignedParties = previouslyAssignedParties.concat(newlyAssignedParties);
      this.activityAvailableParties = previouslyUnassignedParties.concat(newlyUnassignedParties);
    },
    activity: function() {
      if (this.modifyType === 'edit') {
        this.populateFields();
      }
    }
  },
  async created() {
    this.resetErrors();
    this.debouncedGetAvailableParties = _.debounce(this.getAvailableParties, 1000);
    if (this.modifyType === 'edit') {
      this.loadActivity();
    } else {
      this.setState({
        activity: null
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
