<template>
  <div class="app-container">
    <div class="ipSetup-btns">
      <div>
        <!-- <el-button
          type="primary"
          @click="backBtn"
        >返回</el-button> -->
        <div>
          <el-button
            type="primary"
            @click="addBtn"
          >新增</el-button>
          <el-button
            type="primary"
            @click="delBtn"
            :disabled='!currentClickData'
          >删除</el-button>
        </div>
      </div>
    </div>
    <div class="ipSetup-mgr">
      <div class="ipSetup-table">
        <el-table
          class="table-class"
          :data="tableData"
          element-loading-text="Loading"
          fit
          highlight-current-row
          :header-cell-style="{color: '#5388f3'}"
          center
          @row-click='rowClick'
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="60"
          ></el-table-column>
          <el-table-column
            align="center"
            label="IP"
          >
            <template slot-scope="scope">
              {{ scope.row.ip }}
            </template>
          </el-table-column>
          <el-table-column
            label="子网掩码"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.subnetMask }}
            </template>
          </el-table-column>
          <el-table-column
            label="默认网关"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.gateWay }}
            </template>
          </el-table-column>
          <el-table-column
            label="DNS"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.dns }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            prop="created_at"
            label="操作"
            min-width="150px"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="color:#0FFFFF"
                @click="handleDetail(scope.$index,scope.row)"
              >详情</el-button>
              <el-button
                size="mini"
                round
                style="color:red;border-color:red;"
                @click="handleDel(scope.$index,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
    <el-dialog
      title="新增"
      :visible.sync="addDialogVisible"
      modal
      append-to-body
      center
      @close="addDialogClose('ipForm')"
      width="450px"
    >
      <!-- <el-form
        ref="ipForm"
        :model="ipForm"
        :rules="ipFormRules"
      >
        <el-form-item
          label="IP"
          :label-width="formLabelWidth"
          prop="ip"
        >
          <el-input
            name="ip-0"
            class="input-sub-check"
            v-model="ipForm.ip[0]"
            @input="ipinput('ip',0)"
            @keydown.native="keydownHandle('ip',0,$event)"
          >
          </el-input>.
          <el-input
            name="ip-1"
            class="input-sub-check"
            v-model="ipForm.ip[1]"
            @input="ipinput('ip',1)"
            @keydown.native="keydownHandle('ip',1,$event)"
          >
          </el-input>.
          <el-input
            name="ip-2"
            class="input-sub-check"
            v-model="ipForm.ip[2]"
            @input="ipinput('ip',2)"
            @keydown.native="keydownHandle('ip',2,$event)"
          >
          </el-input>.
          <el-input
            name="ip-3"
            class="input-sub-check"
            v-model="ipForm.ip[3]"
            @input="ipinput('ip',3)"
            @keydown.native="keydownHandle('ip',3,$event)"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="子网掩码"
          :label-width="formLabelWidth"
          prop="subnetMask"
        >
          <el-input
            class="input-sub-check"
            v-model="ipForm.subnetMask[0]"
            @input="ipinput('subnetMask',0)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.subnetMask[1]"
            @input="ipinput('subnetMask',1)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.subnetMask[2]"
            @input="ipinput('subnetMask',2)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.subnetMask[3]"
            @input="ipinput('subnetMask',3)"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="默认网关"
          :label-width="formLabelWidth"
          prop="gateWay"
        >
          <el-input
            class="input-sub-check"
            v-model="ipForm.gateWay[0]"
            @input="ipinput('gateWay',0)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.gateWay[1]"
            @input="ipinput('gateWay',1)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.gateWay[2]"
            @input="ipinput('gateWay',2)"
          >
          </el-input>.
          <el-input
            class="input-sub-check"
            v-model="ipForm.gateWay[3]"
            @input="ipinput('gateWay',3)"
          >
          </el-input>
        </el-form-item>
      </el-form> -->
      <el-form
        ref="ipForm"
        :model="ipForm"
        :rules="ipFormRules"
      >
        <!-- <el-form-item
          v-for="(item,index) in Object.keys(ipForm)"
          :key="index"
          :label="ipFormLabel(item)"
          :label-width="formLabelWidth"
          :prop="item"
        >
          <el-input
            v-for="(value,num) in ipForm[item]"
            :key="num"
            :id="item+'-'+num"
            v-model="ipForm[item][num]"
            @input="ipinput(item,num)"
            @keydown.native="keydownHandle(item,num,$event)"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="ip"
          :label-width="formLabelWidth"
          prop="ip"
        >
          <ip-input
            ref="ipInput"
            @ipInputChange="ipInputChange"
            :ipVal='ipForm.ip'
          ></ip-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAddForm"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNfsList, delNfs, getCifsList, addNfs } from '@/api/table'
import IpInput from '../ipInput/ipInput.vue'
export default {
  components: {
    IpInput
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatestrategyNmae = (rule, value, callback) => {
      const reg = /^[\s\S]{1,20}$/
      if (!reg.test(value)) {
        callback(new Error('定时策略名称长度为1-20'))
      } else {
        callback()
      }
    }
    const validateIp = (rule, value, callback) => {
      const arr = value.split('.')
      if (arr.some(item => item == '')) {
        callback(new Error(`${rule.field}不能为空`))
      } else {
        callback()
      }
    }

    return {
      currentClickData: null,
      tableData: [
        {
          ip: '192.168.66.202',
          subnetMask: '255.255.255.0',
          gateWay: '192.168.66.1',
          dns: '192.168.1.1'
        }
      ],

      addDialogVisible: false,
      formLabelWidth: '110px',
      ipForm: {
        ip: '255.255.255.9',
        subnetMask: [6, 6, 6, 6],
        gateWay: [6, 6, 6, 6]
      },
      ipFormRules: {
        ip: [
          // { required: true, message: 'IP不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateIp }
        ],
        subnetMask: [
          // { required: true, message: '子网掩码不能为空', trigger: 'blur' }
          { required: true, trigger: 'blur', validator: validateIp }
        ],
        gateWay: [
          // { required: true, message: '默认网关不能为空', trigger: 'blur' }
          { required: true, trigger: 'blur', validator: validateIp }
        ]
        // dns: [{ required: true, message: 'DNS不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    ipInputChange(label, data) {
      console.log(label, data)
      this.ipForm[label] = data
    },
    backBtn() {
      this.$router.go(-1)
    },
    addBtn() {
      this.addDialogVisible = true
      // 动态添加IP输入框中的标点'.'
      // this.$nextTick(() => {
      //   Object.keys(this.ipForm).forEach((item, index) => {
      //     for (let i = 1; i <= 3; i++) {
      //       document
      //         .getElementsByClassName('el-form-item__content')
      //         [index].insertBefore(
      //           document.createTextNode('.'),
      //           document.getElementsByClassName('el-form-item__content')[index]
      //             .children[i]
      //         )
      //     }
      //   })
      // })
      // this.ipForm.name = ''
      this.isAddBtnFlag = true
    },
    delBtn() {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          // await delFn()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '已取消删除',
            type: 'warning'
          })
        })
    },
    fetchData() {
      getCifsList(this.getParams)
        .then(response => {
          this.tableData = response.data.data
          this.totalCount = response.data.data.length
        })
        .catch(err => {})
    },
    rowClick(row) {
      console.log('rowClick', row)
      this.currentClickData = row
      // this.currentEditName = row.name
      // this.ipForm.name = row.name
      // this.delItem = row.id
    },
    submitAddForm() {
      this.$refs.ipForm.validate(valid => {
        if (valid) {
          console.log(this.ipForm)
          this.tableData[0].ip = this.ipForm.ip
          this.addDialogVisible = false
          // for (const key in this.ipForm) {
          //   this.ipForm[key] = this.ipForm[key].join('.')
          //   this.ipForm.vol_id = 12
          //   this.ipForm.name = 'ds'
          // }
          // addNfs(JSON.parse(JSON.stringify(this.ipForm)))
          //   .then(res => {
          //     console.log(res)
          //     this.ipForm = {
          //       ip: [6, 6, 6, 6],
          //       subnetMask: [6, 6, 6, 6],
          //       gateWay: [6, 6, 6, 6]
          //     }
          //     this.addDialogVisible = false
          //   })
          //   .catch(err => {
          //     console.log(err)
          //     this.ipForm = {
          //       ip: [6, 6, 6, 6],
          //       subnetMask: [6, 6, 6, 6],
          //       gateWay: [6, 6, 6, 6]
          //     }
          //     this.addDialogVisible = false
          //   })
        } else {
          console.log('error submit')
          // this.$message({
          //   message: 'error submit',
          //   type: 'warning'
          // })
          return false
        }
      })
    },
    addDialogClose(formName) {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$resetForm(this, formName)

      // 动态删除IP输入框中的标点'.'
      // document
      //   .getElementsByClassName('el-form-item__content')
      //   .forEach(value => {
      //     value.childNodes.forEach(item => {
      //       if (item.data == '.') {
      //         value.removeChild(item)
      //       }
      //     })
      //   })
    },
    ipinput(key, index) {
      // console.log('ipinput', key, index)
      // 强制input只能输入小于等于255的数字
      this.ipForm[key][index] =
        this.ipForm[key][index].replace(/[^\d]/g, '') > 255
          ? 255
          : this.ipForm[key][index].replace(/[^\d]/g, '')

      // 自动换框
      if (document.getElementById(key + '-' + index).value.length == 3) {
        // 当前输入框3位满了以后光标自动跳到下一个输入框
        const nextInput = index + 1
        if (nextInput != 4) {
          // 最后一格满了以后不会继续往后跳
          // const nextItem = val.replace(/\d/gi, nextInput)
          document.getElementById(key + '-' + nextInput).focus()
        }
      }

      if (document.getElementById(key + '-' + index).value.length == 0) {
        // 当前输入框无内容时光标自动跳到上一个输入框
        const lastInput = index - 1
        if (lastInput != -1) {
          // 第一格无内容以后不会继续往前跳
          // const lastItem = val.replace(/\d/gi, lastInput)
          document.getElementById(key + '-' + lastInput).focus()
        }
      }
    },
    keydownHandle(key, index, event) {
      // console.log(document.getElementById(key + '-' + index))
      const valLength = document.getElementById(key + '-' + index).value.length
      const selectionStart = document.getElementById(key + '-' + index)
        .selectionStart
      if (event.keyCode == 39 && index < 3 && selectionStart == valLength) {
        document.getElementById(key + '-' + (index + 1)).focus()
      }
      if (event.keyCode == 37 && index > 0 && selectionStart == 0) {
        document.getElementById(key + '-' + (index - 1)).focus()
      }
    },
    ipFormLabel(label) {
      switch (label) {
        case 'ip':
          return 'ip'
        case 'subnetMask':
          return '子网掩码'
        case 'gateWay':
          return '默认网关'
      }
    }
  },
  computed: {
    // btnFlag() {
    //   return this.isAddBtnFlag ? this.ipForm.name : this.currentEditName
    // }
  }
}
</script>
<style scoped lang="scss" >
.ipSetup-btns > div {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.ipSetup-mgr {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  .range-tree {
    margin-right: 10px;
    width: 262px;
    background-color: rgba(2, 17, 50, 0.5);
    border: 1px solid rgba(55, 85, 205, 0.5);

    .tree-seach {
      display: flex;
      direction: row;
      padding: 3px;
      width: 100%;
      height: 48px;
      background-color: rgba(55, 85, 205, 0.5);
      border: solid 1px rgba(55, 85, 205, 0.5);
    }
  }
  .ipSetup-table {
    height: 100%;
    flex: 1;
    width: 100%;
  }
}
.detail-content {
  font-size: 15px;
  line-height: 30px;
  color: #5388f3;
}

.el-button {
  vertical-align: middle;
}
::v-deep .el-input-group__append,
.el-input-group__prepend {
  color: #fff;
  background-color: rgba(55, 85, 205, 0.8);
  &:hover {
    background: #3755cc;
    border-color: #3755cc;
    color: #021132;
  }
}
.ipinput {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border: 1px solid #3755cd;
  border-radius: 4px;
  height: 40px;
  list-style: 40px;
  padding: 0 15px;
  input {
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    text-align: center;
  }
}
// ::v-deep .el-form-item__content {
//   display: flex;
//   border: 1px solid #3755cd;
//   border-radius: 4px;
//   padding: 0 15px;
//   .el-input__inner {
//     border: none;
//     text-align: center;
//     padding: 0;
//   }
// }
::v-deep .el-form-item__content {
  line-height: 26px;
}
</style>