import { mount } from '@vue/test-utils'
import VirtualTimer from '../../src/components/VirtualTimer.vue'

describe('VirtualTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 1, 1))
  })

  it('renders correctly', () => {
    const wrapper = mount(VirtualTimer)
    expect(wrapper.text()).toMatch('0.000')
  })

  it('puts timer into waiting state when "hands are put onto it"', () => {
    const wrapper = mount(VirtualTimer)

    wrapper.vm.putHandsDown()

    const timerText = wrapper.find('.time')
    expect(timerText.classes()).toContain('timer-waiting')
  })
})
