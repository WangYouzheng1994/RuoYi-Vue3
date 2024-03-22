<script setup>
import { listMaterialPlanDetail } from "@/api/material/detail.js";
import {listUser} from "@/api/system/user.js";
import {getPlanMaterialList} from '@/api/material/detail.js';

const props = defineProps({
  planId: {
    type: [Number, String]
  }
});

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    projectName: null,
    projectId: null,
    planName: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

const openInbound = ref(false);
const planMaterialDetailOptions = ref([]);
const selectUser = ref({});
// 人员下拉
const userOptions = ref([])

function onDialogOpen() {
  init();
}

function init() {
  // 初始化物料下拉框
  getPlanMaterialList(props.planId).then((res) => {
    debugger;
    planMaterialDetailOptions.value = res.data;
  });

  // 获取人员清单
  listUser({pageNum: 1, pageSize: 200}).then(response => {
    userOptions.value = response && response.rows;
  });
}

function show() {
  openInbound.value = true;
}

function cancel() {
  openInbound.value = false;
  reset();
}

function reset() {
  form.value = {
    id: null,
    projectName: null,
    projectId: null,
    planName: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
}

defineExpose({
  show,
});
</script>

<template>
  <el-dialog title="入库" v-model="openInbound" @open="onDialogOpen" width="500px" append-to-body>
    <el-form :model="form" :rules="rules" label-width="110px">
      <el-form-item label="入库物料" prop="projectId">
        <el-select value-key="id" v-model="form.materialId" placeholder="请选择物料" style="width:100%">
          <el-option
              v-for="item in planMaterialDetailOptions"
              :key="item.id"
              :label="item.materialName + item.materialSpec + item.materialUnitName"
              :value="item"
              :disabled="item.status == 1"
          >
            <span style="float: left">{{ item.materialName + item.materialSpec + item.materialUnitName }}}</span>
<!--            <span style="float: right;color: var(&#45;&#45;el-text-color-secondary);font-size: 13px;">{{ item.value }}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="本次入库数量" prop="planName">
        <el-input-number v-model="form.materialNumber" :min="1" placeholder="请输入本次入库数量" style="width: 50%" />

<!--        <el-input v-model="form.planName" placeholder="当前剩余库存" style="width: 50%"  />-->
      </el-form-item>
<!--

      <el-form-item label="当前库存" prop="">
        <el-input v-model="form.planName" placeholder="请输入要货计划名称" />
      </el-form-item>
-->

      <el-form-item label="入库验收人员" prop="">
<!--        <el-input v-model="form.planName" placeholder="请输入要货计划名称" />-->

        <el-select value-key="userId" v-model="selectUser" placeholder="请选择人员" style="width:100%">
          <el-option
              v-for="item in userOptions"
              :key="item.userId"
              :label="item.userName"
              :value="item"
              :disabled="item.status == 1"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出库备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>