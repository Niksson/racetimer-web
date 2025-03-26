import { shallowMount } from '@vue/test-utils'
import StatsList from '../../src/components/StatsList.vue'

describe('StatsList', () => {
  test('displays stats', () => {
    const calculatedStats = {
      avg5: 10345
    }
    const wrapper = shallowMount(StatsList, {
      props: {
        stats: calculatedStats,
        totalSolves: 5,
        successfulSolves: 5
      }
    })

    expect(wrapper.find('ul').text()).toContain('avg5: 10.345')
  })

  test('displays n/a if a stat is null', () => {
    const calculatedStats = {
      avg5: null
    }
    const wrapper = shallowMount(StatsList, {
      props: {
        stats: calculatedStats,
        totalSolves: 5,
        successfulSolves: 5
      }
    })

    expect(wrapper.find('ul').text()).toContain('avg5: n/a')
  })

  test('displays solves number', () => {
    const totalSolves = 5
    const successfulSolves = 4
    const wrapper = shallowMount(StatsList, {
      props: {
        stats: {},
        totalSolves,
        successfulSolves
      }
    })

    expect(wrapper.find('ul').text()).toContain('total: 4/5')
  })
})
