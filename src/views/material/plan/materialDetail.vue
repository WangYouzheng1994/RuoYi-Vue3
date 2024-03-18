<!--
  要货计划，物料详情
-->
<template>
  <div>
    <el-table ref="detailTable" :max-height="tableHeight" :data="tableData">
      <el-table-column type="selection" width="55" align="center"/>
<!--      <el-table-column label="序号" type="index" width="50" align="center">
        <template #default="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>-->
<!--      <el-table-column label="" align="center" prop="id"/>-->
      <el-table-column label="项目名称" align="center" prop="projectName"/>
<!--      <el-table-column label="项目id" align="center" prop="projectId"/>-->
      <el-table-column label="项目经理" align="center" prop="projectManagerName"/>
<!--      <el-table-column label="项目经理id" align="center" prop="projectManagerId"/>-->
<!--      <el-table-column label="要货计划id" align="center" prop="planId"/>-->
      <el-table-column label="计划名称" align="center" prop="planName"/>
      <el-table-column width="220" label="物料名称" align="center" prop="materialName">
        <template #default="scope">
          <el-select value-key="userId" v-model="scope.row.materialName" style="width:100%">
            <el-option
                v-for="item in materialOptions"
                :key="item.id"
                :label="item.materialName"
                :value="item"
                :disabled="item.status == 1"
            >
              <span style="float: left">{{ item.materialName + item.materialSpec + item.materialUnitName}}}</span>
              <span
                  style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;"
              >{{ item.value }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="物料规格" align="center" prop="materialSpec">
        <template #default="scope">
          {{scope.row.materialName ? scope.row.materialName.materialSpec : ''}}
        </template>
      </el-table-column>
      <el-table-column label="物料单位" align="center" prop="materialUnit">
        <template #default="scope">
          {{scope.row.materialName ? scope.row.materialName.materialUnitName : ''}}
        </template>
      </el-table-column>
      <el-table-column label="物料数量" align="center" prop="materialNumber" width="400">
        <template #default="scope">
          <el-input-number v-model="scope.row.materialNumber" :min="1" @change="handleChange" />
        </template>
      </el-table-column>
      <el-table-column label="最晚进场时间" align="center" prop="entryDeadlineDate" width="110">
        <template #default="scope">
          <span>{{ parseTime(scope.row.entryDeadlineDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:detail:edit']">
            保存
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['system:detail:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="mt-4" style="width: 100%" @click="onAddItem">新增一行</el-button>
  </div>
</template>

<script setup>
import {listProjectInfo} from "@/api/base/info.js";
import {listMaterial} from '@/api/base/material.js';

const tableData = ref([{"id": 1}])
const tableHeight = ref(document.documentElement.scrollHeight - 245 + "px");

const loading = ref(false);

// 所属物料信息
const materialOptions = ref([]);

const onAddItem = () => {
  tableData.value.push({
    // date: dayjs(now).format('YYYY-MM-DD'),
  })
}

function init() {
  listMaterial({
    pageNum: 1,
    pageSize: 1000}).then(response => {
    materialOptions.value = response.rows;
  });
}
init();


</script>