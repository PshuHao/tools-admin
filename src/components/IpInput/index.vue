<template>
  <div class="ip-inputs">
    <el-input
      v-for="(value,num) in ipData[0]"
      :key="num"
      :id="ipData[1] + '-' + num"
      v-model="ipData[0][num]"
      @input="input(ipData[1],num)"
      @keydown.native="keydown(ipData[1],num,$event)"
    ></el-input>
  </div>
</template>
<script>
export default {
  name: 'IpInput',
  props: {
    ipData: {
      type: Array,
      default: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.ipData)
  },
  methods: {
    input(key, index) {
      this.$emit('ipinut', key, index)
    },
    keydown(key, index, event) {
      console.log(key, index, event)
      this.$emit('keydownHandle', key, index, event)
    }
    // ipinput(key, index) {
    //   console.log('ipinput', key, index)
    //   // 强制input只能输入小于等于255的数字
    //   this.ipForm[key][index] =
    //     this.ipForm[key][index].replace(/[^\d]/g, '') > 255
    //       ? 255
    //       : this.ipForm[key][index].replace(/[^\d]/g, '')

    //   // 自动换框
    //   if (document.getElementById(key + '-' + index).value.length == 3) {
    //     // 当前输入框3位满了以后光标自动跳到下一个输入框
    //     const nextInput = index + 1
    //     if (nextInput != 4) {
    //       // 最后一格满了以后不会继续往后跳
    //       // const nextItem = val.replace(/\d/gi, nextInput)
    //       document.getElementById(key + '-' + nextInput).focus()
    //     }
    //   }

    //   if (document.getElementById(key + '-' + index).value.length == 0) {
    //     // 当前输入框无内容时光标自动跳到上一个输入框
    //     const lastInput = index - 1
    //     if (lastInput != -1) {
    //       // 第一格无内容以后不会继续往前跳
    //       // const lastItem = val.replace(/\d/gi, lastInput)
    //       document.getElementById(key + '-' + lastInput).focus()
    //     }
    //   }
    // },
    // keydownHandle(key, index, event) {
    //   // console.log(document.getElementById(key + '-' + index))
    //   const valLength = document.getElementById(key + '-' + index).value.length
    //   const selectionStart = document.getElementById(
    //     key + '-' + index
    //   ).selectionStart
    //   if (event.keyCode == 39 && index < 3 && selectionStart == valLength) {
    //     document.getElementById(key + '-' + (index + 1)).focus()
    //   }
    //   if (event.keyCode == 37 && index > 0 && selectionStart == 0) {
    //     document.getElementById(key + '-' + (index - 1)).focus()
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.ip-inputs {
  display: flex;
}
</style>
