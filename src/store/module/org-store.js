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
        removeOrgById(state, { orgId }) {
            const idx = state.orgs.findIndex(currOrg => currOrg._id === orgId)
            state.orgs.splice(idx, 1)
        },
    },
    actions: {
        async saveOrg({ commit }, { org }) {
            try {
                const actionType = (org._id) ? 'updateOrg' : 'addOrg';
                const savedOrg = await orgService.save(org)
                commit({ type: actionType, org: savedOrg })
                return { type: true, err: null }
            } catch (err) {
                return { type: false, err }
            }

        },
        async setOrgs({ commit }) {
            try {
                const orgs = await orgService.query()
                commit({ type: 'setOrgs', orgs })
                return { type: true, err: null }
            } catch (err) {
                console.log('err', err);
                return { type: false, err }
            }
        },
        async removeOrgById({ commit, dispatch }, payload) {
            try {
                await orgService.remove(payload.orgId)
                commit(payload)
                payload.orgEventis.forEach(eventi => {
                    dispatch({ type: 'removeEventiById', eventiId: eventi._id }, { root: true })
                });
                return { type: true, err: null }
            } catch (err) {
                return { type: false, err }
            }
        },
        async setSortOrgs({ commit }, { sortBy }) {
            console.log(sortBy);
            const orgs = await orgService.getSortList(sortBy)
            commit({ type: 'setOrgs', orgs })
        }
    }
}