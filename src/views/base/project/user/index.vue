<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="110px">
<!--      <el-form-item label="项目" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
<!--      <el-form-item label="干系人id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入干系人id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="干系人姓名" prop="userName">
<!--        <el-date-picker clearable
          v-model="queryParams.userName"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择干系人姓名">
        </el-date-picker>-->
        <el-select v-model="queryParams.userName" placeholder="请选择人员" style="width:100%">
          <el-option
              v-for="item in userOptions"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              :disabled="item.status == 1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位名称" prop="userPostName">
        <el-input
          v-model="queryParams.userPostName"
          placeholder="请输入岗位名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="岗位id" prop="userPostId">
        <el-input
          v-model="queryParams.userPostId"
          placeholder="请输入岗位id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="联系方式" prop="userPhoneNumber">
        <el-input
          v-model="queryParams.userPhoneNumber"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        <el-button type="primary" icon="Back" @click="close()">返回</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="${comment}" align="center" prop="id" />-->
      <el-table-column label="项目" align="center" prop="projectName" />
<!--      <el-table-column label="干系人id" align="center" prop="userId" />-->
      <el-table-column label="干系人姓名" align="center" prop="userName" width="180">
<!--        <template #default="scope">
          <span>{{ parseTime(scope.row.userName, '{y}-{m}-{d}') }}</span>
        </template>-->
      </el-table-column>
      <el-table-column label="岗位名称" align="center" prop="userPostName" />
<!--      <el-table-column label="岗位id" align="center" prop="userPostId" />-->
      <el-table-column label="干系人联系方式" align="center" prop="userPhoneNumber" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:user:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:user:remove']">删除</el-button>
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

    <!-- 添加或修改项目干系人信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="userRef" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="项目" prop="projectId">
          <el-input v-model="form.projectName" disabled/>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-select value-key="userId" v-model="selectUser" placeholder="请选择人员" style="width:100%">
            <el-option
                v-for="item in userOptions"
                :key="item.userId"
                :label="item.userName"
                :value="item"
                :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位名称" prop="userPostId">
<!--          <el-input v-model="form.userPostName" placeholder="请输入岗位名称" />-->
          <el-select value-key="postId" v-model="selectPost" placeholder="请选择" style="width:100%">
            <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :label="item.postName"
                :value="item"
                :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="岗位id" prop="userPostId">
          <el-input v-model="form.userPostId" placeholder="请输入岗位id" />
        </el-form-item>-->
        <el-form-item label="联系方式" prop="userPhoneNumber">
          <el-input v-model="form.userPhoneNumber" placeholder="请输入联系方式" />
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

<script setup name="User">
import { listProjectUser, getProjectUser, delProjectUser, addProjectUser, updateProjectUser } from "@/api/base/user";
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from "@/api/base/info";
import {getUser, listUser} from "@/api/system/user";

const route = useRoute();
const projectId = route.params && route.params.id;
const { proxy } = getCurrentInstance();

const userList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const selectUser = ref({});
const selectPost = ref({});

// 岗位信息
const postOptions = ref([]);
const roleOptions = ref([]);
// 所属项目信息
const projectInfo = ref();
// 人员下拉
const userOptions = ref([])

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    projectId: null,
    userId: null,
    userName: null,
    userPostName: null,
    userPostId: null,
    userPhoneNumber: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询项目干系人信息列表 */
function getList() {
  loading.value = true;
  listProjectUser(queryParams.value).then(response => {
    userList.value = response.rows;
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
    projectId: null,
    userId: null,
    userName: null,
    userPostName: null,
    userPostId: null,
    userPhoneNumber: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    user: null,
  };
  selectUser.value = null;
  selectPost.value = null;

  proxy.resetForm("userRef");
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
  initInfo();
  open.value = true;
  title.value = "添加项目干系人信息";
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  console.log("11")
  await initInfo();
  const _id = row.id || ids.value
  await getProjectUser(_id).then(response => {
    open.value = true;
    title.value = "修改项目干系人信息";
    form.value = response.data;
    selectUser.value = {"userId": form.value.userId};
    selectPost.value = {"postId": form.value.userPostId};
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["userRef"].validate(valid => {
    if (valid) {
      // 准备数据
      form.value.userId = selectUser.value.userId;
      form.value.userName = selectUser.value.userName;
      form.value.projectId = projectInfo.value.id;
      form.value.projectName = projectInfo.value.projectName;

      form.value.userPostId = selectPost.value.postId;
      form.value.userPostName = selectPost.value.postName;

      if (form.value.id != null) {
        updateProjectUser(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addProjectUser(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除项目干系人信息编号为"' + _ids + '"的数据项？').then(function() {
    return delProjectUser(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/user/export', {
    ...queryParams.value
  }, `user_${new Date().getTime()}.xlsx`)
}

function close() {
  // const obj = { path: "/tool/gen", query: { t: Date.now(), pageNum: route.query.pageNum } };
  proxy.$tab.closeOpenPage({path: "/material/base/project/info"});
}

async function initInfo() {
  reset();
  // 获取岗位信息
   getUser().then(response => {
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
  });

  // 获取项目信息
  getInfo(projectId).then(res => {
    projectInfo.value = res.data;

    data.form.projectName = res.data.projectName;
    data.form.projectId = res.data.projectId;
  });
  // 获取人员清单
  await listUser({pageNum: 1, pageSize: 200}).then(response => {
    userOptions.value = response && response.rows;
  });
}


getList();
</script>
