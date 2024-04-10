import { useFormModalProps } from '../AnForm'
import { defineOptionsHandler } from './util'

export const useTableCreate = defineOptionsHandler((options, props) => {
  if (!options.create) {
    return
  }
  props.create = useFormModalProps(options.create)
})
