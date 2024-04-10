import { defineOptionsHandler } from './util'

export const useTablePaging = defineOptionsHandler((options, props, tableRef) => {
  props.paging = { showTotal: true, showPageSize: true, ...(options.paging ?? {}) }

  const onPageChange = props.tableProps!.onPageChange
  const onPageSizeChange = props.tableProps!.onPageSizeChange

  props.tableProps!.onPageChange = (page: number) => {
    onPageChange?.(page)
    tableRef.value?.load(page)
  }

  props.tableProps!.onPageSizeChange = (size: number) => {
    onPageSizeChange?.(size)
    tableRef.value?.load(1, size)
  }
})
