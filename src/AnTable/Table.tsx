import { Table, TableData, TableInstance } from '@arco-design/web-vue'
import { PropType, computed } from 'vue'
import { defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import { AnFormModal, AnFormModalInstance, AnFormModalProps, getModel, AnForm, AnFormInstance, AnFormProps } from '../AnForm'
import { AnTableAction, AnTableActionPosition, AnTableColumn, AnTableData, AnTablePaging, ArcoTableProps, ArcoTableSlots } from './interface'
import './table.css'

/**
 * 表格组件
 */
export const AnTable = defineComponent({
  name: 'AnTable',
  props: {
    /**
     * 表格数据
     * @description 数组或函数，函数需返回数组或 `{ data, total }` 对象
     */
    data: {
      type: [Array, Function] as PropType<AnTableData>,
    },
    /**
     * 表格列
     */
    columns: {
      type: Array as PropType<AnTableColumn[]>,
      default: () => [],
    },
    /**
     * 分页配置
     */
    paging: {
      type: Object as PropType<AnTablePaging>,
    },
    /**
     * 搜索表单
     */
    search: {
      type: Object as PropType<AnFormProps>,
    },
    /**
     * 新建弹窗
     */
    create: {
      type: Object as PropType<AnFormModalProps>,
    },
    /**
     * 修改弹窗
     */
    modify: {
      type: Object as PropType<AnFormModalProps>,
    },
    /**
     * 操作按钮
     */
    actions: {
      type: Array as PropType<AnTableAction[]>,
    },
    /**
     * 部件
     */
    widgets: {
      type: Array as PropType<any[]>,
    },
    /**
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<ArcoTableProps>,
    },
    /**
     * 传递给 Table 组件的插槽
     */
    tableSlots: {
      type: Object as PropType<ArcoTableSlots>,
    },
  },
  setup(props) {
    const loading = ref(false)
    const renderData = ref<TableData[]>([])
    const tableRef = ref<TableInstance | null>(null)
    const searchRef = ref<AnFormInstance | null>(null)
    const createRef = ref<AnFormModalInstance | null>(null)
    const modifyRef = ref<AnFormModalInstance | null>(null)
    const selected = reactive(new Map())

    const actionMap = computed(() => {
      const map: Record<AnTableActionPosition, AnTableAction[]> = {
        left: [],
        right: [],
        aside: [],
      }
      for (const action of props.actions ?? []) {
        map[action.position ?? 'left'].push(action)
      }
      return map
    })

    const loadData = async () => {
      if (!props.data || Array.isArray(props.data)) {
        return
      }

      if (await searchRef.value?.formRef?.validate()) {
        return
      }

      const page = props.paging?.current ?? 1
      const size = props.paging?.pageSize ?? 10
      const search = getModel(props.search?.model ?? {})

      loading.value = true
      try {
        const params = { ...search, page, size }
        const resData = await props.data(params)
        if (resData) {
          let data: TableData[] = []
          let total = 0
          if (Array.isArray(resData)) {
            data = resData
            total = resData.length
          } else {
            data = resData.data ?? []
            total = resData.total ?? 0
          }
          renderData.value = data
          props.paging?.showTotal && (props.paging.total = total)
        }
      } catch (e) {
        console.log('AnTable load fail: ', e)
      }
      loading.value = false
    }

    const load = (page?: number, size?: number) => {
      if (props.paging) {
        page && (props.paging.current = page)
        size && (props.paging.pageSize = size)
      }
      return loadData()
    }

    watchEffect(() => {
      if (Array.isArray(props.data)) {
        renderData.value = props.data
        if (props.paging) {
          props.paging.current = 1
          props.paging.pageSize = 10
        }
      }
    })

    onMounted(loadData)
    return {
      loading,
      renderData,
      selected,
      tableRef,
      searchRef,
      createRef,
      modifyRef,
      actionMap,
      load,
      reload: () => load(1, 10),
      refresh: loadData,
    }
  },
  render() {
    const ActionRight = this.actionMap.right.length > 0 && this.actionMap.right.map(action => <action.render />)
    const ActionAside = this.actionMap.aside.length > 0 && this.actionMap.aside.map(action => <action.render />)
    const ActionLeft = this.actionMap.left.length > 0 && this.actionMap.left.map(action => <action.render />)
    const SearchForm = this.search && <AnForm ref="searchRef" v-model:model={this.search.model} items={this.search.items} formProps={this.search.formProps}></AnForm>
    const CreateForm = this.create && <AnFormModal {...this.create} ref="createRef" onSubmited={this.reload}></AnFormModal>
    const ModifyForm = this.modify && <AnFormModal {...this.modify} trigger={false} ref="modifyRef" onSubmited={this.refresh}></AnFormModal>
    const isInline = this.search?.formProps?.layout === 'inline'

    return (
      <div class="an-table">
        {!isInline && <div class="an-table-search- border-b border-gray-200 mb-3">{SearchForm}</div>}
        {(this.create || this.actions || isInline) && (
          <div class={`an-table-header`}>
            {CreateForm}
            {<div class="an-table-actions">{ActionLeft}</div>}
            {ActionAside}
            {isInline && <div class="an-table-search-inline">{SearchForm}</div>}
            {ActionRight}
          </div>
        )}

        <Table
          row-key="id"
          bordered={false}
          {...this.tableProps}
          ref="tableRef"
          loading={this.loading}
          data={this.renderData}
          columns={this.columns.filter(i => (i.visible ? i.visible() : true))}
          pagination={this.paging?.visible && !this.paging.visible() ? false : this.paging}
        >
          {{ ...this.tableSlots }}
        </Table>

        {ModifyForm}
      </div>
    )
  },
})
