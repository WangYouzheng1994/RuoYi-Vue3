<script setup>
import { listProjectInfo } from "@/api/base/info";

const loading = ref(true);
const projects = ref([]);

function init() {
  listProjectInfo({pageNum: 1, pageSize: 6}).then(response => {
    projects.value = response.rows;
    loading.value = false;
  });

  listMaterialPlan({})
}

init();

</script>

<template>
  <!--  <el-card class="introduce">
      <div class="order">
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>今日上报计划</span>
            </div>
          </template>
          <div class="item">1888</div>
        </el-card>
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>今日入库操作数量</span>
            </div>
          </template>
          <div class="item">36271</div>
        </el-card>
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>物料配送完成率</span>
            </div>
          </template>
          <div class="item">20%</div>
        </el-card>
      </div>
      <div id="zoom"></div>
    </el-card>-->
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="false" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img
                  src="@/assets/imgs/avatar.jpg"
                  alt=""
                  class="w-70px h-70px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-20px">
                  {{ "你好，Archer， 祝你工作愉快！" }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  今日气温：22.22
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end lt-sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">项目数</div>
                <span>{{projects.length}}</span>
              </div>
              <ElDivider direction="vertical"/>
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">要货计划</div>
                <span>3000</span>
              </div>
              <!--            <ElDivider direction="vertical" border-style="dashed" />
                          <div class="px-8px text-right">
                            <div class="text-14px text-gray-400 mb-20px">啊啊啊啊</div>
                            <span>3000</span>
                          </div>-->
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>
  <ElRow class="mt-20px" :gutter="20" justify="space-between">

    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <div class="flex justify-between">
            <span>近期项目</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
          </div>
        </template>

        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol
                v-for="(item, index) in projects"
                :key="`card-${index}`"
                :xl="8"
                :lg="8"
                :md="12"
                :sm="24"
                :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
<!--                  <Icon :icon="item.icon" :size="25" class="mr-10px" />-->
                  <span class="text-16px">{{ item.projectName }}</span>
                </div>
                <div class="mt-15px text-14px text-gray-400">{{ item.message}}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.projectAddress }}</span>
                  <span>{{ parseTime(item.inboundDate, '{y}-{m}-{d}') }}</span>
<!--                  <span>{{ "项目经理" + item.projectMgr}}</span>-->
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style scoped lang="scss">
.introduce .order {
  display: flex;
  margin-bottom: 50px;
}

.introduce .order .order-item {
  flex: 1;
  margin-right: 20px;
}

.introduce .order .order-item:last-child {
  margin-right: 0;
}

#zoom {
  min-height: 300px;
}
</style>