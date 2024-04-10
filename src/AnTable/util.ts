import { Ref } from 'vue'
import { Mutable, MaybePromise, UseTableOptions, UseTableComponent, AnTableInstance, AnTableProps } from './interface'
import { getModel } from '../AnForm'

type Handler = (options: UseTableOptions, props: Mutable<AnTableProps>, tableRef: Ref<AnTableInstance | null>) => MaybePromise<void>
type TableHelper = (table: UseTableComponent) => any

export const defineOptionsHandler = (handler: Handler): Handler => handler
export const defineTableHelper = <T extends TableHelper>(helper: T): T => helper

/**
 * 重载表格，会重置分页
 */
export const reloadTable = defineTableHelper(table => {
  return table.tableRef.value?.reload()
})

/**
 * 刷新表格，不会重置分页
 */
export const refresh = defineTableHelper(table => {
  return table.tableRef.value?.refresh()
})

export const getSearchModel = defineTableHelper(table => {
  return getModel(table.tableRef.value?.search?.model ?? {})
})

export const getSearchRawModel = defineTableHelper(table => {
  return table.tableRef.value?.search?.model
})

export const getCreateModel = defineTableHelper(table => {
  return getModel(table.tableRef.value?.createRef?.model ?? {})
})

export const getCreateRawModel = defineTableHelper(table => {
  return table.tableRef.value?.createRef?.model
})

export const getModifyModel = defineTableHelper(table => {
  return getModel(table.tableRef.value?.modify?.model ?? {})
})

export const getModifyRawModel = defineTableHelper(table => {
  return table.tableRef.value?.modify?.model
})
