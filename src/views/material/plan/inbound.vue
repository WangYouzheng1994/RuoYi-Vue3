<script setup>
import { listMaterialPlanDetail } from "@/api/material/detail.js";
import {listUser} from "@/api/system/user.js";
import {getPlanMaterialList} from '@/api/material/detail.js';
import {addInboundDetail, updateInboundDetail} from "@/api/material/inbound.js";

const props = defineProps({
  planId: {
    type: [Number]
  }
});

const {getList} = inject('parent_index');

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '上周',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const { proxy } = getCurrentInstance();

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
    material: [{ required: true, message: "请选择入库物料", trigger: "blur" }],
    materialNumber: [{ required: true, message: "请录入入库数量", trigger: "blur" }],
    selectUser: [{ required: true, message: "请选择验收人员", trigger: "blur"}],
    inboundDate: [{ required: true, message: "请选择入库时间", trigger: "blur"}]
  }
});

const { queryParams, form, rules } = toRefs(data);

const openInbound = ref(false);
const planMaterialDetailOptions = ref([]);
// 人员下拉
const userOptions = ref([])

// 附件列表
const fileList = ref([])
const uploadUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传的图片服务器地址

function onDialogOpen() {
  init();
}

function init() {
  // 初始化物料下拉框
  getPlanMaterialList(props.planId).then((res) => {
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
    // id: null,
    // projectName: null,
    // projectId: null,
    // planName: null,
    // createBy: null,
    // createTime: null,
    // updateBy: null,
    // updateTime: null,
    // remark: null
  };
}

/**
 * 保存入库表单
 */
function submitForm() {
  proxy.$refs["detailRef"].validate(valid => {
    if (valid) {
      let submitObj = Object.assign({}, form.value);
      // 要货计划
      submitObj.planId = props.planId;
      // 接货人
      submitObj.inboundPerson = submitObj.selectUser.userName;
      submitObj.inboundPersonId = submitObj.selectUser.userId;
      // 物料
      submitObj.materialId = submitObj.material.materialId;
      submitObj.materialName = submitObj.material.materialName;
      submitObj.materialSpec = submitObj.material.materialSpec;
      submitObj.materialUnit = submitObj.material.materialUnitName;
      submitObj.materiaUnitCode = submitObj.material.materialUnitCode;
      addInboundDetail(submitObj).then(response => {
        proxy.$modal.msgSuccess("新增成功");
        openInbound.value = false;
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
  <el-dialog title="入库" v-model="openInbound" @open="onDialogOpen" width="500px" append-to-body>
    <el-form :model="form" :rules="rules" label-width="110px" ref="detailRef">
      <el-form-item label="入库物料" prop="material">
        <el-select value-key="materialId" v-model="form.material" placeholder="请选择物料" filterable style="width:100%">
          <el-option
              v-for="item in planMaterialDetailOptions"
              :key="item.materialId"
              :label="item.materialName + item.materialSpec + item.materialUnitName"
              :value="item"
              :disabled="item.status == 1"
          >
            <span style="float: left">{{ item.materialName + item.materialSpec + item.materialUnitName }}</span>
            <span style="float: right">当前库存数量： {{item.actualStoreNumber}}</span>
<!--            <span style="float: right;color: var(&#45;&#45;el-text-color-secondary);font-size: 13px;">{{ item.value }}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="本次入库数量" prop="materialNumber">
        <el-input-number v-model="form.materialNumber" :min="1" :precision="2" step="0.01" placeholder="请输入本次入库数量" style="width: 100%" />
<!--        <el-input v-model="form.planName" placeholder="当前剩余库存" style="width: 50%"  />-->
      </el-form-item>

      <el-form-item label="入库时间" prop="inboundDate">
        <el-date-picker style="width: 100%"
            v-model="form.inboundDate"
            type="datetime"
            placeholder="选择入库时间"
            :shortcuts="shortcuts"/>
      </el-form-item>

      <el-form-item label="入库验收人员" prop="selectUser">
        <el-select value-key="userId" v-model="form.selectUser" placeholder="请选择人员" style="width:100%">
          <el-option
              v-for="item in userOptions"
              :key="item.userId"
              :label="item.userName"
              :value="item"
              :disabled="item.status == 1"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="入库备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item label="入库附件">
        <el-upload
            v-model:file-list="fileList"
            :action="uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            multiple>
          <el-icon><Plus /></el-icon>
        </el-upload>
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