<script setup>
import { ref } from 'vue'
// 图标需要手动导入
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  console.log(res)
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
console.log(channelList.value)

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除该分类么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <!-- 主体表格 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 空数据处理 -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 弹层 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
