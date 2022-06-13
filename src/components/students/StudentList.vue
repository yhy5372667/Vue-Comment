<template>
  <div>
    <!-- 查询 重置 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 第一页:1-10条 第二页: 11-20条 slice((当前页数-1)*每条页数, 当前页数*当前条数) -->
    <!-- <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" border style="width: 100%"> -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { students } from "@/api/api.js";
import { studentDel } from "@/api/api.js";
export default {
  created() {
    this.getData();
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 0, //总条数
      formInline:{
        name:''
      }
    };
  },
  methods: {
    getData(params) {
      students(params).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val; //改变的是每页显示的条数
      this.currentPage = 1; //改变完之后 都跳转到第一页
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    del(row) {
      console.log(row);
      studentDel(row.id).then((res) => {
        if (res.data.status === 200) {
          this.$message.success("删除数据成功");
          this.getData();
        }
      });
    },
    find(){
      this.getData(this.formInline)
    },
    reset(){
      this.formInline = {}
      this.getData(this.formInline)
    }
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
.demo-form-inline,.el-form-item{
  text-align: left;
    margin-top: 20px;
}
</style>