<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目名称" prop="projectName">
        <el-input
            v-model="queryParams.projectName"
            placeholder="请输入项目名称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="项目id" prop="projectId">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.projectId"-->
      <!--            placeholder="请输入项目id"-->
      <!--            clearable-->
      <!--            @keyup.enter="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="要货计划id" prop="planId">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.planId"-->
      <!--            placeholder="请输入要货计划id"-->
      <!--            clearable-->
      <!--            @keyup.enter="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="要货计划" prop="planName">
        <el-input
            v-model="queryParams.planName"
            placeholder="请输入要货计划"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="物料id" prop="materialId">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.materialId"-->
      <!--            placeholder="请输入物料id"-->
      <!--            clearable-->
      <!--            @keyup.enter="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
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
      <!--      <el-form-item label="物料单位code" prop="materiaUnitCode">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.materiaUnitCode"-->
      <!--            placeholder="请输入物料单位code"-->
      <!--            clearable-->
      <!--            @keyup.enter="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="出库数量" prop="materialNumber">
        <el-input
            v-model="queryParams.materialNumber"
            placeholder="请输入出库数量"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出库人" prop="outboundPerson">
        <el-input
            v-model="queryParams.outboundPerson"
            placeholder="请输入出库人"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接货时间" prop="outboundDate">
        <el-date-picker clearable
                        v-model="queryParams.outboundDate"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择接货时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="接货人" prop="outboundReceivePerson">
        <el-input
            v-model="queryParams.outboundReceivePerson"
            placeholder="请输入接货人"
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
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['system:detail:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="项目名称" align="center" prop="projectName"/>
      <el-table-column label="物料名称" align="center" prop="materialName"/>
      <el-table-column label="物料规格" align="center" prop="materialSpec"/>
      <el-table-column label="物料单位" align="center" prop="materialUnitName"/>
      <el-table-column label="计划数量" align="center" prop="planNumber"/>
      <el-table-column label="已配送入库数量" align="center" prop="inboundNumber"/>
      <el-table-column label="出库数量" align="center" prop="outNumber"/>
      <el-table-column label="库存数量" align="center" prop="actualStoreNumber"/>
      <el-table-column label="待配送数量" align="center" prop="waitSendNumber"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                               v-hasPermi="['system:detail:edit']">修改
                    </el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                               v-hasPermi="['system:detail:remove']">删除
                    </el-button>-->
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
  </div>
</template>

<script setup name="Detail">
import {listStatisticsMaterialList, listStatisticsProjectMaterialList} from "@/api/material/statistics.js";

const {proxy} = getCurrentInstance();

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
    outboundPerson: null,
    outboundPersonId: null,
    outboundDate: null,
    outboundReceivePerson: null,
  },
  rules: {}
});

const {queryParams, form, rules} = toRefs(data);

/** 查询入库明细列表 */
function getList() {
  loading.value = true;
  listStatisticsProjectMaterialList(queryParams.value).then(response => {
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

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/detail/export', {
    ...queryParams.value
  }, `detail_${new Date().getTime()}.xlsx`)
}

getList();
</script>
