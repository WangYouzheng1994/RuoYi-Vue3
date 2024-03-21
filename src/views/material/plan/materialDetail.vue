<!--
  要货计划，物料详情
-->
<template>
  <div>
    <el-table ref="detailTableRef" :max-height="tableHeight" :data="tableData" table-layout="auto" stripe border >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column width="220" label="物料名称" align="center" prop="material">
        <template #default="scope">
          <el-select value-key="id" v-model="scope.row.material" style="width:100%" @change="(selected)=> {
            scope.row.materialId = selected.id;
            scope.row.materialUnitCode = selected.materialUnitCode;
          }">
<!--            @change="onchange($event, scope)"-->
            <el-option
                v-for="item in materialOptions"
                :key="item.id"
                :label="item.materialName"
                :value="item"
                :disabled="item.status == 1"
            >
              <span style="float: left">{{ item.materialName + item.materialSpec + item.materialUnitName }}}</span>
              <span style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;">{{ item.value }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="物料规格" align="center" prop="materialSpec" width="110" resizable>
        <template #default="scope">
          {{ scope.row.material ? scope.row.material.materialSpec : '' }}
        </template>
      </el-table-column>
      <el-table-column label="物料单位" align="center" prop="materialUnitName" resizable>
        <template #default="scope">
          {{ scope.row.material ? scope.row.material.materialUnitName : '' }}
<!--          {{ scope.row.material ? scope.row.materialUnitCode : '' }}-->
        </template>
      </el-table-column>
      <el-table-column label="物料数量" align="center" prop="materialNumber" width="210" resizable>
        <template #default="scope">
          <el-input-number v-model="scope.row.materialNumber" :min="1" @change="handleChange"/>
        </template>
      </el-table-column>
      <el-table-column label="最晚进场时间" align="center" prop="entryDeadlineDate" width="250" resizable>
        <template #default="scope">
<!--          <span>{{ parseTime(scope.row.entryDeadlineDate, '{y}-{m}-{d}') }}</span>-->
          <el-date-picker
              v-model="scope.row.entryDeadlineDate"
              type="date"
              size="default"
          />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" width="220" resizable>
        <template #default="scope">
          <el-input v-model="scope.row.remark"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:detail:edit']">
            保存
          </el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['system:detail:remove']">删除
          </el-button>-->
          <el-button
              link
              icon="Delete"
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)">
            删除行
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="mt-4" style="width: 100%" @click="onAddItem">新增一行</el-button>
  </div>
</template>

<script setup>
let definePropsObj = defineProps({
  planId: ""
});

import dayjs from 'dayjs';
import {listMaterial} from '@/api/base/material.js';
import {listMaterialPlanDetail} from "@/api/material/detail.js";

const now = new Date()
const tableData = ref([])
const tableHeight = ref(document.documentElement.scrollHeight - 245 + "px");

const loading = ref(false);

// 所属物料信息
const materialOptions = ref([]);

const onAddItem = () => {
  tableData.value.push({
    materialNumber: 1,
    entryDeadlineDate: dayjs(now).format('YYYY-MM-DD'),
  })
}

const deleteRow = (index) => {
  tableData.value.splice(index, 1)
}

function init() {
  tableData.value = [];

  listMaterial({
    pageNum: 1,
    pageSize: 1000
  }).then(response => {
    materialOptions.value = response.rows;
  });

  if (definePropsObj.planId) {
    // 回显
    listMaterialPlanDetail({
      pageNum: 1,
      pageSize: 100,
      planId: definePropsObj.planId}).then(res => {
      let rows = res.rows;
      rows.forEach(row => {
        row.material = {
          id: row.materialId,
          materialName: row.materialName,
          materialSpec: row.materialSpec,
          materialUnitName: row.materialUnitName,
          materialUnitCode: row.materialUnitCode,
        }
      })
      tableData.value = rows
    });
  }
}

init();


</script>