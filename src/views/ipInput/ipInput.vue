<template>
  <div class="ip-container">
    <input
      id="ip-0"
      type="text"
      v-model="ipArr[0]"
      @input="ipinput('ip',0)"
      @keydown="keydownHandle('ip',0,$event)"
    />
    <span>.</span>
    <input
      id="ip-1"
      type="text"
      v-model="ipArr[1]"
      @input="ipinput('ip',1)"
      @keydown="keydownHandle('ip',1,$event)"
    />
    <span>.</span>
    <input
      id="ip-2"
      type="text"
      v-model="ipArr[2]"
      @input="ipinput('ip',2)"
      @keydown="keydownHandle('ip',2,$event)"
    />
    <span>.</span>
    <input
      id="ip-3"
      type="text"
      v-model="ipArr[3]"
      @input="ipinput('ip',3)"
      @keydown="keydownHandle('ip',3,$event)"
    />
  </div>
</template>

<script>
export default {
  name: 'IpInput',
  props: {
    ipVal: {
      type: String,
      default: '192.168.0.1'
    }
  },
  data() {
    return {
      ipArr: []
    }
  },
  created() {
    this.ipArr = this.ipVal.split('.')
    console.log(this.ipArr)
  },
  methods: {
    ipinput(key, index) {
      // 强制input只能输入小于等于255的数字
      this.ipArr[index] =
        this.ipArr[index].replace(/[^\d]/g, '') > 255
          ? 255
          : this.ipArr[index].replace(/[^\d]/g, '')

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
      this.$emit('ipInputChange', 'ip', this.ipArr.join('.'))
    },
    //监听键盘事件
    keydownHandle(key, index, event) {
      console.log(document.getElementById(key + '-' + index))
      const valLength = document.getElementById(key + '-' + index).value.length
      const selectionStart = document.getElementById(key + '-' + index)
        .selectionStart
      if (event.keyCode == 39 && index < 3 && selectionStart == valLength) {
        document.getElementById(key + '-' + (index + 1)).focus()
      }
      if (event.keyCode == 37 && index > 0 && selectionStart == 0) {
        document.getElementById(key + '-' + (index - 1)).focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ip {
  &-container {
    width: 266px;
    // margin: 50px auto;
    padding: 10px;
    display: flex;
    align-items: center;
    color: white;
    overflow: hidden;
    position: relative;
    background: #021132;
    border-radius: 3px;
    border: solid 1px #3755cd;
    opacity: 0.8;
    input {
      width: 60px;
      background: rgba(0, 0, 0, 0);
      border: none;
      color: #fff;
      text-align: center;
      outline: none;
      line-height: 26px;
    }
  }
}
</style>
