import Vue from 'vue'
import Hello from '@/components/Hello'
import UpdateProfile from '@/components/auth/UpdateProfile'

describe('Hello.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Hello)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.hello h1').textContent)
            .to.equal('Welcome to Your Vue.js App')
    })
})

describe('UpdateProfile.vue', () => {
    it('type of sub-head should be string', () => {
        const Constructor = Vue.extend(UpdateProfile)
        const vm = new Constructor().$mount()
        expect(typeof vm.$el.querySelector('.md-subhead').textContent).to.be.a('string')
    })
});