import {mount} from '@vue/test-utils'
import App from '../../src/App.vue'
import { test, expect } from 'vitest'

test('App is rendering top half', () => {
    const wrapper = mount(App)
    const el = wrapper.find('#top-half')
    expect(el.exists()).toBe(true)
})