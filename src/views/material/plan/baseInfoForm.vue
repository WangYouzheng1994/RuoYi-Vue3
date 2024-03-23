<!--
  要货计划基础信息
-->

<script setup>
let definePropsObj = defineProps({
  info: {
  },
  projectOptions: [],
  disabled: true
});

const rules = ref({
  project: [{ required: true, message: "请选择所属项目", trigger: "blur" }],
  planName: [{ required: true, message: "请录入计划名称", trigger: "blur" }],
  /*email: [{ required: true, message: "邮箱地址不能为空", trigger: "blur" }, { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: "手机号码不能为空", trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],*/
});
console.log(definePropsObj.projectOptions);
</script>

<template>
  <el-form ref="planFormRef" :model="info" :rules="rules" label-width="110px" :disabled="definePropsObj.disabled">
    <el-form-item label="所属项目" prop="project" >
      <el-select value-key="id" v-model="info.project" placeholder="请选择项目" style="width:100%" filterable>
        <el-option
            v-for="item in projectOptions"
            :key="item.id"
            :label="item.projectName"
            :value="item"
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