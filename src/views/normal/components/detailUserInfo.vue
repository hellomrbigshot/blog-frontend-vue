<template>
    <div class="user-info">
        <div class="user-avatar">
            <img :src="imgUrl" alt="头像" class="user-avatar-img" ref="img">
            <div class="user-avatar-btn" @click="chooseFile" v-if="cur_username === username">上传头像</div>
            <input type="file" style="display: none" ref="fileInput" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)"></input>
        </div>
        <div class="user-info-desc">
            <div class="user-info-name">
                <h2>{{ user.username }}</h2>
                <Icon class="gender-icon" size="20" :type="gender_mapping[user.gender].type" :color="gender_mapping[user.gender].color"></Icon>
                <Icon class="edit-icon" size="18" type="edit" color="#ccc" v-if="cur_username === username"></Icon>
            </div>
            <div class="user-info-bio">
                {{ user.bio }}
            </div>
        </div>
        <Modal v-model="showImgUpload" title="更换头像">
            <div class="cropper-content">
                <div class="cropper">
                    <vue-cropper
                        ref="cropper"
                        :img="option.img"
                        :outputType="option.outputType"
                        :autoCrop="option.autoCrop"
                        :full="option.full"
                        :fixedBox="option.fixedBox"
                        :canMode="option.canMove"
                        :original="option.original"
                        :canMoveBox="option.canMoveBox"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixed="option.fixed"
                        @realTime="realTime"
                    ></vue-cropper>
                </div>
                <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </div>
            <div class="footer-btn">
                <div class="scope-btn">
                    <Button type="info" size="small" @click="chooseFile">修改附件</Button>
                    <Button type="primary" size="small" shape="circle" icon="plus"  @click="changeScale(1)"></Button>
                    <Button type="primary" size="small" shape="circle" icon="minus"  @click="changeScale(-1)"></Button>
                    <Button type="primary" size="small" shape="circle" icon="ios-refresh-empty"  @click="rotateRight"></Button>
                </div>
                <div class="upload-btn">
                    <Button type="success" size="small" @click="uploadFile">上传</Button>
                </div>
            </div>
            <div slot="footer">
                
            </div>
            
        </Modal>
    </div>
</template>

<script>
import vueCropper from 'vue-cropper'
import default_img from '@/assets/logo.png'
export default {
    components: {
		vueCropper
	},
    data () {
        return {
            cur_username: this.Cookies.get('user'),
            username: this.$route.params.username,
            showImgUpload: false,
            imgUrl: default_img,
            default_img: default_img,
            user: {
                avatar: '',
                gender: 'm'
            },
            option: {
                img: '',
                outputType: 'png',
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
				autoCropWidth: 150,
				autoCropHeight: 150,
				// 开启宽度和高度比例
                fixed: true,
                fixedNumber: [1, 1],
                full: false,
                canMove: true,
                fixedBox: true,
                canMove: true,
                original: false, 
                canMoveBox: true, 
            },
            previews: {},
            gender_mapping: {
                m: {
                type: 'male',
                color: '#00BFFF'
                },
                f: {
                type: 'female',
                color: '#FF69B4'
                },
                x: {
                type: 'person',
                color: '#cccccc'
                }
            }
        }
    },
    async mounted () {
        await this.getUserDetail()
        this.showAvatar()
    },
    methods: {
        getUserDetail() {
            this.Common.axios('/api/user/detail', { username: this.username }).then(
                res => {
                    if (res.data.code === 'OK') {
                        this.user = res.data.data
                    }
                }
            )
        },
        chooseFile () {
            this.$refs.fileInput.value = ''
            this.$refs.fileInput.click()
        },
        uploadImg (e) {
            let file = e.target.files[0]
            console.log(file)
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$Message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
            let reader = new FileReader()
            reader.onload = (e) => {
                let data
                console.log(e.target)
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                
                this.option.img = data
                
            }
            // 转化为base64
            reader.readAsDataURL(file)
            // 转化为blob
            // reader.readAsArrayBuffer(file)
            this.showImgUpload = true
        },
        realTime (data) {
			this.previews = data
        },
        changeScale (num) {
            this.$refs.cropper.changeScale(num)
        },
        rotateLeft () {
            this.$refs.cropper.rotateLeft()
        },
        rotateRight () {
            this.$refs.cropper.rotateRight()
        },
        uploadFile () {
            // 获取截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                // do something
                console.log(data) 
                this.Common.axios('/api/file/uploadAvatar', { imgData: data, username: this.cur_username })
                    .then(res => {
                        if (res.data.code === 'Ok') {

                        } else {
                            this.$Message.error(res.data.data)
                        }
                    }) 
            })
        },
        showAvatar () {
            this.imgUrl = '/api/file/avatar?filename='+this.user.avatar
            this.$refs.img.onerror = () => {
                this.imgUrl = this.user.oauthinfo ? this.user.oauthinfo.avatar_url: ''
                this.$refs.img.onerror = () => {
                    this.imgUrl = this.default_img
                }
            }
            this.$refs.img.onload = () => {
                this.imgShow = true
            }
        }
    },
    
}
</script>

<style lang="scss" scoped>
.user-info {
  overflow: hidden;
  .user-avatar {
    float: left;
    position: relative;
    .user-avatar-img {
      width: 140px;
      height: 140px;
      padding: 2px;
      border: 2px solid #ccc;
    }
    .user-avatar-btn {
      position: absolute;
      display: none;
      height: 30px;
      line-height: 30px;
      bottom: 5px;
      left: 0;
      right: 0;
      text-align: center;
      background: rgba(245, 245, 245, 0.8);
      &:hover {
        cursor: pointer;
        background: rgba(204, 196, 196, 0.8);
      }
    }
    &:hover {
      .user-avatar-btn {
        display: block;
      }
    }
  }
  .user-info-desc {
    float: left;
    margin-left: 20px;
    .user-info-name {
      color: #555;
      h2 {
        font-size: 26px;
        display: inline;
      }
      .gender-icon {
        margin-left: 5px;
        // margin-bottom: 5px;
      }
      .edit-icon {
        &:hover {
          color: #222 !important;
          cursor: pointer;
        }
      }
    }

    .user-info-bio {
      font-size: 14px;
      margin-top: 15px;
      color: #ccc;
    }
  }
}
.cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .cropper {
        width: 200px;
        height: 200px;
    }
    .show-preview { 
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview {
            overflow: hidden;
            // border-radius: 50%;
            border:1px solid #cccccc;
            background: #cccccc;
            margin-left: 20px;
        }
    }
  }
.footer-btn {
    // margin-top: 20px;
    // .btn-change-img {
    //     margin-left: 15px;
    // }
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .scope-btn{
        width: 200px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .upload-btn{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
    }
}
</style>
