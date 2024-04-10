import { defaultsDeep, merge } from 'lodash-es'
import { AnFormItemProps, FormItem, useFormItems } from '../AnForm'
import { defineOptionsHandler } from './util'
import { Button } from '@arco-design/web-vue'

export const useTableSearch = defineOptionsHandler((options, props, tableRef) => {
  if (!options.search) {
    return
  }

  const search = Array.isArray(options.search) ? { items: options.search } : options.search
  const isInline = search.formProps?.layout === 'inline'
  const extendMap = options.create!.items.reduce((m, v: any) => ((m[v.field] = v), m), {} as Record<string, AnFormItemProps>)

  props.search = {
    items: [] as AnFormItemProps[],
    model: search.model ?? {},
    formProps: defaultsDeep({}, search.formProps, { layout: 'inline' }),
  }

  const defualts: Partial<AnFormItemProps> = {
    setter: 'input',
    itemProps: {
      hideLabel: isInline,
    },
    setterProps: {},
  }

  const items: FormItem[] = []

  for (const _item of search.items ?? []) {
    const { searchable, enterable, field, extend, ...itemRest } = _item
    if ((field || extend) === 'submit' && search.hideSearch) {
      continue
    }
    let item: FormItem = defaultsDeep({ field }, itemRest, defualts)
    if (extend) {
      const extendItem = extendMap[extend]
      if (extendItem) {
        item = merge({}, extendItem, itemRest)
      }
    }
    if (item.setter === 'search') {
      Object.assign(item.setterProps!, {
        onSearch: () => tableRef.value?.reload(),
        onPressEnter: () => tableRef.value?.reload(),
      })
    }
    if (item.setterProps) {
      ;(item.setterProps as any).placeholder = (item.setterProps as any).placeholder ?? item.label
    }
    items.push(item)
  }

  props.search.items = useFormItems(items, props.search!.model!)

  if (!isInline) {
    props.search.items.push({
      field: 'submit',
      setter: 'submit',
      itemProps: {
        style: 'grid-column-start: 4; display: flex; justify-content: end',
      },
      itemSlots: {
        default: () => {
          return (
            <div class="space-x-2">
              <Button>重置</Button>
              <Button type="primary">查询</Button>
            </div>
          )
        },
      },
    })
  }
})
