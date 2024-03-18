<!--
  要货计划详情页容器
-->
<template>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseTab">
          <base-info-form ref="baseInfo" :info="info" :projectOptions="projectOptions" />
        </el-tab-pane>
        <el-tab-pane label="计划详情" name="materialDetailTab">
          <material-detail ref="materialDetails"/>
        </el-tab-pane>
      </el-tabs>
      <el-form label-width="100px">
        <div style="text-align: center;margin-left:-100px;margin-top:10px;">
          <el-button type="primary" @click="submitForm()">提报计划</el-button>
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="close()">返回</el-button>
        </div>
      </el-form>
    </el-card>
</template>

<script setup name="PlanDetail">
import baseInfoForm from "./baseInfoForm.vue";
import materialDetail from './materialDetail.vue'
import {listProjectInfo} from "@/api/base/info.js";


const { proxy } = getCurrentInstance();
const route = useRoute();

const activeName = ref("baseTab");
const info = ref({});
const projectOptions = ref([])

function init() {
  listProjectInfo({
    pageNum: 1,
    pageSize: 100}).then(response => {
    projectOptions.value = response.rows;
  });
}

function submitForm() {

}

function close() {
  const obj = { path: "/material/material/plan", query: { t: Date.now(), pageNum: route.query.pageNum } };
  proxy.$tab.closeOpenPage(obj);
}

init();

</script>
<style scoped lang="scss">

</style>