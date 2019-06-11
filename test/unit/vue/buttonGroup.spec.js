import {mount} from '@vue/test-utils'
import ButtonGroup from '../../../src/components/ButtonGroup.vue'
import Button from '../../../src/components/Button.vue'

test('buttonGroup', () => {
  const btn = mount(Button, {
    slots: {
      default: 'Confirm'
    }
  })
  const wrapper = mount(ButtonGroup, {
    slots: {
      default: [Button, btn.html(), Button]
    }
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
  expect(wrapper.classes()).toContain('v-btn-group')
  expect(wrapper.name()).toBe('v-button-group')
  expect(wrapper.is('div')).toBeTruthy()
  const buttons = wrapper.findAll('button')
  expect(buttons.length).toBe(3)
  expect(buttons.at(0).is(Button)).toBeTruthy()
  expect(buttons.at(1).text()).toBe('Confirm')
})
