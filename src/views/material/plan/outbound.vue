<script setup>
import {getPlanMaterialList, listMaterialPlanDetail} from "@/api/material/detail.js";
import {addOutboundDetail} from "@/api/material/outbound.js";
const { proxy } = getCurrentInstance();

const props = defineProps({
  planId: {
    type: [Number]
  }
});

const {getList} = inject('parent_index');

const data = reactive({
  form: {material:{actualStoreNumber: 0}},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    projectName: null,
    projectId: null,
    planName: null,
  },
  rules: {
    outboundReceivePerson: [{ required: true, message: "请录入接货人员", trigger: "blur"}],
    outboundPerson: [{ required: true, message: "请录入出库人员", trigger: "blur"}],
    materialNumber: [{ required: true, message: "请录入本次出库数量", trigger: "blur"}]
  }
});

const { queryParams, form, rules } = toRefs(data);

const openOutbound = ref(false);
const planMaterialDetailOptions = ref([]);

function onDialogOpen() {
  init();
}

function init() {
  // 初始化物料下拉框
  getPlanMaterialList(props.planId).then((res) => {
    planMaterialDetailOptions.value = res.data;
  });
}


function show() {
  openOutbound.value = true;
}

function cancel() {
  openOutbound.value = false;
  reset();
}

function reset() {
  form.value =   {material:{actualStoreNumber: 0}};
}

/**
 * 保存出表单
 */
function submitForm() {
  proxy.$refs["detailRef"].validate(valid => {
    if (valid) {
      let submitObj = Object.assign({}, form.value);
      // 要货计划
      submitObj.planId = props.planId;
      // 接货人
      // submitObj.inboundPerson = submitObj.selectUser.userName;
      // submitObj.inboundPersonId = submitObj.selectUser.userId;
      // 物料
      submitObj.materialId = submitObj.material.materialId;
      submitObj.materialName = submitObj.material.materialName;
      submitObj.materialSpec = submitObj.material.materialSpec;
      submitObj.materialUnit = submitObj.material.materialUnitName;
      submitObj.materiaUnitCode = submitObj.material.materialUnitCode;
      addOutboundDetail(submitObj).then(response => {
        proxy.$modal.msgSuccess("新增成功");
        openOutbound.value = false;
        getList();
      });
    }
  });
}

defineExpose({
  show,
});
</script>

<template>
  <el-dialog title="物料出库" v-model="openOutbound"  @open="onDialogOpen" width="500px" append-to-body>
    <el-form :model="form" :rules="rules" label-width="110px" ref="detailRef">
      <el-form-item label="出库物料" prop="material">
        <el-select value-key="materialId" v-model="form.material" placeholder="请选择物料" filterable style="width:100%">
          <el-option
              v-for="item in planMaterialDetailOptions"
              :key="item.materialId"
              :label="item.materialName + item.materialSpec + item.materialUnitName"
              :value="item"
              :disabled="item.actualStoreNumber <= 0"
          >
            <span style="float: left">{{ item.materialName + item.materialSpec + item.materialUnitName }}</span>
            <span style="float: right">当前库存数量： {{item.actualStoreNumber}}</span>
            <!--            <span style="float: right;color: var(&#45;&#45;el-text-color-secondary);font-size: 13px;">{{ item.value }}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="本次出库数量" prop="materialNumber">
        <el-input-number v-model="form.materialNumber" placeholder="请输入本次出库数量" :max="form.material.actualStoreNumber">
<!--          <template #append>当前剩余库存：{{form.material ? form.material.actualStoreNumber : 0}}</template>-->
        </el-input-number>
        <span style="float: right">当前剩余库存：{{form.material ? form.material.actualStoreNumber : 0}}</span>
      </el-form-item>

      <el-form-item label="提货人员" prop="outboundReceivePerson">
        <el-input v-model="form.outboundReceivePerson" placeholder="请输入本次接货人" />
      </el-form-item>

      <el-form-item label="出库操作人" prop="outboundPerson">
        <el-input v-model="form.outboundPerson" placeholder="请录入出库人员" />
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