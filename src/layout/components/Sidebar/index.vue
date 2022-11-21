<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  created() {
    // console.log('this.sidebar.opened', this.sidebar.opened)
    // // 更换路由meta中的icon
    // if (this.sidebar.opened) {
    //   this.$nextTick(() => {
    //     const noDropdownList = document.querySelectorAll(
    //       '.submenu-title-noDropdown'
    //     )
    //     const submenuList = document.querySelectorAll('.el-submenu__title')
    //     console.log(noDropdownList, submenuList)
    //     noDropdownList.forEach((item, index) => {
    //       const newNode = document.createElement('span')
    //       newNode.classList.add('navitem-icon-' + index.toString())
    //       item.insertBefore(newNode, item.childNodes[0])
    //     })
    //     submenuList.forEach((value, index) => {
    //       const newNode = document.createElement('span')
    //       newNode.classList.add(
    //         'navitem-icon-' + (index + noDropdownList.length).toString()
    //       )
    //       value.insertBefore(newNode, value.childNodes[0])
    //     })
    //   })
    // }
    // this.$store.dispatch('user/getSysInfo')
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      const routes = this.$router.options.routes
      // routes.find((value, index, arr) => {
      //   if (value.name == 'Sysconfig') {
      //     arr[index].children.splice(
      //       arr[index].children.findIndex((item) => item.name == 'IpSetup'),
      //       1
      //     )
      //   }
      // })

      // const firstIndex = routes.findIndex((e) => e.name == 'Sysconfig')
      // routes[firstIndex].children.splice(
      //   routes[firstIndex].children.findIndex((v) => v.name == 'IpSetup'),
      //   1
      // )

      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse(flag) {
      return !this.sidebar.opened
    }
  }
}
</script>
<style >
</style>
