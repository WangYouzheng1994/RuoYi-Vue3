<!--
  要货计划详情页容器
-->
<template>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseTab">
          <base-info-form ref="baseInfo" :info="info" :projectOptions="projectOptions" :disabled="disabled"  />
        </el-tab-pane>
        <el-tab-pane label="计划详情" name="materialDetailTab">
          <material-detail ref="materialDetails" :planId="planId" :disabled="disabled" />
        </el-tab-pane>
      </el-tabs>
      <el-form label-width="100px">
        <div style="text-align: center;margin-left:-100px;margin-top:10px;">
          <el-button type="primary" @click="submitForm('submit')" v-if="!disabled">提报计划</el-button>
          <el-button type="primary" @click="submitForm('save')" v-if="!disabled">保存</el-button>
          <el-button @click="close()">返回</el-button>
          <el-button type="info" @click="() => {proxy.$modal.msgError('功能未开放')}">打印要货计划</el-button>
        </div>
      </el-form>
    </el-card>
</template>

<script setup name="PlanDetail">
import baseInfoForm from "./baseInfoForm.vue";
import materialDetail from './materialDetail.vue'
import {listProjectInfo} from "@/api/base/info.js";
import {addMaterialPlan, getMaterialPlan, updateMaterialPlan} from "@/api/material/plan.js";

const { proxy } = getCurrentInstance();
const route = useRoute();
const planId = route.params && route.params.id
const disabled = route.query? JSON.parse(route.query.disabled) : true

const activeName = ref("baseTab");
const info = ref({});
// const materialDetails = ref(null);
const projectOptions = ref([])

/**
 * 页面初始化
 */
function init() {
  info.value = {
    projectId: "",
    planName: "",
    remark: ""
  };

  listProjectInfo({
    pageNum: 1,
    pageSize: 100}).then(response => {
    projectOptions.value = response.rows;
  });

  // 更新回显~
  if (planId) {
    getMaterialPlan(planId).then(res => {
      if (res && res.code == 200 && res.data) {
        let data = Object.assign({}, res.data);

        info.value = {
          project : {id: data.projectId, projectName:data.projectName},
          planName: data.planName,
          remark: data.remark
        }
      } else {
        proxy.$modal.msgError("当前计划信息无法打开！！");
        close();
      }
    });
  }
}

/**
 * 提交表单
 * @param type
 */
function submitForm(type) {
  const submitType = type;

  // 基本信息表单
  const baseForm = proxy.$refs.baseInfo.$refs.planFormRef;
  // 要货计划详情列表
  const detailTable = proxy.$refs.materialDetails.$refs.detailTableRef.data;

  Promise.all([baseForm].map(getFormPromise)).then((res) => {
    const validateResult = res.every(item => !!item);

    if (validateResult) {
      const planInfo = Object.assign({}, info.value);
      planInfo.projectId = planInfo.project.id;
      planInfo.projectName = planInfo.project.projectName;

      let detailList = Object.assign([], toRaw(detailTable));
      detailList.forEach(i => {
        if (i.material) {
          let materialInfo = i.material;
          i.materialName = materialInfo.materialName;
          i.materialSpec = materialInfo.materialSpec;
          i.materialUnit = materialInfo.materialUnit;
          i.materialUnitName = materialInfo.materialUnitName;
        }
      })

      if (submitType == 'submit' && !detailList.length) {
        proxy.$modal.msgError("当前提报的计划没有任何要货明细！");
        return;
      }

      planInfo.detailList = detailList;
      planInfo.submitType = submitType;

      if (planId) {
        planInfo.id = parseInt(planId);
        updateMaterialPlan(planInfo).then(res => {
          if (res.code === 200) {
            proxy.$modal.msgSuccess("操作成功");
            close();
          } else {
            proxy.$modal.msgError("操作异常");
          }
        });
      } else {
        addMaterialPlan(planInfo).then(res => {
          if (res.code === 200) {
            proxy.$modal.msgSuccess("操作成功");
            close();
          } else {
            proxy.$modal.msgError("操作异常");
          }
        })
      }
    } else {
      activeName.value = "baseTab";
      proxy.$modal.msgError("表单校验未通过，请重新检查提交内容");
    }
  });
}

/**
 * 关闭页面
 */
function close() {
  const obj = { path: "/material/material/plan", query: { t: Date.now(), pageNum: route.query.pageNum } };
  proxy.$tab.closeOpenPage(obj);
}

function getFormPromise(form) {
  return new Promise(resolve => {
    form.validate(res => {
      resolve(res);
    });
  });
}

init();


</script>
<style scoped lang="scss">

</style>