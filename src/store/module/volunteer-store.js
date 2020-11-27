import { volunteerService } from '../../service/volunteer-service.js'

export const volunteerStore = {
    state: {
        volunteers: [],
        tags: ['animals', 'Children', 'Food', 'Needy', 'COVID-19', 'Fun', 'baby'],
        neededs: ['Doctors', 'Field Manager', 'Chef'],
    },
    getters: {
        volunteersForDisplay(state) {
            return state.volunteers
        },
        tags(state) {
            return state.tags
        },
        neededs(state) {
            return state.neededs
        },
    },
    mutations: {
        setVolunteers(state, { volunteers }) {
            state.volunteers = volunteers
        },
        addVolunteer(state, { volunteer }) {
            state.volunteers.push(volunteer)
        },
        updateVolunteer(state, { volunteer }) {
            const idx = state.volunteers.findIndex(currVolunteer => {
                return currVolunteer._id === volunteer._id
            })
            state.volunteers.splice(idx, 1, volunteer)
        },
        removeVolunteer(state, { volunteer }) {
            const idx = state.volunteers.findIndex(currVolunteer => currVolunteer._id === volunteer._id)
            state.volunteers.splice(idx, 1)
        },
    },
    actions: {
        async saveVolunteer({ commit }, { volunteer }) {
            console.log('saveStoreVolunteer', volunteer);
            const actionType = (volunteer._id) ? 'updateVolunteer' : 'addVolunteer';
            const savedVolunteer = await volunteerService.save(volunteer)
            console.log('saved', savedVolunteer);
            commit({ type: actionType, volunteer: savedVolunteer })
            return savedVolunteer;

        },
        async setVolunteers({ commit }) {
            try {
                const volunteers = await volunteerService.query()
                commit({ type: 'setVolunteers', volunteers })
            } catch (err) {
                console.log('err', err);
            }
        },
        async removeVolunteer({ commit }, payload) {
            await volunteerService.remove(payload.volunteer._id)
            commit(payload)
        },
        async setSortVolunteers({ commit }, { sortBy }) {
            console.log(sortBy);
            const volunteers = await volunteerService.getSortList(sortBy)
            commit({ type: 'setVolunteers', volunteers })
        },
        async getVolunteerById(context, { _id }) {
            console.log("🚀 ~ file: volunteer-store.js ~ line 66 ~ getVolunteerById ~ _id", _id)
            return await volunteerService.getById(_id)
        }
    }
}