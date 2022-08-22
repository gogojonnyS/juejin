<template>
    <div class="outer">
        <div class="container">
            <!-- 掘金图标开始-->
            <div>
                <a href="javascript:;"><img src="../assets/xitujuejin.png" alt="加载失败" /></a>
            </div>
            <!-- 掘金图标开始结束-->
            <!-- 导航部分开始 -->
            <nav style="display:flex;justify-content: space-between;">
                <!-- 左侧导航列表部分开始 -->
                <ul class="top-nav" v-if="windowWidth == '>1190'">
                    <li>
                        <router-link exact to="/">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/pins">沸点</router-link>
                    </li>
                    <li>
                        <router-link to="/course">课程</router-link>
                    </li>
                    <li>
                        <router-link to="/live">直播</router-link>
                    </li>
                    <li>
                        <router-link to="/event">活动</router-link>
                    </li>
                    <ul class="others">
                        <li><a href="javascript:;">商城</a></li>
                        <li>
                            <a href="javascript:;">APP</a>
                        </li>
                        <li>
                            <a href="javascript:;">插件</a>
                        </li>
                    </ul>
                </ul>
                <!-- 左侧导航列表部分结束 -->
                <div style="width: 0;"></div>
                <!-- 右侧组件部分开始 -->
                <ul class="right">
                    <ul>
                        <!-- 搜索框开始 -->
                        <search class="search"></search><!-- 搜索框结束 -->
                        <!-- 下拉菜单开始 -->
                        <scrollMenu class="scrollMenu" v-if="windowWidth !== '<800'"></scrollMenu><!-- 下拉菜单结束 -->
                    </ul>
                    <!-- 会员开始 -->
                    <li class="vip">
                        <a href="javascript:;"><img src="../assets/vip.png" alt="加载失败" /><span>会员</span></a>
                    </li>
                    <!-- 会员结束 -->
                    <!-- 消息提醒开始 -->
                    <li>
                        <el-button size="mini" type="info" icon="el-icon-message-solid" circle></el-button>
                    </li>
                    <!-- 消息提醒结束 -->
                    <!-- 头像开始 -->
                    <li class="me">
                        <img src="../assets/touxiang.png" alt="加载失败" />
                    </li>
                    <!-- 头像结束 -->
                </ul>
                <!-- 右侧组件部分结束 -->
            </nav>
        </div>
    </div>
</template>

<script>
import search from "./search"; //引入搜索框
import scrollMenu from "./scrollMenu"; //引入下拉菜单
export default {
    data() {
        return {
            windowWidth: ">1190",

        }
    },
    components: {
        search,
        scrollMenu,
    },
    methods: {
        debounce(fn, delay) {
            let timer;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn();
                }, delay);
            }
        },
        toggleTopBar() {
            const windowInfo = {
                width: window.innerWidth,
                hight: window.innerHeight
            }
            console.log(windowInfo);
            if (windowInfo.width < 1190 && windowInfo.width > 800) {
                this.windowWidth = "<1190"
            } else if (windowInfo.width < 800) {
                this.windowWidth = "<800"
            } else {
                this.windowWidth = ">1190"
            }
        }
    },
    created() {
        addEventListener('resize', this.debounce(this.toggleTopBar, 500))
    },
    mounted() {
        addEventListener('resize', this.debounce(this.toggleTopBar, 500))
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.debounce(this.toggleTopBar, 500));
    }
};
</script>

<style lang='less' scoped>
.outer {
    display: flex;
    align-items: center;
    height: 55px;
    border-bottom: 1px solid #efeded;

    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 93%;
        margin: 0 auto;

        div {
            margin-left: 12px;
            margin-right: 22px;
            width: 100px;

            a {
                img {
                    margin: 0 auto;
                    // margin-top: 16px;
                    width: 100px;
                }
            }
        }

        nav {
            display: flex;
            justify-content: space-between;
            flex: 9;

            .top-nav {
                display: flex;
                background: #ffffff;

                li {
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                    width: 48px;
                    height: 54px;

                    a {
                        height: 54px;
                        display: block;
                        line-height: 53px;
                        font-size: 13px;
                    }

                    &:hover a {
                        color: #333333;
                        border-bottom: 2px solid rgb(56, 113, 247);
                    }

                    .active {
                        color: rgb(56, 113, 247);
                    }
                }

                .others {
                    display: flex;

                    li {
                        a {
                            border: none;
                        }
                    }
                }
            }

            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;

                >ul {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 5;

                    >.search {
                        width: 260px;
                        margin-right: 0;
                    }

                    >.scrollMenu {
                        width: 130px;
                        margin-right: 0;
                    }
                }

                >li {
                    margin: 0 10px;
                }

                .vip {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    >a {
                        display: flex;
                        align-items: center;
                        height: 24px;
                        line-height: 24px;

                        img {
                            width: 24px;
                            height: 24px;
                            margin-right: 3px;
                        }
                    }
                }

                .me {
                    img {
                        width: 36px;
                        height: 36px;
                        border-radius: 50px;
                    }
                }
            }
        }
    }
}
</style>