import { Divider, Link, Message, TableColumnData } from '@arco-design/web-vue'
import { defaultsDeep } from 'lodash-es'
import { Ref } from 'vue'
import { delConfirm, delOptions } from '../AnForm/util'
import { defineOptionsHandler } from './util'
import { ButtonColumn, ColumnButton, UseTableColumn, AnTableInstance } from './interface'

export const useTableColumns = defineOptionsHandler((options, props, tableRef) => {
  props.columns = []

  for (let column of options.columns ?? []) {
    if (column.type === 'index') {
      column = useIndexColumn(column, tableRef)
    }

    if (column.type === 'button') {
      column = useButtonColumn(column, tableRef)
    }

    props.columns.push(column)
  }
})

const useDeleteButton = (btn: ColumnButton, tableRef: Ref<AnTableInstance | null>) => {
  const onClick = btn.onClick
  let confirm = btn.confirm ?? {}
  if (typeof confirm === 'string') {
    confirm = { content: confirm }
  }
  defaultsDeep(btn, {
    buttonProps: {
      status: 'danger',
    },
  })
  btn.onClick = async props => {
    delConfirm({
      ...delOptions,
      ...confirm,
      async onBeforeOk() {
        const res: any = await onClick?.(props)
        const msg = res?.data?.message
        msg && Message.success(`提示: ${msg}`)
        tableRef.value?.refresh()
      },
    })
  }
  return btn
}

function useModifyButton(btn: ColumnButton, tableRef: Ref<AnTableInstance | null>) {
  const onClick = btn.onClick
  btn.onClick = async props => {
    const data = (await onClick?.(props)) ?? props.record
    tableRef.value?.modifyRef?.open(data)
  }
  return btn
}

const useIndexColumn = (column: UseTableColumn, tableRef: Ref<AnTableInstance | null>) => {
  column.render = data => {
    const page = tableRef.value?.paging?.current ?? 1
    const size = tableRef.value?.paging?.pageSize ?? 10
    const index = data.rowIndex
    return `${(page - 1) * size + index + 1}`
  }
  return column
}

function useButtonColumn(column: TableColumnData & ButtonColumn, tableRef: Ref<AnTableInstance | null>) {
  const items: ColumnButton[] = []

  defaultsDeep(column, { align: 'right', title: '操作' })

  for (let button of column.buttons) {
    if (button.type === 'delete') {
      button = useDeleteButton(button, tableRef)
    }
    if (button.type === 'modify') {
      button = useModifyButton(button, tableRef)
    }
    items.push(button)
  }

  column.render = props => {
    return items.map((item, index) => {
      if (item.visible && !item.visible(props)) {
        return null
      }
      return (
        <>
          {index !== 0 && <Divider direction="vertical" margin={4} />}
          <Link {...item.buttonProps} disabled={item.disable?.(props)} onClick={() => item.onClick?.(props)}>
            {item.text}
          </Link>
        </>
      )
    })
  }

  return column
}
