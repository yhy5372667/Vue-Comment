<template>
  <div class="infoList">
    <!-- 新增按钮 -->
    <el-form
      :inline="true"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加学生信息弹窗 -->
    <el-dialog
      :title="state ? '添加学生信息' : '修改学生信息' "
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="父亲姓名"
          :label-width="formLabelWidth"
          prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="母亲姓名"
          :label-width="formLabelWidth"
          prop="mother"
        >
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="form.time"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { info, getInfo, updateInfo, infoDel } from '@/api/api.js'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mother: "",
        address: "",
        time: "",
      },
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入地址" }],
        time: [{ required: true, message: "请输入入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      total:0,
      state:true,
    };
  },
  created(){
      this.getData()
  },
  methods: {
    del(row) {
        console.log(row);
        infoDel(row.id).then((res)=>{
            if(res.data.status === 200){
                this.getData()
                this.$message.success('删除数据成功')
            }
        })
    },
    edit(row) {
        console.log(row);
        this.state = false
        this.form = {...row}
        this.dialogFormVisible = true
        
    },
    addStudent() {
        this.form = {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mother: "",
        address: "",
        time: "",
        }
        this.state = true;
        this.dialogFormVisible = true;
    },
    getData(){
        getInfo().then((res)=>{
            if(res.data.status === 200){
                this.tableData = res.data.data;
                this.total = res.data.total;
            }
        })
    },
    sure(form) {
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          console.log(form, this.form);
          if(this.state){
            info(this.form).then((res)=>{
              if(res.data.status === 200){
                  this.getData();
                  this.dialogFormVisible = false;
                  this.$refs['form'].resetFields()
                  this.$message.success('新增数据成功');
                }
            })
          }else{
              updateInfo(this.form).then((res)=>{
                  if(res.data.status === 200){
                      this.getData()
                      this.dialogFormVisible = false
                      this.$refs['form'].resetFields()
                      this.$message.success('数据修改成功')
                  }
              })
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.demo-form-inline,
.el-form-item {
  text-align: left;
  margin-top: 20px;
}
</style>