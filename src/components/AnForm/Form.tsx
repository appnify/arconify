import { Form, FormInstance, Message } from '@arco-design/web-vue'
import { cloneDeep, isFunction, isObject, merge } from 'lodash-es'
import { ComputedRef, InjectionKey, PropType, Ref, computed, defineComponent, onMounted, provide, ref } from 'vue'
import { AnFormItem, AnFormItemProps } from './FormItem'
import { SetterType, setterMap } from './setters'
import { Recordable, getModel, useVModel } from './util'

const SUBMIT_ITEM = {
  field: 'id',
  setter: 'submit' as const,
  itemProps: {
    hideLabel: true,
  },
  setterProps: {},
  setterSlots: {},
}

export type FormContextInterface = {
  formRef: Ref<FormInstance | null>
  model: Ref<Recordable>
  items: ComputedRef<AnFormItemProps[]>
  loading: Ref<boolean>
  submitForm: any
  resetForm: any
}

export const FormContextKey = Symbol('FormContextKey') as InjectionKey<FormContextInterface>

/**
 * 表单组件
 */
export const AnForm = defineComponent({
  name: 'AnForm',
  props: {
    /**
     * 表单数据
     * @example
     * ```ts
     * {
     *   id: undefined,
     *   name: undefined
     * }
     * ```
     */
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    /**
     * 表单项
     * @example
     * ```ts
     * [{
     *   field: 'name',
     *   label: '昵称',
     *   setter: 'input'
     * }]
     * ```
     */
    items: {
      type: Array as PropType<AnFormItemProps[]>,
      default: () => [],
    },
    /**
     * 提交表单
     * @example
     * ```ts
     * (model) => api.user.addUser(model)
     * ```
     */
    submit: {
      type: [Function, Object] as PropType<AnFormSubmit>,
    },
    /**
     * 传给Form组件的参数
     * @exmaple
     * ```ts
     * {
     *   layout: 'vertical'
     * }
     * ```
     */
    formProps: {
      type: Object as PropType<Omit<FormInstance['$props'], 'model' | 'ref'>>,
    },
  },
  emits: ['update:model'],
  setup(props, { slots, emit }) {
    const model = useVModel(props, 'model', emit)
    const items = computed(() => props.items)
    const initModel = cloneDeep(model.value)
    const loading = ref(false)
    const formRef = ref<FormInstance | null>(null)

    const submitItem = (() => {
      if (!props.submit) {
        return null
      }
      if (isFunction(props.submit)) {
        return SUBMIT_ITEM
      }
      if (isObject(props.submit)) {
        return merge({}, SUBMIT_ITEM, props.submit)
      }
    })()

    const resetForm = () => {
      model.value = cloneDeep(initModel)
      formRef.value?.clearValidate()
    }

    const submitForm = async () => {
      if (await formRef.value?.validate()) {
        return
      }
      const submit: any = typeof props.submit === 'object' ? props.submit.visible : props.submit
      try {
        loading.value = true
        const data = getModel(model.value)
        const res = await submit?.(data, props.items)
        const msg = res?.data?.message
        msg && Message.success(`提示: ${msg}`)
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }

    const context = {
      slots,
      loading,
      resetForm,
      submitForm,
      submitItem,
      model,
      items,
      formRef,
    }

    provide(FormContextKey, context)

    onMounted(() => {
      for (const item of props.items) {
        const setter = setterMap[item.setter as SetterType]
        setter.onSetup?.({ item, items: props.items, model })
      }
    })

    return context
  },
  render() {
    return (
      <Form layout="vertical" {...this.formProps} class="an-form" ref="formRef" model={this.model}>
        {this.items.map(item => (
          <AnFormItem key={item.field} item={item} items={this.items} model={this.model}></AnFormItem>
        ))}
        {this.submitItem && <AnFormItem model={this.model} items={this.items} item={this.submitItem}></AnFormItem>}
      </Form>
    )
  },
})

export type AnFormInstance = InstanceType<typeof AnForm> & {}

export type AnFormProps = Pick<AnFormInstance['$props'], 'model' | 'items' | 'submit' | 'formProps'>

export type AnFormSubmitFn = (model: Recordable, items: AnFormItemProps[]) => any

export type AnFormSubmit = AnFormSubmitFn | AnFormItemProps
