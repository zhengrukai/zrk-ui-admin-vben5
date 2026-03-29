<script lang="ts" setup>
import type { SystemMenuApi } from '#/api/system/menu';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {ElButton, ElMessage} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createMenu, getMenu, updateMenu } from '#/api/system/menu';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SystemMenuApi.Menu>();
const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', ['菜单'])
    : $t('ui.actionTitle.create', ['菜单']),
);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
});

/** 提交表单（公共逻辑） */
async function submitForm(): Promise<boolean> {
  const { valid } = await formApi.validate();
  if (!valid) {
    return false;
  }
  modalApi.lock();
  const data = (await formApi.getValues()) as SystemMenuApi.Menu;
  try {
    await (formData.value?.id ? updateMenu(data) : createMenu(data));
    emit('success');
    ElMessage.success($t('ui.actionMessage.operationSuccess'));
    return true;
  } finally {
    modalApi.unlock();
  }
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const saved = await submitForm();
    if (saved) {
      await modalApi.close();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    const data = modalApi.getData<SystemMenuApi.Menu>();
    if (!data || !data.id) {
      // 设置上级
      await formApi.setValues(data);
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getMenu(data.id);
      // 设置到 values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});

/** 保存后新增 */
async function handleSaveAndAdd() {
  const saved = await submitForm();
  if (saved) {
    // 保存成功后重置表单，保留上级菜单、类型、排序方便连续新增
    const values = (await formApi.getValues()) as SystemMenuApi.Menu;
    const { parentId, type, sort } = values;
    formData.value = undefined;
    await formApi.resetForm();
    await formApi.setValues({ parentId, type, sort: (sort ?? 0) + 1 });
  }
}
</script>

<template>
  <Modal class="w-2/5" :title="getTitle">
    <Form class="mx-4" />
    <template #append-footer>
      <div class="flex">
        <ElButton @click="handleSaveAndAdd"> 保存后新增 </ElButton>
      </div>
    </template>
  </Modal>
</template>
