<template>
  <div style="max-width: 432px">
    <div>
      <p>布尔值</p>
      <BoolForm></BoolForm>
    </div>
    <div>
      <p>字符串</p>
      <StringForm></StringForm>
    </div>
    <div>
      <p>对象形式：<Button @click="show = !show">动态显示/隐藏</Button></p>
      <ObjectForm></ObjectForm>
    </div>
    <div>
      <p>函数</p>
      <FunctionForm></FunctionForm>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { useFormModal } from 'arconify';
<<<<<<< HEAD:docs/demos/form-modal/trigger/demo.zh-CN.vue
import { ref } from 'vue';

const show = ref(true);
=======
import { Button } from 'vexip-ui';
>>>>>>> 4d26992bd119ec03106c7faf530315fe02c28d2f:docs/demos/modal/trigger/demo.zh-CN.vue

const BoolForm = useFormModal({
  trigger: true,
  items: [
    {
      label: '名字',
      field: 'name',
      setter: 'input',
    },
  ],
  submit(model) {},
})

const StringForm = useFormModal({
  trigger: '我是字符串',
  items: [
    {
      label: '名字',
      field: 'name',
      setter: 'input',
    },
  ],
  submit(model) {},
})

// 定义Button的属性
const ObjectForm = useFormModal({
  trigger: {
    text: '我是对象形式',
    visible: () => show.value,
    buttonProps: {
      status: 'danger',
    },
  },
  items: [
    {
      label: '名字',
      field: 'name',
      setter: 'input',
    },
  ],
  submit(model) {},
})

// 自定义渲染函数
const FunctionForm = useFormModal({
  trigger: ({ open }) => {
    return <Button onClick={open}>我是渲染函数</Button>
  },
  items: [
    {
      label: '名字',
      field: 'name',
      setter: 'input',
    },
  ],
  submit(model) {},
})
</script>
