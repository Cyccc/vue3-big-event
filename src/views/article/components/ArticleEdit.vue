<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article'
import { baseURL } from '@/utils/request'

const visibleDrawer = ref(false)
const editorRef = ref()

const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({
  ...defaultForm
})

const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  // 用原生方法生成url URL.createObjectURL
  // 用于预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 添加进formModel 便于后续上传
  formModel.value.cover_img = uploadFile.raw
}

// 提交
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  // 需要转换成formData对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    // 编辑
    await artEditService(fd)
    ElMessage.success('修改成功')

    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加
    await artPublishService(fd)
    ElMessage.success('添加成功')

    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 打开抽屉
const open = async (row) => {
  visibleDrawer.value = true
  console.log(row)
  // 编辑
  if (row.id) {
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    // 由于后台服务器的图片需要是file对象格式, 需要单独转换
    const file = await convertImageUrlToFile(imgUrl.value)
    formModel.value.cover_img = file
  } else {
    // 新增
    formModel.value = {
      ...defaultForm
    }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}
async function convertImageUrlToFile(imageUrl) {
  try {
    // 使用 fetch 函数获取图片数据
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // 创建一个新的 File 对象
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

    return file
  } catch (error) {
    console.error('Error converting image URL to File:', error)
    return null
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
