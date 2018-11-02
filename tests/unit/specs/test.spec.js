import Vue from 'vue'
import Hello from '@/components/Hello'
import UpdateProfile from '@/components/auth/UpdateProfile'

describe('UpdateProfile.vue', () => {
    it('type of sub-head should be string', () => {
        const Constructor = Vue.extend(UpdateProfile)
        const vm = new Constructor().$mount()
        expect(typeof vm.$el.querySelector('.md-subhead').textContent).to.be.a('string')
    })
});