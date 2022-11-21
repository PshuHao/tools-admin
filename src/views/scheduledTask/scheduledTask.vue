<template>
  <div class="app-container">
    <div class="cycleTimeRow day">
      <el-checkbox
        v-model="cycleTimeObj.day.preChecked"
        @change="cycleCheckChange('day')"
        label="每隔"
      ></el-checkbox>
      <el-input-number
        v-model="cycleTimeObj.day.dayVal"
        controls-position="right"
        @change="cycleTimeChange"
        :min="1"
        :max="10"
      ></el-input-number>
      <el-select
        v-model="cycleTimeObj.day.dayType"
        placeholder="请选择"
        class="cycleTimeSelect"
      >
        <el-option
          label="天"
          value="1"
        ></el-option>
        <el-option
          label="月"
          value="2"
        ></el-option>
      </el-select>
      <br />
      <el-time-picker
        v-model="cycleTimeObj.day.dayTimeVal"
        :picker-options="{}"
        placeholder="任意时间点"
        format='HH:mm'
        value-format="HH:mm"
      >
      </el-time-picker>
    </div>
    <div class="cycleTimeRow week">
      <el-checkbox
        v-model="cycleTimeObj.week.preChecked"
        @change="cycleCheckChange('week')"
        label="每周"
      ></el-checkbox>
      <el-checkbox
        :indeterminate="cycleTimeObj.week.isWeekIndeterminate"
        v-model="cycleTimeObj.week.weekCheckAll"
        @change="weekCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="cycleTimeObj.week.weekCheckItems"
        @change="weekCheckItemChange"
      >
        <el-checkbox
          v-for="(week,index) in cycleTimeObj.week.weekCheckItemData"
          :label="index+1"
          :key="index"
        >{{week}}</el-checkbox>
      </el-checkbox-group>
      <el-time-picker
        v-model="cycleTimeObj.week.weekTimeVal"
        placeholder="任意时间点"
        format='HH:mm'
        value-format="HH:mm"
      >
      </el-time-picker>
    </div>
    <div class="cycleTimeRow month">
      <el-checkbox
        v-model="cycleTimeObj.month.preChecked"
        @change="cycleCheckChange('month')"
        label="每月"
      ></el-checkbox>
      <el-checkbox
        :indeterminate="cycleTimeObj.month.ismonthIndeterminate"
        v-model="cycleTimeObj.month.monthCheckAll"
        @change="monthCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="cycleTimeObj.month.monthCheckItems"
        @change="monthCheckItemChange"
      >
        <el-checkbox
          v-for="month in cycleTimeObj.month.monthCheckItemData"
          :label="month"
          :key="month"
        ></el-checkbox>
      </el-checkbox-group>
      <el-time-picker
        v-model="cycleTimeObj.month.monthTimeVal"
        placeholder="任意时间点"
        format='HH:mm'
        value-format="HH:mm"
      >
      </el-time-picker>
    </div>
  </div>
</template>

<script>
const weekCheckOptions = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
]
const monthCheckOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31'
]
export default {
  name: 'scheduledTask',
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formLabelWidth: '156px',
      searchContent: '',
      scheduleType: '',
      cycleTimeObj: {
        day: {
          preChecked: false,
          dayVal: '',
          dayType: '',
          dayTimeVal: ''
        },
        week: {
          preChecked: false,
          isWeekIndeterminate: false,
          weekCheckAll: false,
          weekCheckItems: [],
          weekCheckItemData: weekCheckOptions,
          weekTimeVal: ''
        },
        month: {
          preChecked: false,
          ismonthIndeterminate: false,
          monthCheckAll: false,
          monthCheckItems: [],
          monthCheckItemData: monthCheckOptions,
          monthTimeVal: ''
        }
      },
      cycleTypeArr: ['day', 'week', 'month'],
      detailDialogVisible: false,
      volOptions: [],
      dialogFlag: '',
      backupLogTableData: []
    }
  },
  created() {},
  methods: {
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    // async addBtn() {
    //   this.dialogFlag = 'add'
    //   this.dialogVisible = true
    //   try {
    //     const { data: volumeAllRes } = await getVolumeAll()
    //     this.volOptions = this.ipArrFn(volumeAllRes)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // async editBtn() {
    //   this.dialogFlag = 'edit'
    //   this.dialogVisible = true
    //   try {
    //     const { data } = await detailBackup({
    //       id: this.rowData.id
    //     })
    //     const index = data.type - 1
    //     this.strategyForm = data
    //     this.cycleTimeObj[this.cycleTypeArr[index]].preChecked = true
    //     this.cycleCheckChange(this.cycleTypeArr[data.type - 1])
    //     switch (data.type) {
    //       case 1:
    //         this.cycleTimeObj.day.dayTimeVal = data.back_time
    //         this.cycleTimeObj.day.dayVal = data.content
    //         this.cycleTimeObj.day.dayType =
    //           data.dayofday_type == '0' ? '' : data.dayofday_type
    //         break
    //       case 2:
    //         this.cycleTimeObj.week.weekCheckItems = data.content
    //           .split(',')
    //           .map((item) => Number(item))
    //         this.cycleTimeObj.week.weekTimeVal = data.back_time
    //         break
    //       case 3:
    //         this.cycleTimeObj.month.monthCheckItems = data.content.split(',')
    //         this.cycleTimeObj.month.monthTimeVal = data.back_time
    //         this.cycleTimeObj.month.monthCheckAll =
    //           this.cycleTimeObj.month.monthCheckItems.length == 31
    //         break
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // delBtn() {
    //   this.$confirm('是否确认删除？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(async() => {
    //       try {
    //         await delBackup({
    //           id: this.rowData.id
    //         })
    //         this.$message({
    //           message: '删除成功！',
    //           type: 'success'
    //         })
    //         this.fetchData(this.pageSize, 1)
    //       } catch (err) {
    //         console.log(err)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.$message({
    //         message: '已取消删除',
    //         type: 'info'
    //       })
    //     })
    // },
    // logInfoBtn() {
    //   this.dialogFlag = 'log'
    //   this.dialogVisible = true
    //   this.logBackupFetch(5, 1)
    // },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(val, this.currentPage)
    },
    currentPageChange(val) {
      this.currentPage = val
      this.fetchData(this.pageSize, val)
    },
    // async fetchData(per, current) {
    //   try {
    //     const { data } = await getBackupList({
    //       per_page: per,
    //       page: current
    //     })
    //     this.tableData = data.data
    //     this.totalCount = data.total
    //   } catch (err) {
    //     console.log(err)
    //   }
    //   // getNfsList()
    //   //   .then((response) => {
    //   //     this.tableData = response.data.data
    //   //     this.totalCount = response.data.data.length
    //   //   })
    //   //   .catch((err) => {})
    // },
    handleDetail(index, row) {
      this.detailDialogVisible = true
    },
    handleDel(index, row) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delNfs({
            nfs_id: row.nfs_id
          })
          this.tableData.splice(index, 1)
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
    // rowClick(val) {
    //   console.log('rowClick', val)
    //   this.rowData = val
    // },
    // submitAddForm() {
    //   this.$refs.strategyForm.validate((valid) => {
    //     if (valid) {
    //       if (this.dialogFlag == 'add') {
    //         this.typeSwitch(this.strategyForm.type)
    //         console.log(32132, this.strategyForm)
    //         addBackup(JSON.parse(JSON.stringify(this.strategyForm)))
    //           .then((res) => {
    //             console.log(res)
    //             if (res.error_code == 200) {
    //               this.dialogVisible = false
    //               this.$message({
    //                 message: '新增成功！',
    //                 type: 'success'
    //               })
    //               this.fetchData(this.pageSize, 1)
    //             }
    //           })
    //           .catch((err) => {
    //             console.log(err)
    //           })
    //       } else if (this.dialogFlag == 'edit') {
    //         this.typeSwitch(this.strategyForm.type)
    //         console.log('submitAddForm-edit', this.strategyForm)
    //         editBackup(JSON.parse(JSON.stringify(this.strategyForm)))
    //           .then((res) => {
    //             console.log(res)
    //             if (res.error_code == 200) {
    //               this.dialogVisible = false
    //               this.$message({
    //                 message: '编辑成功！',
    //                 type: 'success'
    //               })
    //               this.fetchData(this.pageSize, 1)
    //             }
    //           })
    //           .catch((err) => {
    //             console.log(err)
    //           })
    //       }
    //     } else {
    //       console.log('error submit')
    //       return false
    //     }
    //   })
    // },
    // dialogClose(formName) {
    //   if (this.dialogFlag != 'log') {
    //     this.$resetForm(this, formName)
    //     // 清空备份频率选项
    //     this.cycleTypeArr = ['day', 'week', 'month']
    //     this.cycleTypeArr.forEach((val) => {
    //       document
    //         .getElementsByClassName('cycleTimeRow ' + val)[0]
    //         .classList.remove('noclick')
    //     })
    //     this.cycleTimeObj = {
    //       day: {
    //         preChecked: false,
    //         dayVal: '',
    //         dayType: '',
    //         dayTimeVal: ''
    //       },
    //       week: {
    //         preChecked: false,
    //         isWeekIndeterminate: false,
    //         weekCheckAll: false,
    //         weekCheckItems: [],
    //         weekCheckItemData: weekCheckOptions,
    //         weekTimeVal: ''
    //       },
    //       month: {
    //         preChecked: false,
    //         ismonthIndeterminate: false,
    //         monthCheckAll: false,
    //         monthCheckItems: [],
    //         monthCheckItemData: monthCheckOptions,
    //         monthTimeVal: ''
    //       }
    //     }
    //   }
    // },
    cycleTimeChange(val) {
      console.log('cycleTimeChange', val)
    },
    weekCheckAllChange(val) {
      console.log('weekCheckAllChange', val)
      this.cycleTimeObj.week.weekCheckItems = val ? [1, 2, 3, 4, 5, 6, 7] : []
      this.cycleTimeObj.week.isWeekIndeterminate = false
    },
    weekCheckItemChange(val) {
      console.log('weekCheckItemChange', val)
      this.cycleTimeObj.week.weekCheckItems = val
      const checkedCount = val.length
      this.cycleTimeObj.week.weekCheckAll =
        checkedCount === this.cycleTimeObj.week.weekCheckItemData.length
      this.cycleTimeObj.week.isWeekIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.cycleTimeObj.week.weekCheckItemData.length
    },
    monthCheckAllChange(val) {
      console.log('monthCheckAllChange', val)
      this.cycleTimeObj.month.monthCheckItems = val ? monthCheckOptions : []
      this.cycleTimeObj.month.ismonthIndeterminate = false
    },
    monthCheckItemChange(val) {
      console.log('monthCheckItemChange', val)
      const checkedCount = val.length
      this.cycleTimeObj.month.monthCheckAll =
        checkedCount === this.cycleTimeObj.month.monthCheckItemData.length
      this.cycleTimeObj.month.ismonthIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.cycleTimeObj.month.monthCheckItemData.length
    },
    cycleCheckChange(e) {
      console.log('cycleCheckChange', e, this.cycleTimeObj[e].preChecked)
      if (this.cycleTimeObj[e].preChecked) {
        this.cycleTypeArr.splice(
          this.cycleTypeArr.findIndex(item => item == e),
          1
        )
        // 确定type类型
        switch (e) {
          case 'day':
            this.scheduleType = 1
            break
          case 'week':
            this.scheduleType = 2
            break
          case 'month':
            this.scheduleType = 3
            break
        }
      }
      if (this.cycleTypeArr.length != 3) {
        this.cycleTypeArr.forEach(val => {
          document
            .getElementsByClassName('cycleTimeRow ' + val)[0]
            .classList.toggle('noclick')
        })
        this.cycleTypeArr = this.cycleTimeObj[e].preChecked
          ? this.cycleTypeArr
          : ['day', 'week', 'month']
      }
    },
    ipArrFn(arr) {
      const newArr = []
      arr.forEach((item, index) => {
        newArr.push({
          value: item,
          label: item
        })
      })
      return newArr
    },
    typeSwitch(type) {
      switch (type) {
        case 1:
          this.strategyForm.back_time = this.cycleTimeObj.day.dayTimeVal
          this.strategyForm.content = this.cycleTimeObj.day.dayVal
          this.strategyForm.dayofday_type = this.cycleTimeObj.day.dayType
          break
        case 2:
          this.strategyForm.back_time = this.cycleTimeObj.week.weekTimeVal
          this.strategyForm.content = this.cycleTimeObj.week.weekCheckItems.join(
            ','
          )
          this.strategyForm.dayofday_type = 0
          break
        case 3:
          this.strategyForm.back_time = this.cycleTimeObj.month.monthTimeVal
          this.strategyForm.content = this.cycleTimeObj.month.monthCheckItems.join(
            ','
          )
          this.strategyForm.dayofday_type = 0
          break
      }
    }
    // logBackupFetch(per, current, name) {
    //   console.log('logBackupFetch')
    //   backupLog({
    //     per_page: per,
    //     page: current,
    //     name: name
    //   })
    //     .then((response) => {
    //       console.log('98898', response)
    //       this.backupLogTableData = response.data.data
    //       this.logTotalCount = response.data.total
    //       this.logPageSize = per
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // logSizeChange(val) {
    //   this.logPageSize = val
    //   this.logBackupFetch(val, this.logCurrentPage)
    //   console.log(`每页 ${val} 条`)
    // },
    // logCurrentChange(val) {
    //   this.logCurrentPage = val
    //   this.logBackupFetch(this.logPageSize, val)
    //   console.log(`当前页: ${val}`)
    // }
  }
  // computed: {
  //   dialogTitle() {
  //     console.log('computed')
  //     switch (this.dialogFlag) {
  //       case 'add':
  //         return '创建定时策略'
  //       case 'edit':
  //         return '编辑'
  //       case 'log':
  //         return '日志信息'
  //     }
  //   }
  // }
}
</script>
<style scoped lang="scss" >
.app-container {
  color: white;
  height: auto;
  // overflow: hidden;
  position: relative;
  background: #021132;
  border-radius: 3px;
  border: solid 1px #3755cd;
  margin: 26px 15px 0px 15px;
  padding: 20px;
  opacity: 0.8;
}
.cifsUser-btns > div {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.cifsUser-mgr {
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
  .cifsUser-table {
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

// ---------
.el-button {
  vertical-align: middle;
}
.input-with-search {
  width: 70%;
  margin-left: 30px;
  vertical-align: middle;
}

.el-input-number {
  margin: 0 5px 0 59px;
  width: 220px;
}
.cycleTimeSelect {
  width: 16%;
}
.el-checkbox {
  margin-right: 20px;
}
.el-checkbox-group {
  margin: 0 0 0 10.6%;
}
.el-date-editor {
  margin: 10px 0 0 10.5%;
}
.noclick {
  pointer-events: none;
  user-select: none;
  opacity: 0.2;
}
</style>