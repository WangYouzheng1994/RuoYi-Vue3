<script setup>
// import VabChart from '@/plugins/echarts'

const fwl = ref({
  color: ['#1890FF', '#36CBCB', '#4ECB73', '#FBD437', '#F2637B', '#975FE5'],
      backgroundColor: 'rgba(252,252,252,0)',
      grid: {
    top: '4%',
        left: '2%',
        right: '4%',
        bottom: '0%',
        containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
      yAxis: [
    {
      type: 'value',
    },
  ],
      series: [
    {
      name: '访问量',
      type: 'line',
      data: [],
      smooth: true,
      areaStyle: {},
    },
  ],
})

</script>

<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <el-card shadow="never">
          <div slot="header">
            <span>访问量</span>
          </div>
          <vab-chart autoresize :option="fwl"/>
          <div class="bottom">
            <span>
              日均访问量:

              {{ 12 }}
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <el-card shadow="never">
          <div slot="header">
            <span>授权数</span>
          </div>
          <vab-chart autoresize :option="sqs" />
          <div class="bottom">
            <span>
              总授权数:
              {{ 20 }}
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>

</template>

<style scoped lang="scss">
.index-container {
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  ::v-deep {
    .el-alert {
      padding: 20px;

      &--info.is-light {
        min-height: 82px;
        padding: 20px;
        margin-bottom: 15px;
        color: #909399;
        background-color: #fff;
        border: 1px solid #ebeef5;
      }
    }

    .el-card__body {
      .echarts {
        width: 100%;
        height: 115px;
      }
    }
  }

  .card {
    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
      }
    }
  }

  .bottom {
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid #dcdfe6;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }

  .icon-panel {
    height: 117px;
    text-align: center;
    cursor: pointer;

    svg {
      font-size: 40px;
    }

    p {
      margin-top: 10px;
    }
  }

  .bottom-btn {
    button {
      margin: 5px 10px 15px 0;
    }
  }
}

</style>