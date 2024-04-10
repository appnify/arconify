import { Ref, reactive, ref } from 'vue'
import { AnTable } from './Table'
import { useTableCreate } from './useTableCreate'
import { useTableModify } from './useTableModify'
import { useTableSearch } from './useTableSearch'
import { useTableColumns } from './useTableColumns'
import { useTableActions } from './useTableActions'
import { useTablePaging } from './useTablePaging'
import { Mutable, UseTableComponent, UseTableOptions, UseTableOptionsFn, AnTableInstance, AnTableProps } from './interface'

/**
 * 构建一个表格组件
 */
export function useTable(options: UseTableOptions | UseTableOptionsFn): UseTableComponent {
  const tableRef = ref<AnTableInstance | null>(null)
  const refresh = () => tableRef.value?.refresh()
  const reload = () => tableRef.value?.reload()
  const option = typeof options === 'function' ? options(tableRef) : options
  const props = reactive(useTableProps(option, tableRef)) as AnTableProps

  return {
    name: 'AnTableWrapper',
    tableRef,
    refresh,
    reload,
    render() {
      return (
        <AnTable
          ref={(el: any) => (tableRef.value = el)}
          data={props.data}
          columns={props.columns}
          paging={props.paging}
          search={props.search}
          create={props.create}
          modify={props.modify}
          actions={props.actions}
          widgets={props.widgets}
          tableProps={props.tableProps}
          tableSlots={props.tableSlots}
        ></AnTable>
      )
    },
  }
}

export function useTableProps(options: UseTableOptions, tableRef: Ref<AnTableInstance | null>): AnTableProps {
  const props: Mutable<AnTableProps> = {
    data: options.data,
    tableProps: options.tableProps ?? {},
    tableSlots: options.tableSlots ?? {},
  }

  useTableCreate(options, props, tableRef)
  useTableSearch(options, props, tableRef)
  useTableModify(options, props, tableRef)
  useTablePaging(options, props, tableRef)
  useTableColumns(options, props, tableRef)
  useTableActions(options, props, tableRef)

  return props
}
