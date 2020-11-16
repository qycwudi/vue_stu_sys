<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" @click="URL()"
      >图片URL</el-button
    >
    <el-button
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="clickadd()"
      >上传图片</el-button
    >
    <image-cropper
      v-show="imagecropperShow"
      :width="380"
      :height="300"
      :noCircle="true"
      :noRotate="false"
      :key="imagekey"
      :url="apisss + '/oss/add/storage'"
      field="file"
      @close="close"
      @crop-upload-success="cropSuccess"
    ></image-cropper>

    <el-dialog
      title="图片URL"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-input v-model="Headpath" style="width: 80%"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  name: "EditorSlideUpload",
  data() {
    return {
      imagecropperShow: false,
      Headpath: "",
      listObj: {},
      fileList: [],
      imagekey: 0, //上传组件ID
      apisss: process.env.VUE_APP_BASE_API, //接口API地址
      dialogVisible: false,
    };
  },
  methods: {
    URL() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    clickadd(data) {
      this.imagecropperShow = true;
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.Headpath = data.url;
      this.$message({
        type: "success",
        message: "上传成功,记得复制路径",
      });
      dialogVisible = true;
      //上传成功后重新打开上传组件时初始化组件
      this.imagekey = this.imagekey + 1;
    },
    //关闭上传组件
    close() {
      this.imagecropperShow = false;
      this.imagekey = this.imagekey + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
