import { defaultsDeep } from 'lodash-es'
import { defineOptionsHandler } from './util'
import { Button } from '@arco-design/web-vue'
import { AnTableAction } from './interface'
import { IconRefresh } from '@arco-design/web-vue/es/icon'

export const useTableActions = defineOptionsHandler((options, props, tableRef) => {
  if (!options.actions) {
    return
  }

  props.actions = []
  let hasSelection = false

  for (const action of options.actions) {
    if (action.render) {
      props.actions.push(action as AnTableAction)
      continue
    }

    if (typeof action.text === 'string') {
      const text = action.text
      action.text = () => text
    }

    if (typeof action.icon === 'string') {
      const icon = action.icon
      action.icon = () => <i class={icon}></i>
    }

    if (action.type === 'refresh') {
      action.position ??= 'right'
      action.icon ??= () => <IconRefresh />
      action.onClick = () => tableRef.value?.refresh()
      action.render = () => {
        if (action.visible && !action.visible()) {
          return null
        }
        return (
          <Button {...action.buttonProps} status={action.status} loading={tableRef.value?.loading} onClick={action.onClick as any}>
            {{ default: action.text, icon: action.icon }}
          </Button>
        )
      }
    }

    if (action.type === 'selection') {
      const onClick = action.onClick
      const disable = action.disable
      hasSelection = true

      action.disable = () => {
        return disable?.() || tableRef.value?.selected.size === 0
      }

      action.onClick = (event: MouseEvent) => {
        const selected = tableRef.value?.selected ?? new Map()
        const rowKeys = [...selected.keys()]
        const rows = [...selected.values()]
        onClick?.(event, rowKeys, rows)
      }
      action.render = () => {
        if (action.visible && !action.visible()) {
          return null
        }
        return (
          <Button {...action.buttonProps} status={action.status} disabled={action.disable?.()} onClick={action.onClick as any}>
            {{ default: action.text, icon: action.icon }}
          </Button>
        )
      }
    }

    defaultsDeep(action, {
      position: 'left',
      buttonSlots: {},
    })

    props.actions.push(action as AnTableAction)
  }

  if (!hasSelection) {
    return
  }

  defaultsDeep(props.tableProps, {
    rowSelection: {
      showCheckedAll: true,
    },
  })

  const onSelect = props.tableProps!.onSelect
  const onSelectAll = props.tableProps!.onSelectAll

  props.tableProps!.onSelect = (rowKeys, rowKey, record) => {
    onSelect?.(rowKeys, rowKey, record)
    if (rowKeys.includes(rowKey)) {
      tableRef.value?.selected.set(rowKey, record)
    } else {
      tableRef.value?.selected.delete(rowKey)
    }
  }

  props.tableProps!.onSelectAll = checked => {
    onSelectAll?.(checked)
    const data = tableRef.value?.renderData || []
    const key = tableRef.value?.tableProps!.rowKey ?? 'id'
    for (const row of data) {
      if (checked) {
        tableRef.value?.selected.set(row[key], row)
      } else {
        tableRef.value?.selected.delete(row[key])
      }
    }
  }

  console.log(props.actions)
})
