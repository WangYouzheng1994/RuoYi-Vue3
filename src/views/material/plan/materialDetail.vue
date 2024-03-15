<!--
  要货计划，物料详情
-->
<template>
<!--  <div>-->
  <el-table v-loading="loading" :data="tableData">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="" align="center" prop="id" />
<!--    <el-table-column label="项目名称" align="center" prop="projectName" />
    <el-table-column label="项目id" align="center" prop="projectId" />
    <el-table-column label="项目经理" align="center" prop="projectManagerName" />
    <el-table-column label="项目经理id" align="center" prop="projectManagerId" />
    <el-table-column label="要货计划id" align="center" prop="planId" />
    <el-table-column label="计划名称" align="center" prop="planName" />
    <el-table-column label="物料名称" align="center" prop="materialName" />
    <el-table-column label="物料规格" align="center" prop="materialSpec" />
    <el-table-column label="物料单位" align="center" prop="materialUnit" />
    <el-table-column label="物料数量" align="center" prop="materialNumber" />
    <el-table-column label="最晚进场时间" align="center" prop="entryDeadlineDate" width="180">
      <template #default="scope">
        <span>{{ parseTime(scope.row.entryDeadlineDate, '{y}-{m}-{d}') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="备注" align="center" prop="remark" />
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template #default="scope">
        <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:detail:edit']">修改</el-button>
        <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:detail:remove']">删除</el-button>
      </template>
    </el-table-column>-->
  </el-table>

<!--  <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>-->
<!--  </div>-->
</template>

<script setup name="materialDetail">

const tableData = ref([])

const loading = ref(false);

const onAddItem = () => {
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}

</script>


<style scoped lang="scss">

</style>