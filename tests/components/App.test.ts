import {mount} from '@vue/test-utils'
import App from '../../src/App.vue'

test('App is rendering top half', () => {
    const wrapper = mount(App)
    const el = wrapper.find('#top-half')
    expect(el.exists()).toBe(true)
})
test('App is rendering bottom half', () => {
    const wrapper = mount(App)
    const el = wrapper.find('#bottom-half')
    expect(el.exists()).toBe(true)
})