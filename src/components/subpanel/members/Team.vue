<template>
  <div v-if="!members || deleteOrRestoreLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="members">
    <!-- START deleteMemberModal -->
    <div class="modal" v-bind:class="{ 'is-active': deleteMemberModal }" v-if="member">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to delete '{{member.firstName + " " + member.lastName}}'?</div>
          <div class="subtitle is-6">
            You can restore this member later.
          </div>
          <a class="button is-danger" v-on:click="deleteMember(); deleteMemberModal = false">Delete</a>
          <a class="button is-white" v-on:click="deleteMemberModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deleteMemberModal -->

    <!-- START deleteMemberModal -->
    <div class="modal" v-bind:class="{ 'is-active': restoreMemberModal }" v-if="member">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to restore '{{member.firstName + " " + member.lastName}}'?</div>
          <div class="subtitle is-6">
            All previously assigned activities to {{member.firstName + " " + member.lastName}} will be restored.
          </div>
          <a class="button is-success" v-on:click="restoreMember(); restoreMemberModal = false">Restore</a>
          <a class="button is-white" v-on:click="restoreMemberModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deleteMemberModal -->
    <br/>
    <div class="columns">
      <div class="column">
        <p class="title is-4">
          Wedding Team
        </p>
      </div>
      <div class="column has-text-right">
        <a href="#" v-on:click="toggleHideDeletedMembers()" class="button is-outlined is-small is-rounded">
          {{ (hideDeletedMembers) ? 'Show' : 'Hide' }} Deleted Members
        </a>
        <router-link :to="{name:'MemberAdd'}" class="button is-secondary is-small is-rounded">
          + Add New Member
        </router-link>
      </div>
    </div>

    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-6">{{localSuccess}}</span>
    </div>

    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-6">{{localErrors.componentError}}</span>
    </div>

    <template v-if="!hasActiveMembers && !hasDeletedMembers">
      <p class="is-size-6">
        No members to show.
      </p>
    </template>

    <template v-if="!hasActiveMembers && hasDeletedMembers && hideDeletedMembers">
      <p class="is-size-6">
        No active members to show.
      </p>
    </template>

    <article class="media" v-for="member in activeMembers">
      <div class="media-left">
        <div class="image is-64x64 profilePic">
          {{member.firstName[0] + member.lastName[0]}}
        </div>
      </div>
      <div class="media-content">
        <p class="is-size-4 has-text-weight-bold">{{member.firstName + " " + member.lastName}}</p>
        <p class="is-size-6">
          <router-link :to="{ name: 'MemberOverview', params: {memberId: member._id }, props: true }">Overview</router-link>
          <template v-if="!isCouple(member._id)">
            &#183;
            <router-link :to="{ name: 'MemberEdit', params: {memberId: member._id }, props: true }">Edit Member</router-link>
            &#183;
            <a v-on:click="confirmDeleteMember(member._id);">Delete Member</a>
          </template>
        </p>
      </div>
    </article>

    <article class="media has-text-grey-lighter" v-for="member in deletedMembers" v-if="!hideDeletedMembers">
      <div class="media-content">
        <p class="is-size-4 has-text-weight-bold">{{member.firstName + " " + member.lastName}}</p>
        <p class="is-size-6">
          <router-link :to="{ name: 'MemberOverview', params: {memberId: member._id }, props: true }">Overview</router-link>
          &#183;
          <router-link :to="{ name: 'MemberEdit', params: {memberId: member._id }, props: true }">Edit Member</router-link>
          &#183;
          <a v-on:click="confirmRestoreMember(member._id);">Restore Member</a>
        </p>
      </div>
      <div class="media-right">
        <span class="tag is-danger is-size-6">Deleted</span>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const coupleHandler = require('../../../handlers/coupleHandler');
const memberHandler = require('../../../handlers/memberHandler');

export default {
  name: 'Main-Wedding-Member',
  data() {
    return {
      deleteMemberModal: false,
      restoreMemberModal: false,
      localSuccess: null,
      localErrors: {},
      member: null,
      hideDeletedMembers: true,
      deleteOrRestoreLoading: false
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    coupleMember: function() {
      return this.members.filter(member => {
        return member.type === "couple"
      });
    },
    hasActiveMembers: function() {
      return this.members.filter(member => {
        return !member.isDeleted && member.type !== "couple";
      }).length > 0;
    },
    hasDeletedMembers: function() {
      return this.members.filter(member => {
        return member.isDeleted && member.type !== "couple";
      }).length > 0;
    },
    activeMembers: function() {
      return this.members.filter(member => {
        return !member.isDeleted && member.type !== "couple";
      });
    },
    deletedMembers: function() {
      return this.members.filter(member => {
        return member.isDeleted && member.type !== "couple";
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    isCouple: function(memberId) {
      const filteredIds = this.account.couple.coupleMembers.map(member => {
        return member._id;
      });
      return filteredIds.includes(memberId);
    },
    loadWeddingTeam: async function() {
      try {
        if (this.account._id && this.account.couple._id) {
          const getWeddingTeam = await coupleHandler.getWeddingTeam(this.tokens, this.account._id);
          this.setState({
            members: getWeddingTeam.weddingTeam
          })
        }
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    confirmDeleteMember: function(memberId) {
      this.deleteMemberModal = true;
      this.member = this.members.find(member => {
        return member._id === memberId;
      });
    },
    confirmRestoreMember: function(memberId) {
      this.restoreMemberModal = true;
      this.member = this.members.find(member => {
        return member._id === memberId;
      });
    },
    deleteMember: async function(memberId) {
      this.deleteMemberModal = false;
      this.deleteOrRestoreLoading = true;
      try {
        const deleteMember = await memberHandler.deleteMember(this.tokens, this.member._id);
        const members = this.members.map(member => {
          if (member._id === this.member._id) {
            member.isDeleted = true;
            return member;
          } else {
            return member;
          }
        });
        this.setState({
          members: members
        })
        this.localSuccess = 'Successfully deleted member.';
      } catch (e) {
        //
      }
      this.deleteOrRestoreLoading = false;
    },
    toggleHideDeletedMembers: function() {
      this.hideDeletedMembers = !this.hideDeletedMembers;
    },
    restoreMember: async function(memberId) {
      this.restoreMemberModal = false;
      this.deleteOrRestoreLoading = true;
      try {
        const restoreMember = await memberHandler.restoreMember(this.tokens, this.member._id);
        const members = this.members.map(member => {
          if (member._id === this.member._id) {
            member.isDeleted = false;
            return member;
          } else {
            return member;
          }
        });
        this.setState({
          members: members
        })
        this.localSuccess = 'Successfully restored member.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.deleteOrRestoreLoading = false;
    }
  },
  async created() {
    this.loadWeddingTeam();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
