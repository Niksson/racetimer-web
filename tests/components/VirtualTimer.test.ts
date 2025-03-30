import { mount } from '@vue/test-utils'
import VirtualTimer from '../../src/components/VirtualTimer.vue'

describe('VirtualTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 1, 1))
  })

  test('renders correctly', () => {
    const wrapper = mountVirtualTimer()
    expect(wrapper.text()).toMatch('0.000')
    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-ready')
  })

  test('puts timer into waiting state when "hands are put onto it"', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-waiting')
  })

  test('puts timer back into ready if "hands are up" before delay', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).not.toContain('timer-waiting')
  })

  test('puts timer into standby after delay', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-standby')
  })

  test('tracks time when timer is running', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')

    expect(timerText.text()).toBe('0.350')
  })

  test('puts timer into stopped after putting hands down again', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-stopped')
  })

  test('updates context time one last time when stopping', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-stopped')
    expect(timerText.text()).toBe('0.355')
  })

  test('emits elapsed time after stopping', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchend')

    expect(wrapper.emitted('timer-stopped')).toEqual([[355]])
  })

  test('does not allow to start again after stopping but before unblocking', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).not.toContain('timer-standby')
  })

  test('allows to start again after stopping after unblocking', async () => {
    const wrapper = mountVirtualTimer()

    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(350)
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchend')
    await wrapper.vm.$nextTick()
    wrapper.vm.unblock()
    await wrapper.vm.$nextTick()
    await wrapper.trigger('touchstart')
    await vi.advanceTimersByTimeAsync(355)
    await wrapper.vm.$nextTick()

    const timerText = wrapper.find('.timer')
    expect(timerText.classes()).toContain('timer-standby')
  })
})

function mountVirtualTimer() {
  return mount(VirtualTimer)
}
