import { FieldRule, FormItem, FormItemInstance, SelectOptionData, SelectOptionGroup } from '@arco-design/web-vue'
import { InjectionKey, PropType, computed, defineComponent, provide } from 'vue'
import { SetterItem, SetterType, setterMap } from './setters'
import { Recordable } from './util'

export const FormItemContextKey = Symbol('FormItemContextKey') as InjectionKey<AnFormItemFnProps>

/**
 * 表单项
 */
export const AnFormItem = defineComponent({
  name: 'AnFormItem',
  props: {
    /**
     * 表单项
     */
    item: {
      type: Object as PropType<AnFormItemProps>,
      required: true,
    },
    /**
     * 表单项数组
     */
    items: {
      type: Array as PropType<AnFormItemProps[]>,
      required: true,
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Recordable>,
      required: true,
    },
  },
  setup(props) {
    const rules = computed(() => props.item.rules?.filter(i => !i.disable?.(props)))
    const disabled = computed(() => Boolean(props.item.disable?.(props)))

    const setterSlots = (() => {
      const slots: Recordable = {}
      for (const [name, Render] of Object.entries(props.item.setterSlots ?? {})) {
        slots[name] = (p: Recordable) => {
          return <Render {...p} {...props} />
        }
      }
      return slots
    })()

    const itemSlots = (() => {
      const slots: Recordable = {}

      for (const [name, Render] of Object.entries(props.item.itemSlots ?? {})) {
        slots[name] = (p: Recordable) => {
          return <Render {...p} {...props}></Render>
        }
      }

      const Setter = setterMap[props.item.setter as SetterType]?.setter as any
      if (Setter && !slots.default) {
        slots.default = () => (
          <Setter {...props.item.setterProps} v-model={props.model[props.item.field]}>
            {{ ...setterSlots }}
          </Setter>
        )
      }

      return slots
    })()

    provide(FormItemContextKey, props)

    return () => {
      if (props.item.visible && !props.item.visible(props)) {
        return null
      }
      return (
        <FormItem {...props.item.itemProps} class="an-form-item" label={props.item.label} rules={rules.value} disabled={disabled.value} field={props.item.field}>
          {{ ...itemSlots }}
        </FormItem>
      )
    }
  },
})

export type AnFormItemBoolFn = (args: AnFormItemFnProps) => boolean

export type AnFormItemElemFn = (args: AnFormItemFnProps) => any

export type AnFormItemFnProps = { model: Recordable; item: AnFormItemProps; items: AnFormItemProps[] }

export type AnFormItemRule = FieldRule & { disable?: AnFormItemBoolFn }

export type AnFormItemOption = string | number | boolean | SelectOptionData | SelectOptionGroup

export type AnFormItemSlot = (props: AnFormItemFnProps) => any

export type AnFormItemSlots = {
  /**
   * 默认插槽
   * @param props 参数
   */
  default?: AnFormItemSlot

  /**
   * 帮助插槽
   * @param props 参数
   */
  help?: AnFormItemSlot

  /**
   * 额外插槽
   * @param props 参数
   */
  extra?: AnFormItemSlot

  /**
   * 标签插槽
   * @param props 参数
   */
  label?: AnFormItemSlot
}

export type AnFormItemPropsBase = {
  /**
   * 标签
   * @example
   * ```ts
   * '昵称'
   * ```
   */
  label?: string

  /**
   * 字段名
   * @description 字段名唯一，支持特殊语法，如 `[startDate, endDate]`
   * @example
   * ```ts
   * 'username'
   * ```
   */
  field: string

  /**
   * 校验规则
   * @example
   * ```ts
   * ['email']
   * ```
   */
  rules?: AnFormItemRule[]

  /**
   * 是否可见
   * @example
   * ```ts
   * (props) => Boolean(props.model.id)
   * ```
   */
  visible?: AnFormItemBoolFn

  /**
   * 是否禁用
   * @example
   * ```ts
   * (props) => Boolean(props.model.id)
   * ```
   */
  disable?: AnFormItemBoolFn

  /**
   * 选项
   * @description 适用于下拉框等组件
   * @example
   * ```ts
   * [
   *   {
   *     label: '方式1',
   *     value: 1
   *   }
   * ]
   * ```
   */
  options?: AnFormItemOption[] | ((args: AnFormItemFnProps) => AnFormItemOption[] | Promise<AnFormItemOption[]>)

  /**
   * 表单项参数
   * @example
   * ```ts
   * {
   *   hideLabel: true
   * }
   * ```
   */
  itemProps?: Partial<Omit<FormItemInstance['$props'], 'field' | 'label' | 'required' | 'rules' | 'disabled'>>

  /**
   * 表单项插槽
   * @example
   * ```tsx
   * {
   *   help: () => <span>帮助提示</span>
   * }
   * ```
   */
  itemSlots?: AnFormItemSlots

  /**
   * 内置
   * @private
   */
  $init?: () => void
}

export type AnFormItemProps = AnFormItemPropsBase & SetterItem
