<template>
  <div v-if="!schedule || !activity && modifyType === 'edit' || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="schedule && (activity || modifyType !== 'edit')">
    <!-- START deleteActivityModal -->
    <div class="modal" v-bind:class="{ 'is-active': deleteActivityModal }" v-if="activity">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to delete '{{activity.name}}'?</div>
          <div class="subtitle is-6">
            You can restore this activity later, but all members assigned to this activity will be unassigned.
          </div>
          <a class="button is-primary" v-on:click="deleteActivity(); deleteActivityModal = false">Delete</a>
          <a class="button is-light" v-on:click="deleteActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->

    <!-- START deleteActivityModal -->
    <div class="modal" v-bind:class="{ 'is-active': restoreActivityModal }" v-if="activity">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to restore '{{activity.name}}'?</div>
          <div class="subtitle is-6">
            Previously assigned members cannot be restored.
          </div>
          <a class="button is-primary" v-on:click="restoreActivity(); restoreActivityModal = false">Restore</a>
          <a class="button is-light" v-on:click="restoreActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->

    <!-- START deleteTaskModal -->
    <div class="modal" v-bind:class="{ 'is-active': deleteTaskModal }" v-if="task">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to delete '{{task.name}}'?</div>
          <a class="button is-primary" v-on:click="deleteTask(task); deleteTaskModal = false">Delete</a>
          <a class="button is-light" v-on:click="deleteActivityModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteActivityModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->

    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">{{(modifyType === 'edit') ? 'Edit' : 'Create'}} Activity</span><br/>
        <span class="title is-4">{{(modifyType === 'edit') ? activity.name : schedule.name}}</span>
      </div>
    </div>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-6">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-6">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="box">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Name</label>
            <p class="help">Easy to understand activity names help both you and your wedding member stay focused.</p>
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
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Description</label>
            <p class="help">Descriptions help your wedding member know more about exactly what to do.</p>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <textarea class="textarea is-small" placeholder="Activity Description" v-model="activityDescription"  v-bind:class="{'is-danger': localErrors.activityDescription}"></textarea>
                <p class="help is-danger" v-if="localErrors.activityDescription">{{localErrors.activityDescription}}</p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Type</label>
            <p class="help">We've included a few types of activities you may want to categorize your activity in, this helps us provide more useful suggestions to enhance your wedding day later on.</p>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityType}">
                  <select v-model="activityType">
                    <option value="travel">Travel</option>
                    <option value="makeup">Make Up</option>
                    <option value="banquet">Banquet</option>
                    <option value="rest">Rest</option>
                    <option value="photoshoot">Photoshoot</option>
                    <option value="preparation">Preparation</option>
                    <option value="teaceremony">Tea Ceremony</option>
                    <option value="others">Others</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--START TIME-->
      <div class="box">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Start Time</label>
            <p class="help">What time does your activity start? It pays to be as accurate as possible, since we'll be informing your wedding member of any changes.</p>
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
          <div class="field-label">
            <label class="label">End Time</label>
            <p class="help">Similarly, we'll update your wedding member when each activity ends.</p>
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
      </div>
      <div class="box" v-if="modifyType == 'edit'">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Tasks</label>
            <p class="help">Here's a list of tasks you've assigned to this activity. Members (and you) can mark tasks as completed so you stay up to date with the progress of the activities.</p>
          </div>
          <div class="field-body">
            <div class="field is-grouped is-grouped-multiline">
              <table class="table is-fullwidth">
                <tbody>
                  <tr v-for="task in activityAssignedTasks" v-if="activityAssignedTasks.length">
                    <td class="has-text-7">
                      {{ task.name }}
                    </td>
                    <td class="has-text-right">
                      <a class="tag is-small is-danger" v-on:click="deleteTaskConfirm(task)">delete</a>
                    </td>
                  </tr>
                  <tr v-if="!activityAssignedTasks.length">
                    <td colspan="2" >
                      <div>
                        <p class="help">There are currently no tasks assigned to this activity.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="has-text-7">
                      <div class="control is-expanded">
                        <input class="input is-small borderless" type="text" v-model="newTaskName" placeholder="Add a New Task">
                      </div>
                    </td>
                    <td class="has-text-right">
                      <a v-on:click="addTask()" class="tag is-small is-danger">
                        add
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="field is-horizontal">

          <div class="field-label">
            <label class="label">Assigned Members</label>
            <p class="help">Here's a list of members who are assigned to this activity. Assigned members will have this activity show
            up on their overview page, which you can easily share with them.</p>
          </div>
          <div class="field-body">
            <div class="field is-grouped is-grouped-multiline">
              <div v-if="!activityAssignedMembers.length">
                <p class="help">There are currently no members assigned to this activity.</p>
              </div>
              <div class="control" v-if="activityAssignedMembers.length" v-for="member in activityAssignedMembers">
                <div class="tags has-addons">
                  <span class="tag is-small">
                    {{ member.firstName + " " + member.lastName }}
                  </span>
                  <label class="checkbox">
                    <input type="checkbox" class="hidden" v-bind:value="member._id" v-bind:id="'member' + member._id" v-model="activityAssignedMembersId">
                    <a class="tag is-small is-danger">delete</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Available Members</label>
            <p class="help">Don't see some members of your wedding member? They might already have an activity assigned to them!</p>
          </div>
          <div class="field-body">
            <div v-if="availableMembersLoading">
              <a class="button is-loading is-medium is-text"></a>
            </div>
            <div class="field is-grouped is-grouped-multiline" v-if="!availableMembersLoading">
              <div v-if="!activityAvailableMembers.length">
                <p class="help">There are currently no members of your member available to be assigned.</p>
              </div>
              <div class="control" v-if="activityAvailableMembers.length" v-for="member in activityAvailableMembers">
                <div class="tags has-addons">
                  <span class="tag is-small">
                    {{ member.firstName + " " + member.lastName }}
                  </span>
                  <label class="checkbox">
                    <input type="checkbox" class="hidden" v-bind:value="member._id" v-bind:id="'member' + member._id" v-model="activityAssignedMembersId">
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
                <input class="button is-primary is-small" type="submit" value="Save" v-if="modifyType === 'edit'" />
                <input class="button is-primary is-small" type="submit" value="Create" v-if="modifyType === 'create'" />
                <input class="button is-light is-small" type="button" v-on:click="deleteActivityModal = true" value="Delete Activity" v-if="modifyType === 'edit' && !activity.isDeleted" />
                <input class="button is-light is-small" type="button" v-on:click="restoreActivityModal = true" value="Restore Activity" v-if="modifyType === 'edit' && activity.isDeleted" />
              </div>
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
const coupleHandler = require('../../../handlers/coupleHandler');
const memberHandler = require('../../../handlers/memberHandler');
const taskHandler = require('../../../handlers/taskHandler');
const tokenHandler = require('../../../handlers/tokenHandler');
const moment = require('moment');

export default {
  name: 'Main-Activity-Edit',
  data() {
    return {
      deleteActivityModal: false,
      restoreActivityModal: false,
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dates: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: [2018, 2019, 2020, 2021],
      hours: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      ampms: ['am', 'pm'],

      activityName: null,
      activityDescription: null,
      activityType: 'others',
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
      activityAssignedTasks: [],
      activityAssignedMembers: [],
      activityAssignedMembersId: [],
      activityAvailableMembers: [],

      availableMembersLoading: false,
      localErrors: {},
      localSuccess: '',
      activity: null,
      modifyLoading: false,
      task: null,
      deleteTaskModal: false,
      newTaskName: null
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

      if (!this.activityType) {
        this.localErrors.activityDescription = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!this.activityDescription) {
        this.localErrors.activityDescription = 'Field cannot be empty.';
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
      this.modifyLoading = true;
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);

        const fields = {
          name: this.activityName,
          type: this.activityType,
          description: this.activityDescription,
          startTime: startTime.format('X'),
          endTime: endTime.format('X'),
          assignedMembers: this.activityAssignedMembersId
        }
        const updateActivity = await activityHandler.updateActivity(this.tokens, this.activity._id, fields);
        this.activity = updateActivity.activity;
        this.populateFields();
        EventBus.$emit('loadSchedule', {});
        this.localSuccess = 'Successfully updated activity.';
      } catch (e) {
        console.log(e);
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    deleteActivity: async function(activityId) {
      this.deleteOrRestoreLoading = true;
      this.deleteActivityModal = false;
      try {
        const deleteActivity = await activityHandler.deleteActivity(this.tokens, this.activity._id);
        const schedule = this.schedule;
        schedule.scheduleActivities = this.schedule.scheduleActivities.map(activity => {
          if (activity._id === this.activity._id) {
            activity.isDeleted = true;
            return activity;
          } else {
            return activity;
          }
        });
        this.setState({
          schedule: schedule
        })
        this.activity.assignedMembers = [];
        this.activity.isDeleted = true;
        this.localSuccess = 'Successfully deleted activity.';
      } catch (e) {
        //
      }
      this.deleteOrRestoreLoading = false;
    },
    restoreActivity: async function(activityId) {
      this.deleteOrRestoreLoading = true;
      this.restoreActivityModal = false;
      try {
        const restoreActivity = await activityHandler.restoreActivity(this.tokens, this.activity._id);
        const schedule = this.schedule;
        schedule.scheduleActivities = this.schedule.scheduleActivities.map(activity => {
          if (activity._id === this.activity._id) {
            activity.isDeleted = false;
            return activity;
          } else {
            return activity;
          }
        });
        this.setState({
          schedule: schedule
        })
        this.localSuccess = 'Successfully restored activity.';
        this.activity.isDeleted = false;
      } catch (e) {
        //
      }
      this.deleteOrRestoreLoading = false;
    },
    addActivity: async function() {
      this.modifyLoading = true;
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);

        const fields = {
          name: this.activityName,
          type: this.activityType,
          description: this.activityDescription,
          startTime: startTime.format('X'),
          endTime: endTime.format('X'),
          assignedMembers: this.activityAssignedMembersId
        }
        const addActivity = await activityHandler.addActivity(this.tokens, this.schedule._id, fields);
        this.activity = addActivity.activity;

        this.populateFields();
        EventBus.$emit('loadSchedule', {});
        this.localSuccess = 'Successfully added activity.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
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
      this.activityType = this.activity.type;
      this.activityDescription = this.activity.description;

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

      this.activityAssignedMembersId = this.activity.assignedMembers.map(member => {
        return member._id;
      });
      this.activityAssignedMembers = this.activity.assignedMembers.filter(member => {
        return !member.isDeleted;
      });
      this.activityAssignedTasks = this.activity.assignedTasks;
    },
    getAvailableMembers: async function() {
      try {
        const startTime = this.formatMoment(this.activityStartTime);
        const endTime = this.formatMoment(this.activityEndTime);
        const getAvailableMembers = await coupleHandler.getAvailableMembers(this.tokens, this.account.couple._id, startTime.format('X'), endTime.format('X'));
        this.activityAvailableMembers = getAvailableMembers.members.filter(member => {
          return !this.activityAssignedMembersId.includes(member._id);
        });
        this.availableMembersLoading = false;
      } catch (e) {
        this.availableMembersLoading = false;
      }
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        activityName: null,
        activityDescription: null,
        activityType: null,
        activityStartTime: null,
        activityEndTime: null
      }
    },
    loadActivity: async function() {
      try {
        const getActivity = await activityHandler.getActivity(this.tokens, this.activityId);
        this.activity = getActivity.activity;
        if (this.activity.endTime < Date.now() / 1000) {
          this.$router.push('/schedule/activities');
        }
        this.populateFields();
      } catch (e) {
      }
    },
    deleteTaskConfirm: function(task) {
      this.task = task;
      this.deleteTaskModal = true;
    },
    deleteTask: async function(task) {
      try {
        const deleteTask = await taskHandler.deleteTask(this.tokens, task._id);

        this.activity.assignedTasks = this.activity.assignedTasks.filter((filterTask) => {
          return filterTask._id != task._id;
        });
        EventBus.$emit('loadSchedule', {});
        this.populateFields();
      } catch (e) {
      }
    },
    addTask: async function() {
      try {
        const addTask = await taskHandler.addTask(this.tokens, this.activity._id, {name: this.newTaskName});
        this.activity.assignedTasks.push(addTask.task);
        this.newTaskName = "";
        EventBus.$emit('loadSchedule', {});
        this.populateFields();
      } catch (e) {
      }
    },
  },
  watch: {
    activityStartTime: {
      handler: function() {
        this.availableMembersLoading = true;
        this.debouncedGetAvailableMembers();
      },
      deep: true
    },
    activityEndTime: {
      handler: function() {
        this.availableMembersLoading = true;
        this.debouncedGetAvailableMembers();
      },
      deep: true
    },
    activityAssignedMembersId: function() {
      const previouslyAssignedMembers = this.activityAssignedMembers.filter(member => {
        return this.activityAssignedMembersId.includes(member._id);
      });
      const newlyAssignedMembers = this.activityAvailableMembers.filter(member => {
        return this.activityAssignedMembersId.includes(member._id);
      })

      const previouslyUnassignedMembers = this.activityAvailableMembers.filter(member => {
        return !this.activityAssignedMembersId.includes(member._id);
      });

      const newlyUnassignedMembers = this.activityAssignedMembers.filter(member => {
        return !this.activityAssignedMembersId.includes(member._id);
      });

      this.activityAssignedMembers = previouslyAssignedMembers.concat(newlyAssignedMembers);
      this.activityAvailableMembers = previouslyUnassignedMembers.concat(newlyUnassignedMembers);
    },
    activity: function() {
      if (this.modifyType === 'edit') {
        this.populateFields();
      }
    }
  },
  async created() {
    this.resetErrors();
    this.debouncedGetAvailableMembers = _.debounce(this.getAvailableMembers, 1000);
    if (this.modifyType === 'edit') {
      this.loadActivity();
    } else {
      this.activity = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .borderless {
    border: 0;
    box-shadow: none !important;
    padding-left: 0;
    padding-right: 0;
  }
</style>
