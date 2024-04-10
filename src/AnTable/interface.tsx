import { ButtonProps, PaginationProps, TableColumnData, TableData, TableInstance } from '@arco-design/web-vue'
import { FormItem, UseFormModalOptions, UseFormOptions } from '../AnForm'
import { Component, FunctionalComponent, Ref } from 'vue'
import { AnTable } from './Table'

// ===========================================================================================
// 公共部分
// ===========================================================================================

export type MaybePromise<T = void> = T | Promise<T>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
export type Recordable<T = any> = Record<string, T>

// ===========================================================================================
// 表格部分
// ===========================================================================================

export type TableDataFn = (params: { page: number; size: number; [key: string]: any }) => MaybePromise<TableData[] | { data: TableData[]; total: number }>
export type AnTableData = TableData[] | TableDataFn
export type AnTableColumnRenderArgs = { record: TableData; column: TableColumnData; rowIndex: number }
export type TableColumnRender = (data: AnTableColumnRenderArgs) => Component
export type ArcoTableProps = Omit<TableInstance['$props'], 'ref' | 'pagination' | 'loading' | 'data'>
export type ArcoTableSlots = {
  /**
   * 自定义 th 元素
   */
  th?: (column: TableColumnData) => any

  /**
   * 自定义 thead 元素
   */
  thead?: () => any

  /**
   * 空白展示
   */
  empty?: () => any

  /**
   * 总结行
   */
  'summary-cell'?: (column: TableColumnData, record: TableData, rowIndex: number) => any

  /**
   * 分页器右侧内容
   */
  'pagination-right'?: () => any

  /**
   * 分页器左侧内容
   */
  'pagination-left'?: () => any

  /**
   * 自定义 td 元素
   */
  td?: (column: TableColumnData, record: TableData, rowIndex: number) => any

  /**
   * 自定义 tr 元素
   */
  tr?: (column: TableColumnData, record: TableData, rowIndex: number) => any

  /**
   * 自定义 tbody 元素
   */
  tbody?: () => any

  /**
   * 拖拽锚点图标
   */
  'drag-handle-icon'?: () => any

  /**
   * 表格底部
   */
  footer?: () => any

  /**
   *  展开行内容
   */
  'expand-row'?: () => any

  /**
   * 展开行图标
   */
  'expand-icon'?: () => any

  /**
   * 表格列定义。启用时会屏蔽 columns 属性
   */
  columns?: () => any
}

export interface AnTableColumn extends TableColumnData {
  visible?: () => boolean
}

/**
 * 表格组件实例
 */
export type AnTableInstance = InstanceType<typeof AnTable> & {}

/**
 * 表格组件参数
 */
export type AnTableProps = Pick<AnTableInstance['$props'], 'data' | 'columns' | 'search' | 'paging' | 'create' | 'modify' | 'tableProps' | 'tableSlots' | 'actions' | 'widgets'>

// ===========================================================================================
// useButtons
// ===========================================================================================

export interface BaseButton {
  /**
   * 按钮文本
   * @example
   * ```ts
   * '点我'
   * ```
   */
  text?: string | Component
  /**
   * 按钮图标
   * @examplage
   * ```ts
   * 'i-icon-park-outline-delete'
   * ```
   */
  icon?: string | Component
  /**
   * 按钮状态
   */
  status?: ButtonProps['status']
  /**
   * 按钮参数
   */
  buttonProps?: ButtonProps
}

// ===========================================================================================
// useTableActions
// ===========================================================================================

export type AnTableActionPosition = 'left' | 'right' | 'aside'

export interface AnTableAction {
  position?: AnTableActionPosition
  render: any
}

export interface UseTableActionsSelectionButton {
  type: 'selection'
  visible?: () => boolean
  disable?: () => boolean
  onClick?: (event: MouseEvent, rowKeys: (string | number)[], rows: Recordable[]) => void
}

export interface UseTableActionsRefreshButton {
  type: 'refresh'
  visible?: () => boolean
  disable?: (action: BaseButton & Partial<AnTableAction> & UseTableActionsRefreshButton) => boolean
  onClick?: (event: MouseEvent) => void
}

export type UseTableActionsButton = BaseButton & Partial<AnTableAction> & (UseTableActionsSelectionButton | UseTableActionsRefreshButton)

export type UseTableActionsOptions = UseTableActionsButton[]

// ===========================================================================================
// useTable
// ===========================================================================================

type PickedTableProps = Pick<AnTableProps, 'data' | 'tableProps' | 'tableSlots' | 'paging'>

export interface UseTableOptions extends Mutable<PickedTableProps> {
  /**
   * 唯一ID
   * @example
   * ```ts
   * 'UserTable'
   * ```
   */
  id?: string
  /**
   * 表格列
   * @example
   * ```ts
   * [{
   *   title: '标题',
   *   dataIndex: 'title',
   * }]
   * ```
   */
  columns?: UseTableColumn[]
  /**
   * 搜索表单
   * @example
   * ```ts
   * [{
   *   field: 'name',
   *   label: '用户名称',
   *   setter: 'input'
   * }]
   * ```
   */
  search?: UseTableSearchItem[] | UseTableSearchOptions
  /**
   * 新建弹窗
   * @example
   * ```ts
   * {
   *   items: [],
   *   submit: (model) => {}
   * }
   * ```
   */
  create?: UseTableCreateOptions
  /**
   * 修改弹窗
   * @example
   * ```ts
   * {
   *   extend: true, // 基于新建弹窗扩展
   *   submit: (model) => {}
   * }
   * ```
   */
  modify?: UseTableModifyOptions
  /**
   * 操作栏
   */
  actions?: UseTableActionsOptions
}

export type UseTableOptionsFn = (tableRef: Ref<AnTableInstance | null>) => UseTableOptions

/**
 * 转载好一切的表格组件
 */
export interface UseTableComponent {
  /**
   * 组件名字
   */
  name: string
  /**
   * 组件实例
   */
  tableRef: Ref<AnTableInstance | null>
  /**
   * 重载表格
   * @description 重置分页和每页数量
   */
  reload: () => Promise<void> | undefined
  /**
   * 刷新表格
   */
  refresh: () => Promise<void> | undefined
  /**
   * 渲染函数
   */
  render: FunctionalComponent
}

// ===========================================================================================
// useTableColumns
// ===========================================================================================

interface BaseColumn {
  /**
   * 类型
   * @example
   * ```tsx
   * 'delete'
   * ```
   */
  type?: undefined
}

interface IndexColumn {
  /**
   * 类型
   */
  type: 'index'
}

export interface ColumnButton extends BaseButton {
  /**
   * 特殊类型
   * @example
   * ```ts
   * 'delete'
   * ```
   */
  type?: 'modify' | 'delete'
  /**
   * 确认弹窗配置
   * @example
   * ```ts
   * '确定删除吗?'
   * ```
   */
  confirm?: string
  visible?: (data: AnTableColumnRenderArgs) => boolean
  disable?: (data: AnTableColumnRenderArgs) => boolean
  onClick?: (data: AnTableColumnRenderArgs) => void
}

export interface ButtonColumn {
  /**
   * 类型
   */
  type: 'button'
  /**
   * 按钮列表
   * @example
   * ```ts
   * [{
   *   type: 'delete',
   *   text: '删除',
   *   onClick: (args) => api.user.rmUser(args.record.id)
   * }]
   * ```
   */
  buttons: ColumnButton[]
}

export type UseTableColumn = TableColumnData & (IndexColumn | BaseColumn | ButtonColumn)

// ===========================================================================================
// useTablePaging
// ===========================================================================================

export interface AnTablePaging extends PaginationProps {
  visible?: () => boolean
}

// ===========================================================================================
// useTableCreate
// ===========================================================================================

export type UseTableCreateOptions = UseFormModalOptions & {}

// ===========================================================================================
// useTableSearch
// ===========================================================================================

export type ExtendFormItem = Partial<
  FormItem & {
    /**
     * 从新建弹窗继承表单项
     * @example
     * ```ts
     * 'name'
     * ```
     */
    extend: string
  }
>

export type UseTableSearchItem = ExtendFormItem & {
  /**
   * 是否点击图标后进行搜索
   * @description 仅 setter: 'search' 类型可用
   * @default
   * ```ts
   * false
   * ```
   */
  searchable?: boolean
  /**
   * 是否回车后进行查询
   * @default
   * ```ts
   * false
   * ```
   */
  enterable?: boolean
}

export type UseTableSearchOptions = Omit<UseFormOptions, 'items' | 'submit'> & {
  /**
   * 搜索表单项
   * @example
   * ```ts
   * [{
   *   extend: 'name' // 从 create.items 继承
   * }]
   * ```
   */
  items?: UseTableSearchItem[]
  /**
   * 是否隐藏查询按钮
   * @default
   * ```tsx
   * false
   * ```
   */
  hideSearch?: boolean
}

// ===========================================================================================
// useTableModify
// ===========================================================================================

export type UseTableModifyOptions = Omit<UseFormModalOptions, 'items' | 'trigger'> & {
  /**
   * 是否继承新建弹窗
   * @default
   * ```ts
   * false
   * ```
   */
  extend?: boolean
  /**
   * 表单项
   * ```tsx
   * [{
   *   extend: 'name', // 从 create.items 中继承
   * }]
   * ```
   */
  items?: ExtendFormItem[]
}
