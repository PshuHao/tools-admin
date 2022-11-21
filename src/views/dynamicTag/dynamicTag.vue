<template>
  <div class="tag-container">
    <!-- 动态tag框（可双击修改，点击+号添加） -->
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      :disable-transitions="true"
      @close="handleClose(tag)"
      closable
    >
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
      v-else
      class="button-new-tag"
      size="small"
      @click="showInput"
    >+</el-button>
  </div>
</template>

<script>
export default {
  name: 'tag',
  data() {
    return {
      dynamicTags: ['TAG', 'TAG2'],
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    this.initTag()
  },
  methods: {
    initTag() {
      this.$nextTick(() => {
        this.tags = document.querySelectorAll('.el-tag--light')
        this.tags.forEach((item, index) => {
          item.index = index
          item.ondblclick = this.editTag
        })
      })
    },
    editTag(e) {
      const str = e.target.innerText.replace(/\s*/g, '')
      window.getSelection
        ? window.getSelection().removeAllRanges()
        : document.selection.empty()
      e.target.innerHTML = `<input type="text" value="${str}">`
      const input = e.target.children[0]
      input.select()
      input.onblur = (event) => {
        event.target.parentNode.innerHTML =
          event.target.value + '<i class="el-tag__close el-icon-close"></i>'
        const arr = this.dynamicTags.map((val) =>
          val == str ? event.target.value : val
        )
        this.dynamicTags = arr
      }
      input.onkeyup = (e) => {
        if (e.keyCode == 13) {
          e.target.parentNode.innerText = e.target.value
        }
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleInputConfirm() {
      if (this.dynamicTags.includes(this.inputValue)) {
        this.inputVisible = false
        this.inputValue = ''
        this.$message({
          message: '无法增加重复命名',
          type: 'warning'
        })
        return
      }
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.initTag()
    },
    handleInputConfirm() {
      if (this.dynamicTags.includes(this.inputValue)) {
        this.inputVisible = false
        this.inputValue = ''
        this.$message({
          message: '无法增加重复命名',
          type: 'warning'
        })
        return
      }
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.initTag()
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  &-container {
    width: 500px;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    overflow: hidden;
    position: relative;
    background: #021132;
    // box-shadow: 0 1px 4px rgba(0,21,41,.08);
    border-radius: 3px;
    border: solid 1px #3755cd;
    opacity: 0.8;
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    ::v-deep .el-tag--light {
      position: relative;
      width: 46%;
      margin: 0 0 20px 0;
      input {
        width: 100%;
      }
      .el-tag__close {
        position: absolute;
        top: 25%;
        right: 3%;
      }
    }
    .el-button {
      width: 46px;
    }
  }
}
</style>
