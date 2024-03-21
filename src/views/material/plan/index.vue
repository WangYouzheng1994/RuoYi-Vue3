<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="110px">
<!--      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="所属项目" prop="projectId">
<!--        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入所属项目"
          clearable
          @keyup.enter="handleQuery"
        />-->
        <el-select clearable v-model="queryParams.projectId" placeholder="请选择项目" style="width:100%" @keyup.enter="handleQuery">
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
        <el-input
          v-model="queryParams.planName"
          placeholder="请输入要货计划名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:plan:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:plan:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:plan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:plan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="planList" @selection-change="handleSelectionChange" table-layout="auto">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="" align="center" prop="id" />-->
      <el-table-column label="项目名称" align="center" prop="projectName" />
<!--      <el-table-column label="所属项目" align="center" prop="projectId" />-->
      <el-table-column label="要货计划名称" align="center" prop="planName" />
      <el-table-column label="配送完成比例" align="center" prop="complationRate">
        <template #default="scopt">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
        </template>
      </el-table-column>
      <el-table-column label="提报人" align="center" prop="createBy"/>
      <el-table-column label="计划生成时间" align="center" prop="createTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提报状态" align="center" prop="commitStatus">
        <template #default="scope">
          <dict-tag :options="material_plan_commit" :value="scope.row.commitStatus" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:plan:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:plan:remove']">删除</el-button>
          <el-button link type="primary" icon="DArrowRight" @click="handleOpenInbound(scope.row)" v-hasPermi="['system:plan:remove']">入库</el-button>
          <el-button link type="primary" icon="DArrowLeft" @click="handleOutbound(scope.row)" v-hasPermi="['system:plan:remove']">出库</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改要货计划对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="planRef" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="所属项目" prop="projectId">
          <el-select v-model="form.projectId" placeholder="请选择项目" style="width:100%">
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
          <el-input v-model="form.planName" placeholder="请输入要货计划名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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
    <!-- 入库 -->
    <inbound ref="inboundRef" :planId="planId"/>
    <!-- 出库 -->
    <outbound ref="outboundRef" :planId="planId"/>
  </div>
</template>

<script setup name="Plan">
import { listMaterialPlan, getMaterialPlan, delMaterialPlan, addMaterialPlan, updateMaterialPlan } from "@/api/material/plan";
import { listProjectInfo, getProjectInfo, delProjectInfo, addProjectInfo, updateProjectInfo } from "@/api/base/info";
import inbound from './inbound.vue';

import router from "@/router/index.js";
import Outbound from "@/views/material/plan/outbound.vue";

const { proxy } = getCurrentInstance();

const { material_plan_commit } = proxy.useDict("material_plan_commit");
const planList = ref([]);
const open = ref(false);
const openInbound = ref(false);
const planId = ref(null);
const openOutbound = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

// 项目信息下拉
const projectOptions = ref([]);

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

/** 查询要货计划列表 */
function getList() {
  loading.value = true;
  listMaterialPlan(queryParams.value).then(response => {
    planList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
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
  proxy.resetForm("planRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  /*reset();
  open.value = true;
  title.value = "添加要货计划";*/

  router.push({ path: "/material/plan/planDetail" , query: {pageNum: queryParams.value.pageNum}});
}

/** 修改按钮操作 */
/*function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getMaterialPlan(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改要货计划";
  });
}*/

/** 修改按钮操作 */
function handleUpdate(row) {
  const tableId = row.id || ids.value[0];
  router.push({ path: "/material/plan/planDetail/" + tableId, query: { pageNum: queryParams.value.pageNum } });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["planRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateMaterialPlan(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMaterialPlan(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除要货计划编号为"' + _ids + '"的数据项？').then(function() {
    return delMaterialPlan(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/**
 * 打开入库页面
 *
 * @param row
 */
function handleOpenInbound(row) {
  planId.value = row.id;
  proxy.$refs["inboundRef"].show();
  // openInbound.value = true;
}

/**
 * 打开出库页面
 *
 * @param row
 */
function handleOutbound(row) {
  planId.value = row.id;
  proxy.$refs["outboundRef"].show();
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/plan/export', {
    ...queryParams.value
  }, `plan_${new Date().getTime()}.xlsx`)
}

/**
 * 初始化
 */
function init() {
  listProjectInfo({
    pageNum: 1,
    pageSize: 100}).then(response => {
    projectOptions.value = response.rows;
  });
}

init();
getList();
</script>
