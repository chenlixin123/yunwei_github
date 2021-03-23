<style scoped lang="less">
.box {
  width: 100%;
  min-width: 1000px;
  box-sizing: border-box;
  margin: 24px;
}
.title {
  width: 99%;
  height: 10%;
  margin: 0 auto;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 2%;
  padding-right: 3%;
}
.list-goods-list {
  &-item {
    text-align: center;
    position: relative;
    img {
      width: 100%;
    }
    .ivu-tag {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    &-title {
      font-size: 16px;
      font-weight: bold;
      margin: 8px 0;
    }
    &-btn {
      width: 100%;
      height: 40px;
      // position: relative;
      // border: 1px solid#eee;
      background: white;
      .btn_left {
        border: none;
        width: 50%;
        height: 40px;
        border-right: 2px solid #eee;
        border-top: 2px solid #eee;
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
      .btn_right {
        border: none;
        width: 50%;
        height: 40px;
        border-top: 2px solid #eee;
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
}
.bottom_btn {
  width: 100%;
  text-align: right;
  padding-right: 5%;
  padding-top: 10px;
  button {
    height: 40px;
    width: 10%;
  }
  &_left {
    margin-right: 5%;
  }
}
.user_label {
  display: inline-block;
  width: 70px;
  text-align-last: justify;
}
.module_divs {
  width: 100%;
  margin-bottom: 10px;
  padding-left: 1%;
  // border: 1px solid red;
}
.span_else {
  margin-left: 10px;
}
.preservation_btn {
  width: 10%;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: 5%;
}
.plan_img {
  // border: 1px solid;
  width: 100%;
}
.Upload {
  display: flex;
  align-items: center;
  position: relative;
}
.img_title {
  // border: 1px solid;
  width: 100%;
  // position: absolute;
  // right: 0;
  // bottom: 0;
}
.img_delete {
  margin-left: 5%;
  margin-right: 5%;
  color: red;
  cursor: pointer;
}
.mansion_btn1 {
  width: 25%;
}
.mansion_btn2 {
  width: 25%;
  margin-left: 5%;
}
.mansion_btn {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="box">
    <Card :bordered="false">
      <p slot="title">地图管理</p>
      <!-- 车场名称 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">车场名称</label> :
        <span class="span_else">{{ name }}</span>
      </div>
      <!-- 层数 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">层数</label> :
        <span class="span_else">{{ floorNumber }}</span>
      </div>

      <!-- 车位总数 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">车位总数</label> :
        <span class="span_else">{{ totalStallNum }}</span>
      </div>
    </Card>
    <Card :bordered="false" style="margin-top: 10px">
      <p slot="title">车场模型</p>
      <!-- 地图Token -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">地图Token</label> :
        <Select
          v-model="mapToken"
          clearable
          @on-select="token_change"
          @on-clear="token_clear"
          style="width: 15%; margin-left: 10px"
        >
          <Option
            v-for="(item, index) in maplist"
            :value="item.mapToken"
            :key="index"
            >{{ item.mapToken }}</Option
          >
        </Select>
        <!-- <span class="span_else">车场名称</span> -->
      </div>

      <!-- 地图ID -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">地图ID</label> :
        <span class="span_else">{{ mapId }}</span>
      </div>

      <!-- 建筑名称 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">建筑名称</label> :
        <span class="span_else">{{ mapName }}</span>
      </div>
      <Button
        class="preservation_btn"
        :loading="preservation_loading"
        @click="preservation"
        type="primary"
        >保存</Button
      >
    </Card>

    <div class="ivu-mt">
      <div style="position: relative; height: 100px" v-if="loading">
        <Spin fix size="large"></Spin>
      </div>
      <Row :gutter="24">
        <Col
          v-for="(item, index) in data"
          :key="index"
          :xxl="6"
          :xl="8"
          :lg="8"
          :md="12"
          :sm="24"
          :xs="24"
          class="ivu-mb"
        >
          <Card :bordered="false" class="list-goods-list-item">
            <!-- <Tag color="green">推荐</Tag> -->
            <img :src="item.planeUrl" alt="planeUrl" />
            <div class="list-goods-list-item-title">{{ item.remark }}</div>
            <div class="list-goods-list-item-btn">
              <Button class="btn_left" @click="plan_edit(item)">编辑</Button>
              <Button class="btn_right" @click="plan_delete(item)">删除</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <div class="bottom_btn">
      <Button class="bottom_btn_left" type="primary" @click="add_plan"
        >添加平面图</Button
      >
      <Button class="bottom_btn_right" type="primary" @click="back"
        >返回</Button
      >
    </div>

    <Modal
      :title="edit_title"
      v-model="edit_modal"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="edit_cancle">取消</Button>
        <Button @click="edit_ok" type="primary" :loading="edit_loading"
          >确定</Button
        >
      </div>

      <div style="padding-left: 5px">
        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车场名称</label>:
          <!-- <i-input
            v-if="edit_title == '新增基础模板'"
            v-model="edit_data.gateName"
            placeholder="请输入模板分辨率"
            style="width: 70%; margin-left: 10px"
          ></i-input> -->
          <span style="width: 70%; margin-left: 10px">{{
            edit_data.gateName
          }}</span>
        </div>
        <!-- 图片上传 -->
        <div class="module_divs">
          <Upload
            class="Upload"
            ref="upload"
            :headers="headers"
            :data="up_data"
            name="file"
            :with-credentials="true"
            :before-upload="handleUpload"
            :show-upload-list="false"
            :on-success="uploadSuccess"
            action="/api/api/common/attach/image_upload"
          >
            <Button class="mansion_btn" icon="ios-cloud-upload-outline"
              >浏览</Button
            >
          </Upload>
          <img class="plan_img" :src="img_url" alt="" />
          <div class="img_title" v-for="(item, index) in file" :key="index">
            <span v-if="image_show == true">文件名称：{{ item.name }}</span>
            <span
              v-if="image_show == true"
              class="img_delete"
              @click="deleteFile"
              >X</span
            >
            <Button
              v-if="image_show == true"
              class="mansion_btn1"
              @click="upload"
              :loading="upload_loading"
              >上传</Button
            >
            <!-- <Button
              v-if="downbtn_show == true"
              class="mansion_btn2"
              @click="download"
              :loading="upload_loading"
              >下载</Button
            > -->
          </div>
        </div>
        <!-- 描述 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">描述</label>:
          <i-input
            v-model="edit_data.remark"
            placeholder="描述"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  // 地图token下拉框
  Administration_biz_prefecture_mode_list,
  //更新地图token
  Administration_biz_prefecture_mode_update,
  //车场平面图列表
  Administration_biz_prefecture_plane_list,
  //新增平面图
  Administration_biz_prefecture_plane_save,
  //更新平面图
  Administration_biz_prefecture_plane_update,
  //删除平面图
  Administration_biz_prefecture_plane_delete,
} from "@/api/Administration";
export default {
  data() {
    return {
      downfile_url: "",
      downbtn_show: false,
      up_data: {},
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      img_url: "",
      preservation_loading: false,
      name: "",
      floorNumber: "",
      totalStallNum: "",
      Parking_data: {},
      mapToken: "",
      mapId: "",
      mapName: "",
      maplist: [],
      edit_data: {},
      edit_loading: false,
      edit_title: "",
      edit_modal: false,
      loading: false,
      data: [],
      image_show: false,
      file: [],
      uploadFile: [],
      upload_loading: false,
      planeUrl: "",
      edit_id: "",
    };
  },
  created() {
    this.refresh();
    this.name = this.$route.query.name;
    this.floorNumber = this.$route.query.floorNumber;
    this.totalStallNum = this.$route.query.totalStallNum;

    Administration_biz_prefecture_mode_list().then((res) => {
      this.maplist = res;
      this.mapToken = this.$route.query.mapToken;
      this.mapId = this.$route.query.mapId;
      this.mapName = this.$route.query.mapName;
    });
  },
  methods: {
    // 刷新车场平面图列表
    refresh() {
      this.loading = true;
      Administration_biz_prefecture_plane_list({
        preId: this.$route.query.id,
      }).then((res) => {
        this.data = res;
        this.loading = false;
      });
    },
    //下拉框改变
    token_change(e) {
      this.maplist.map((res) => {
        if (res.mapToken == e.label) {
          this.mapToken = res.mapToken;
          this.mapId = res.mapId;
          this.mapName = res.mapName;
        }
      });
    },
    //下拉框清除
    token_clear() {
      this.mapToken = "";
      this.mapId = "";
      this.mapName = "";
    },
    //保存
    preservation() {
      this.preservation_loading = true;
      Administration_biz_prefecture_mode_update({
        id: this.$route.query.id,
        mapId: this.mapId,
        mapToken: !this.mapToken ? "" : this.mapToken,
        mapName: this.mapName,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          Administration_biz_prefecture_mode_list().then((res) => {
            this.maplist = res;
            this.mapToken = this.$route.query.mapToken;
            this.mapId = this.$route.query.mapId;
            this.mapName = this.$route.query.mapName;
          });
        }
        this.preservation_loading = false;
      });
    },
    //添加平面图
    add_plan() {
      this.edit_title = "新增平面图";
      this.edit_modal = true;
      this.downbtn_show = false;
      this.edit_data.gateName = this.$route.query.name;
      this.edit_data.remark = "";
      this.deleteFile();
    },
    //平面图编辑
    plan_edit(val) {
      this.edit_title = "编辑平面图";
      this.edit_id = val.id;
      this.image_show = false;
      this.downbtn_show = true;
      this.edit_modal = true;
      this.edit_data.gateName = this.$route.query.name;
      this.img_url = val.planeUrl;
      this.planeUrl = val.planeUrl;
      this.edit_data.remark = val.remark;
    },
    //返回上一页
    back() {
      this.$Modal.confirm({
        title: "返回",
        onOk: () => {
          this.$router.go(-1);
        },
        onCancel: () => {},
      });
    },
    //弹出框取消
    edit_cancle() {
      this.edit_modal = false;
      this.upload_loading = false;
      this.edit_loading = false;
    },
    //弹出框保存
    edit_ok() {
      this.edit_loading = true;
      if (this.edit_title == "新增平面图") {
        Administration_biz_prefecture_plane_save({
          preId: this.$route.query.id,
          planeUrl: this.planeUrl,
          remark: this.edit_data.remark,
        }).then((res) => {
          if (res.success == true) {
            this.edit_modal = false;
            this.refresh();
            this.$Notice.success({
              title: "系统提示",
              desc: res.content,
            });
          } else {
            this.$Notice.error({
              title: "系统提示",
              desc: res.content,
            });
          }
          this.edit_loading = false;
        });
      } else if (this.edit_title == "编辑平面图") {
        Administration_biz_prefecture_plane_update({
          id: this.edit_id,
          preId: this.$route.query.id,
          planeUrl: this.planeUrl,
          remark: this.edit_data.remark,
        }).then((res) => {
          if (res.success == true) {
            this.edit_modal = false;
            this.refresh();
            this.$Notice.success({
              title: "系统提示",
              desc: res.content,
            });
          } else {
            this.$Notice.error({
              title: "系统提示",
              desc: res.content,
            });
          }
          this.edit_loading = false;
        });
      }
    },
    //平面图删除
    plan_delete(val) {
      this.downbtn_show = false;
      this.$Modal.confirm({
        title: "删除",
        onOk: () => {
          Administration_biz_prefecture_plane_delete({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.refresh();
              this.$Notice.success({
                title: "系统提示",
                desc: res.content,
              });
            } else {
              this.$Notice.error({
                title: "系统提示",
                desc: res.content,
              });
            }
          });
        },
        onCancel: () => {},
      });
    },
    //上传文件的钩子
    handleUpload(file) {
      this.file = [];
      // 删除需要上传文件数据里的当前文件
      this.uploadFile = [];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const _base64 = reader.result;
        this.img_url = _base64; //将_base64赋值给图片的src，实现图片预览
      };
      // 上传文件前的事件钩子
      // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
      let keyID = Math.random().toString().substr(2);
      file["keyID"] = keyID;
      // 保存文件到总展示文件数据里
      this.file.push(file);
      // 保存文件到需要上传的文件数组里
      this.uploadFile.push(file);
      this.image_show = true;
      // 返回 falsa 停止自动上传 我们需要手动上传
      return false;
    },
    // 上传文件
    upload() {
      this.upload_loading = true;
      this.up_data.id = "";
      for (let i = 0; i < this.uploadFile.length; i++) {
        const item = this.file[i];
        this.$refs.upload.post(item);
      }
    },
    // 下载图片
    download() {
      // window.location.href =
      //   "http://oss.linkmoretech.cn/image/2020/10/10/302_max.png";
    },
    // 删除图片
    deleteFile() {
      this.image_show = false;
      // 删除文件
      // 删除总展示文件里的当前文件
      this.file = [];
      // 删除需要上传文件数据里的当前文件
      this.uploadFile = [];
      this.img_url = "";
      this.planeUrl = "";
    },
    //上传成功的回调
    uploadSuccess(res, file, fileList) {
      // 文件上传回调 上传成功后删除待上传文件
      if (res.success == true) {
        this.img_url =
          "http://oss.linkmoretech.cn/" + res.map.attach.compressUrl;
        this.planeUrl =
          "http://oss.linkmoretech.cn/" + res.map.attach.compressUrl;
        this.$Notice.success({
          title: "系统提示",
          desc: res.content,
        });
        this.image_show = false;
      } else {
        this.$Notice.error({
          title: "系统提示",
          desc: res.content,
        });
        this.image_show = true;
      }
      this.upload_loading = false;
    },
  },
};
</script>