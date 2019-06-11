import {mount} from '@vue/test-utils'
import Button from '../../../src/components/Button.vue'
import Icon from '../../../src/components/Icon.vue'

test('button', () => {
  const wrapper = mount(Button, {
    slots: {
      default: 'Confirm'
    }
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
  expect(wrapper.classes()).toContain('v-btn')
  expect(wrapper.classes()).toContain('v-btn-primary')
  expect(wrapper.is('button')).toBeTruthy()
  expect(wrapper.isVisible()).toBeTruthy()
  expect(wrapper.name()).toBe('v-button')
  expect(wrapper.attributes('type')).toBe('button')
  expect(wrapper.text()).toBe('Confirm')

  wrapper.setProps({
    type: 'ghost',
    size: 'sm',
    icon: 'download'
  })
  expect(wrapper.classes()).not.toContain('v-btn-primary')
  expect(wrapper.classes()).toContain('v-btn-ghost')
  expect(wrapper.classes()).toContain('v-btn-sm')
  const icon = wrapper.find('.icon-download')
  expect(icon.is(Icon)).toBe(true)

  wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
  expect(wrapper.emitted('click').length).toBe(1)

  wrapper.setProps({
    loading: true
  })
  const icon2 = wrapper.find('.icon-refresh')
  expect(icon2.is(Icon)).toBe(true)
  wrapper.trigger('click')
  expect(wrapper.emitted('click').length).toBe(1)

  wrapper.setProps({
    submit: true
  })
  expect(wrapper.attributes('type')).toBe('submit')
})
