import PlayerView from '../../src/components/PlayerView.vue'
import StatsCollapse from '../mocks/components/StatsCollapse.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('PlayerView', () => {
  test('player view displays the scramble', () => {
    const scramble = "R U R' U'"

    const wrapper = mount(PlayerView, {
      props: { scramble, id: 'player1' },
      global: { stubs: { StatsCollapse: true } }
    })

    expect(wrapper.text()).toContain(scramble)
  })

  test('player view emits when scramble is clicked', () => {
    const scramble = "R U R' U'"
    const wrapper = shallowMount(PlayerView, {
      props: { scramble, id: 'player1' },
      global: { stubs: { StatsCollapse: StatsCollapse } }
    })

    const scrambleEl = wrapper.find('.scramble')
    scrambleEl.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('scramble-clicked')
  })

  test('player view emits on scramble click when stats child component does not have needed properties', () => {
    const scramble = "R U R' U'"
    const wrapper = shallowMount(PlayerView, {
      props: { scramble, id: 'player1' },
      global: { stubs: { StatsCollapse: {} } }
    })

    const scrambleEl = wrapper.find('.scramble')
    scrambleEl.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('scramble-clicked')
  })

  test('player view does not emit on scramble click when stats are open', () => {
    const scramble = "R U R' U'"
    const wrapper = mount(PlayerView, {
      props: { scramble, id: 'player1' },
      global: { stubs: { StatsCollapse: StatsCollapse } }
    })
    const statsCollapse = wrapper.findComponent(StatsCollapse)
    statsCollapse.vm.isOpen = true

    const scrambleEl = wrapper.find('.scramble')
    scrambleEl.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('scramble-clicked')
  })
})
