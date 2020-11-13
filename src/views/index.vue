<template>
  <div class="main index-main">
    <div class="main-content">
      <mus-header :select-nav="'home'"></mus-header>
      <!-- banner轮播图 -->
      <div class="banner">
        <el-row>
          <el-col :span="24">
            <el-carousel height="460px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel">
                  {{ item }}
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </div>
      <!-- 公司需求 -->
      <div class="demand">
        <div class="demand-main">
          <div class="title">
            <div class="left">
              <i class="icon gsxq mr15"></i>
              <i class="icon icon-gsxq"></i>
            </div>
            <div class="right">
              <span class="more" @click="Go('/demand')">查看更多 ></span>
            </div>
          </div>
          <div class="demand-list">
            <div class="list-head">
              <div class="left"></div>
              <div class="right">
                <div class="list-title">
                  帖子标题帖子标题帖子标题帖子标题帖子标题
                  帖子标题帖子标题帖子标题
                </div>
                <div class="list-text ellipsis2">
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                </div>
              </div>
            </div>
            <div class="list-head">
              <div class="left"></div>
              <div class="right">
                <div class="list-title">
                  帖子标题帖子标题帖子标题帖子标题帖子标题
                  帖子标题帖子标题帖子标题
                </div>
                <div class="list-text ellipsis2">
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                </div>
              </div>
            </div>
            <div v-for="item in 4" :key="item" class="lists">
              <div class="list">
                <i class="icon list-icon"></i>
                <span class="text ellipsis1">帖子标题帖子标题帖子标题帖子标题帖子</span>
              </div>
              <div class="list">
                <i class="icon list-icon"></i>
                <span class="text ellipsis1">帖子标题帖子标题帖子标题帖子标题帖子</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 精品推荐 -->
      <div class="recommend">
        <div class="recommend-main">
          <div class="title">
            <div class="left">
              <i class="icon jptj mr15"></i>
              <i class="icon icon-jptj"></i>
            </div>
            <div class="right">
              <span class="more">查看更多 ></span>
            </div>
          </div>
          <div class="recommend-list">
            <div v-for="(item,index) in 8" :key="index" class="list">
              <div class="img">
                <img src="@/assets/images/test.jpg" />
              </div>
              <div class="content">
                <div class="name">歌曲名称歌曲名称</div>
                <div class="author">
                  <div class="w15">
                    <span class="title">词作者：</span>
                    <span class="text">李珍珍</span>
                  </div>
                  <div class="flex-1">
                    <span class="title">曲作者：</span>
                    <span class="text">Lydia</span>
                  </div>
                </div>
                <div class="style">
                  <div class="style-list">风格1</div>
                  <div class="style-list">风格2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新上传 -->
      <div class="new-upload pb50">
        <div class="new-upload-main">
          <div class="title">
            <div class="left">
              <i class="icon zxsc mr15"></i>
              <i class="icon icon-zxsc"></i>
            </div>
            <div class="right">
              <span class="more">查看更多 ></span>
            </div>
          </div>
          <div class="new-upload-list">
            <table cellspacing="0" cellpadding="0" class="table-list">
              <thead>
                <tr>
                  <th class="text-center w10">序号</th>
                  <th class="text-left" style="min-width:100px;">歌曲名</th>
                  <th class="text-left" style="min-width:100px;">词作者</th>
                  <th class="text-left" style="min-width:100px;">曲作者</th>
                  <th class="text-center" style="min-width:100px;">试听</th>
                  <th class="text-center" style="min-width:100px;">购买</th>
                  <th class="text-center" style="min-width:100px;">添加到自有库</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in 9" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-left">稻香《原声》</td>
                  <td class="text-left">周杰伦</td>
                  <td class="text-left">周杰伦</td>
                  <td class="text-center">
                    <i class="icon icon-hear"></i>
                  </td>
                  <td class="text-center">
                    <i class="icon icon-cart"></i>
                  </td>
                  <td class="text-center">
                    <i class="icon icon-add"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .main{
    .main-content{
      .banner{
        .carousel{
          width:100%;
          height:100%;
          background-size: cover;
          background-position: center center;
          background-image:url('~@/assets/images/index/banner.png');
        }
      }
      .demand{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center 146px;
        background-image:url('~@/assets/images/index/index-bg-3.png');
        .demand-main{
          width:1080px;
          margin: 0 auto;
          .title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .gsxq{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/gsxq.png');
              }
              .icon-gsxq{
                width:40px;
                height:40px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-gsxq.png');
              }
            }
            .right{
              .more{
                padding-right: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #999999;
                &:hover{
                  text-decoration:underline;
                }
              }
            }
          }
          .demand-list{
            padding:10px;
            margin-top:18px;
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .list-head{
              width:460px;
              padding:20px;
              height:100px;
              background-color: #f8f8f8;
              border-radius: 6px;
              display:flex;
              .left{
                width:100px;
                height:100px;
                margin-right:32px;
                border-radius: 6px;
                background-size: cover;
                background-repeat: no-repeat;
                background-image:url('~@/assets/images/test.jpg');
              }
              .right{
                flex:1;
                display:flex;
                flex-direction: column;
                .list-title{
                  font-family: PingFangSC-Regular;
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 0px;
                  color: #333333;
                  margin-bottom:16px;
                }
                .list-text{
                  flex:1;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #999999;
                  overflow: hidden;
                }
              }
            }
            >.lists{
              width:100%;
              display:flex;
              flex-wrap:wrap;
              justify-content: space-between;
              >.list{
                width: 500px;
                height: 60px;
                border-radius: 6px;
                display:flex;
                align-items:center;
                // &.active{
                //   background-color: #f8f8f8;
                // }
                .list-icon{
                  margin-left:20px;
                  margin-right:10px;
                  width: 30px;
                  height: 30px;
                  border-radius: 2px;
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-image:url('~@/assets/images/test.jpg');
                }
                >.text{
                  flex:1;
                  font-size: 16px;
                  line-height: 24px;
                  color: #333333;
                }
              }
            }
            .lists:nth-child(even){
              >.list{
                background-color: #f8f8f8;
              }
            }
          }
        }
      }
      .recommend{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image:url('~@/assets/images/index/index-bg-2.png');
        .recommend-main{
          width:1080px;
          margin: 0 auto;
          >.title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .jptj{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/jptj.png');
              }
              .icon-jptj{
                width:44px;
                height:45px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-jptj.png');
              }
            }
            .right{
              .more{
                padding-right: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #999999;
                &:hover{
                  text-decoration:underline;
                }
              }
            }
          }
          .recommend-list{
            margin-top:18px;
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .list{
              width:500px;
              height: 136px;
              // box-shadow: 0px 5px 15px 0px  rgba(255, 174, 0, 0.6);
              border-radius: 10px;
              display:flex;
              // background-color: #FFF;
              align-items:center;
              >.img{
                margin-left:26px;
                margin-right:30px;
                width: 100px;
                height: 100px;
                background-color: #eeeeee;
                border-radius: 6px;
                >img{
                  width:100%;
                  height:100%;
                  border-radius: 6px;
                }
              }
              >.content{
                padding:18px 0;
                height:calc(100% - 36px);
                display:flex;
                flex-direction:column;
                justify-content: space-between;
                >.name{
                  font-size: 18px;
                  color: #333333;
                }
                >.author{
                  display:flex;
                  .title{
                    font-size: 12px;
                    color: #999999;
                  }
                  .text{
                    font-size: 14px;
                    color: #333333;
                  }
                }
                >.style{
                  display:flex;
                  .style-list{
                    padding:7px 16px;
                    margin-right:10px;
                    border: solid 1px #cccccc;
                    border-radius: 26px;
                    font-size: 12px;
                    color: #999999;
                  }
                }
              }
              &:hover{
                cursor: pointer;
                box-shadow: 0px 5px 15px 0px  rgba(255, 174, 0, 0.6);
                background-color: #FFF;
                >.content{
                  >.style{
                    .style-list{
                      background-color:#fff9e2;
                      border: 1px solid #fff9e2;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // 最新上传
      .new-upload{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image:url('~@/assets/images/index/index-bg-1.png');
        .new-upload-main{
          width:1080px;
          margin: 0 auto;
          >.title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .zxsc{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/zxsc.png');
              }
              .icon-zxsc{
                width:49px;
                height:35px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-zxsc.png');
              }
            }
            .right{
              .more{
                padding-right: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #999999;
                &:hover{
                  text-decoration:underline;
                }
              }
            }
          }
          >.new-upload-list{
            >.table-list{
              width:100%;
              th,td{
                height:60px;
                line-height:60px;
                // display:flex;
                // align-items:center;
                font-size: 14px;
              }
              >thead{
                th{
                  color: #999999;
                }
              }
              >tbody{
                td{
                  color: #333333;
                }
                tr:nth-child(odd){
                  background-color: #f8f8f8;
                }
              }
            }
            .icon-hear{
              width:24px;
              height:16px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-hear.png');
            }
            .icon-add{
              width:19px;
              height:18px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-add.png');
            }
            .icon-cart{
              width:23px;
              height:20px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-cart.png');
            }
          }
        }
      }
    }
  }
</style>

