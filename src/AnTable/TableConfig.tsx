import { Mutable, UseTableOptions } from './interface'

export const TableConfig: Mutable<UseTableOptions> = {
  tableProps: {
    rowKey: 'id',
  },
  paging: {
    showTotal: true,
    showPageSize: true,
  },
  // columnButtonDelete: {
  //   text: '删除',
  //   buttonProps: {
  //     type: 'danger',
  //   },
  // },
}
