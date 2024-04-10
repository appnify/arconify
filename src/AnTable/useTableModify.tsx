import { cloneDeep, defaults, merge } from 'lodash-es'
import { FormItem, UseFormModalOptions, useFormModalProps } from '../AnForm'
import { defineOptionsHandler } from './util'

export const useTableModify = defineOptionsHandler((options, props, tableRef) => {
  if (!options.modify) {
    return
  }

  const { create, modify } = options

  for (const column of options.columns ?? []) {
    if (column.type === 'button') {
      const btn = column.buttons.find(i => i.type === 'modify')
      if (!btn) {
        column.buttons.unshift({
          text: '修改',
          type: 'modify',
          onClick({ record }) {
            tableRef.value?.modifyRef?.open(record)
          },
        })
      } else {
        const onClick = btn.onClick
        defaults(btn, { text: '修改' })
        btn.onClick = props => {
          const data = onClick?.(props) ?? props.record
          tableRef.value?.modifyRef?.open(data)
        }
      }
      break
    }
  }

  let result: UseFormModalOptions = { items: [], model: cloneDeep(props.create!.model) }
  if (modify.extend && create) {
    result = merge({}, create)
  }
  result = merge(result, modify)

  if (modify.items) {
    const items: FormItem[] = []
    const createItemMap: Record<string, FormItem> = {}
    for (const item of create?.items ?? []) {
      createItemMap[item.field] = item
    }
    for (let item of modify.items ?? []) {
      if (item.extend) {
        item = merge({}, createItemMap[item.field!] ?? {}, item)
      }
      items.push(item as any)
    }
    if (items.length) {
      result.items = items
    }
  }

  props.modify = useFormModalProps(result)
})
