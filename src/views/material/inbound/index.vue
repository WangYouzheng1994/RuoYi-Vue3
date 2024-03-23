<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="物料名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料规格" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入物料规格"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="要货计划id" prop="planId">
        <el-input
          v-model="queryParams.planId"
          placeholder="请输入要货计划id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="要货计划" prop="planName">
        <el-input
          v-model="queryParams.planName"
          placeholder="请输入要货计划"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="物料id" prop="materialId">
        <el-input
          v-model="queryParams.materialId"
          placeholder="请输入物料id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="物料名称" prop="materialName">
        <el-input
          v-model="queryParams.materialName"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料规格" prop="materialSpec">
        <el-input
          v-model="queryParams.materialSpec"
          placeholder="请输入物料规格"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料单位" prop="materialUnit">
        <el-input
          v-model="queryParams.materialUnit"
          placeholder="请输入物料单位"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料数量" prop="materialNumber">
        <el-input
          v-model="queryParams.materialNumber"
          placeholder="请输入物料数量"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接货人" prop="inboundPerson">
        <el-input
          v-model="queryParams.inboundPerson"
          placeholder="请输入接货人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="接货人id" prop="inboundPersonId">
        <el-input
          v-model="queryParams.inboundPersonId"
          placeholder="请输入接货人id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="接货时间" prop="inboundDate">
        <el-date-picker clearable
          v-model="queryParams.inboundDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择接货时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:detail:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:detail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="" align="center" prop="id" />-->
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="要货计划" align="center" prop="planName" />
      <el-table-column label="物料名称" align="center" prop="materialName" />
      <el-table-column label="物料规格" align="center" prop="materialSpec" />
      <el-table-column label="物料单位" align="center" prop="materialUnit" />
      <el-table-column label="物料数量" align="center" prop="materialNumber" />
      <el-table-column label="接货人" align="center" prop="inboundPerson" />
      <el-table-column label="接货时间" align="center" prop="inboundDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.inboundDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
&lt;!&ndash;          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:detail:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:detail:remove']">删除</el-button>&ndash;&gt;
        </template>
      </el-table-column>-->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改入库明细对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="detailRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="物料规格" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入物料规格" />
        </el-form-item>
        <el-form-item label="要货计划id" prop="planId">
          <el-input v-model="form.planId" placeholder="请输入要货计划id" />
        </el-form-item>
        <el-form-item label="要货计划" prop="planName">
          <el-input v-model="form.planName" placeholder="请输入要货计划" />
        </el-form-item>
        <el-form-item label="物料id" prop="materialId">
          <el-input v-model="form.materialId" placeholder="请输入物料id" />
        </el-form-item>
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="form.materialName" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="物料规格" prop="materialSpec">
          <el-input v-model="form.materialSpec" placeholder="请输入物料规格" />
        </el-form-item>
        <el-form-item label="物料单位" prop="materialUnit">
          <el-input v-model="form.materialUnit" placeholder="请输入物料单位" />
        </el-form-item>
        <el-form-item label="物料单位code" prop="materiaUnitCode">
          <el-input v-model="form.materiaUnitCode" placeholder="请输入物料单位code" />
        </el-form-item>
        <el-form-item label="物料数量" prop="materialNumber">
          <el-input v-model="form.materialNumber" placeholder="请输入物料数量" />
        </el-form-item>
        <el-form-item label="接货人" prop="inboundPerson">
          <el-input v-model="form.inboundPerson" placeholder="请输入接货人" />
        </el-form-item>
        <el-form-item label="接货人id" prop="inboundPersonId">
          <el-input v-model="form.inboundPersonId" placeholder="请输入接货人id" />
        </el-form-item>
        <el-form-item label="接货时间" prop="inboundDate">
          <el-date-picker clearable
            v-model="form.inboundDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择接货时间">
          </el-date-picker>
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
  </div>
</template>

<script setup name="Detail">
import { listInboundDetail, getInboundDetail, delInboundDetail, addInboundDetail, updateInboundDetail } from "@/api/material/inbound.js";

const { proxy } = getCurrentInstance();

const detailList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    projectName: null,
    projectId: null,
    planId: null,
    planName: null,
    materialId: null,
    materialName: null,
    materialSpec: null,
    materialUnit: null,
    materiaUnitCode: null,
    materialNumber: null,
    inboundPerson: null,
    inboundPersonId: null,
    inboundDate: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询入库明细列表 */
function getList() {
  loading.value = true;
  listInboundDetail(queryParams.value).then(response => {
    detailList.value = response.rows;
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
    planId: null,
    planName: null,
    materialId: null,
    materialName: null,
    materialSpec: null,
    materialUnit: null,
    materiaUnitCode: null,
    materialNumber: null,
    inboundPerson: null,
    inboundPersonId: null,
    inboundDate: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("detailRef");
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
  reset();
  open.value = true;
  title.value = "添加入库明细";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getInboundDetail(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改入库明细";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["detailRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateInboundDetail(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addInboundDetail(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除入库明细编号为"' + _ids + '"的数据项？').then(function() {
    return delInboundDetail(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/detail/export', {
    ...queryParams.value
  }, `detail_${new Date().getTime()}.xlsx`)
}

getList();
</script>
