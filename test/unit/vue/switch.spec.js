import {mount} from '@vue/test-utils'
import Switch from '../../../src/components/Switch.vue'

/*test('switch', () => {
  const wrapper = mount(Switch)
  expect(wrapper.isVueInstance()).toBeTruthy()
  console.log(wrapper.element)
  console.log(wrapper.options)
  // { attachedToDocument: false, sync: true }
  console.log(wrapper.attributes())
  // { class: 'v-switch' }
  console.log(wrapper.classes())
  // [ 'v-switch' ]
  console.log(wrapper.html())
  // <label class="v-switch"><input type="checkbox"> <span></span></label>
  console.log(wrapper.is('div'))
  // false
  console.log(wrapper.isEmpty())
  // false
  console.log(wrapper.isVisible())
  // true
  console.log(wrapper.name())
  // v-switch
  console.log(wrapper.props())
  // { value: false, name: undefined, disabled: false }
  console.log(wrapper.text())
  //
})*/

test('switch', () => {
  const wrapper = mount(Switch, {
    propsData: {
      value: false,
      name: 'lock',
      disabled: false
    }
  })
  expect(wrapper.isVueInstance()).toBeTruthy()
  expect(wrapper.classes()).toContain('v-switch')
  expect(wrapper.is('div')).toBeFalsy()
  expect(wrapper.is('label')).toBeTruthy()
  expect(wrapper.isEmpty()).toBeFalsy()
  expect(wrapper.isVisible()).toBeTruthy()
  expect(wrapper.name()).toBe('v-switch')
  expect(wrapper.props('value')).toBeFalsy()
  expect(wrapper.props('name')).toBe('lock')
  expect(wrapper.props('disabled')).toBeFalsy()

  const checkboxInput = wrapper.find('input[type="checkbox"]')
  checkboxInput.setChecked()
  expect(wrapper.emitted('input')).toBeTruthy()
  expect(wrapper.emitted().input.length).toBe(1)
  expect(wrapper.emitted('input')[0]).toEqual([true])

  checkboxInput.setChecked(false)
  expect(wrapper.emitted('input')).toBeTruthy()
  expect(wrapper.emitted().input.length).toBe(2)
  expect(wrapper.emitted('input')[1]).toEqual([false])

  wrapper.setProps({ disabled: true })
  expect(wrapper.props('disabled')).toBeTruthy()
  expect(wrapper.classes()).toContain('disabled')
})
