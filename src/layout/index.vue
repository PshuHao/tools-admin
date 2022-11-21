<template>
  <div
    :class="classObj"
    class="app-wrapper "
    :style="appBk"
  >
    <div class="head-bar">
      <div class="head-bar-frame">
        <div class="sys-title">
          <span style="font-size:26px">Tools-admin</span>
        </div>
        <!-- <div class="user-info">Avatar</div> -->
        <el-dropdown
          class="avatar-container"
          trigger="click"
        >
          <div class="avatar-wraper">
            <img
              src="../assets/img/avatar.png"
              class="user-avatar"
              alt=""
            >
            <i class="user-name">Admin</i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="modifypwd"> 修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div class="main-warpper">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main />
      </div>
    </div>
    //用户弹窗
    <el-dialog
      title="修改密码"
      :visible.sync="modifypwdDialogVisible"
      @close="dialogClose('passwordForm')"
      width="26%"
    >
      <el-form
        ref="passwordForm"
        :model="passwordForm"
        :rules="passwordRules"
      >
        <el-form-item
          label="原密码"
          :label-width="formLabelWidth"
          prop="oldpassword"
        >
          <el-input
            ref="oldpassword"
            v-model="passwordForm.oldpassword"
            autocomplete="off"
            :type="passwordType"
          ></el-input>
          <span
            class="show-pwd"
            @click="showPwd('oldpassword')"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          prop="newpassword"
        >
          <el-input
            ref="newpassword"
            v-model="passwordForm.newpassword"
            autocomplete="off"
            :type="passwordType"
          ></el-input>
          <span
            class="show-pwd"
            @click="showPwd('newpassword')"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item
          label="重复密码"
          :label-width="formLabelWidth"
          prop="repassword"
        >
          <el-input
            ref="repassword"
            v-model="passwordForm.repassword"
            autocomplete="off"
            :type="passwordType"
          ></el-input>
          <span
            class="show-pwd"
            @click="showPwd('repassword')"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :loading='loading'
          @click="modifypwdDialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submitPwdForm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      const reg = /^[\w]{1,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须为6-20位数字或字母组成'))
      }
    }
    const validateRePassword = (rule, value, callback) => {
      const reg = /^[\w]{6,20}$/

      if (!reg.test(value)) {
        callback(new Error('密码必须为6-20位数字或字母组成'))
      } else if (this.passwordForm.newpassword != value) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      appBk: {
        // backgroundImage: 'url(' + require('@/assets/img/app-bk.png') + ')',
        backgroundImage:
          'url(' + require('@/assets/img/backGround/moon.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      },
      modifypwdDialogVisible: false,
      formLabelWidth: '90px',
      passwordType: 'password',
      passwordForm: {
        oldpassword: '',
        newpassword: '',
        repassword: ''
      },
      passwordRules: {
        oldpassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { required: true, trigger: 'blur', validator: validatePassword },
          // { min: 1, message: '长度必须大于1', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // {
          //   required: true,
          //   trigger: 'blur',
          //   validator: validateRePassword
          // }
        ]
      }
    }
  },
  methods: {
    showPwd(type) {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs[type].focus()
      })
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    modifypwd() {
      this.modifypwdDialogVisible = true
    },
    async logout() {
      // this.$router.push({path:'/login'})
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    dialogClose(formName) {
      this.$resetForm(this, formName)
    },
    submitPwdForm() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.modifypwdDialogVisible = false
          this.$store
            .dispatch(
              'user/modifypwd',
              JSON.parse(JSON.stringify(this.passwordForm))
            )
            .then(() => {
              this.$message('密码修改成功！')
            })
            .catch(err => {
              console.log('submitPwdForm', err)
              this.$message('密码修改失败！')
            })
        } else {
          console.log('error submit!')
          // this.$message('密码修改失败！')

          return false
        }
        this.dialogClose('passwordForm')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

$dark_gray: #889aa4;

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.head-bar {
  height: 80px;
  width: 100%;
  top: 0;
  position: fixed;
  background-image: linear-gradient(
    180deg,
    rgba(2, 17, 50, 0.5) 0%,
    rgba(10, 52, 145, 0.5) 60%,
    rgba(18, 87, 240, 0.5) 100%
  );
  .head-bar-frame {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .sys-title {
      color: #fff;
      font-size: 20px;
      line-height: 80px;
      margin-left: 20px;
    }
    .user-avatar {
      position: relative;
      vertical-align: middle;
    }
    .user-name {
      font-family: Arial, Helvetica, sans-serif;
      font-style: normal;
      font-size: 18px;
      // font-weight: bold;
      color: #5388f2;
      margin: 0 70px 0 0;
      &::before {
        content: "";
        position: absolute;
        top: 39%;
        right: 25%;
        width: 13px;
        height: 13px;
        background: url("../assets/img/arrow-down.png") no-repeat;
        background-size: contain;
      }
    }
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.avatar-wraper {
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 20px;
  }
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
