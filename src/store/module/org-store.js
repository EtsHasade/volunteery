import { orgService } from '../../service/org-service.js'

export const orgStore = {
    state: {
        orgs: [],
    },
    getters: {
        orgsForDisplay(state) {
            return state.orgs
        },
    },
    mutations: {
        setOrgs(state, { orgs }) {
            state.orgs = orgs
        },
        addOrg(state, { org }) {
            state.orgs.push(org)
        },
        updateOrg(state, { org }) {
            const idx = state.orgs.findIndex(currOrg => {
                return currOrg._id === org._id
            })
            state.orgs.splice(idx, 1, org)
        },
        removeOrg(state, { org }) {
            const idx = state.orgs.findIndex(currOrg => currOrg._id === org._id)
            state.orgs.splice(idx, 1)
        },
    },
    actions: {
        async saveOrg({ commit }, { org }) {
            console.log('saveStoreOrg', org);
            const actionType = (org._id) ? 'updateOrg' : 'addOrg';
            const savedOrg = await orgService.save(org)
            console.log('saved', savedOrg);
            commit({ type: actionType, org: savedOrg })
            return savedOrg;

        },
        async setOrgs({ commit }) {
            try {
                const orgs = await orgService.query()
                commit({ type: 'setOrgs', orgs })
            } catch (err) {
                console.log('err', err);
            }
        },
        async removeOrg({ commit }, payload) {
            await orgService.remove(payload.org._id)
            commit(payload)
        },
        async setSortOrgs({ commit }, { sortBy }) {
            console.log(sortBy);
            const orgs = await orgService.getSortList(sortBy)
            commit({ type: 'setOrgs', orgs })
        }
    }
}