<!--
  要货计划基础信息
-->

<script setup>
defineProps({
  info: {
    type: Object,
    default: null
  },
  projectOptions: []
});

const rules = ref({
});

</script>

<template>
  <el-form ref="planRef" :model="info" :rules="rules" label-width="110px">
    <el-form-item label="所属项目" prop="projectId">
      <el-select v-model="info.projectId" placeholder="请选择项目" style="width:100%">
        <el-option
            v-for="item in projectOptions"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
            :disabled="item.status == 1"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="要货计划名称" prop="planName">
      <el-input v-model="info.planName" placeholder="请输入要货计划名称" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="info.remark" type="textarea" placeholder="请输入内容" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>