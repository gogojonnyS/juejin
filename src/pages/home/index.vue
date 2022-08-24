<template>
	<div id="homeindex-container">
		<router-view></router-view><!-- 标签导航列表组件 -->
		<div :class="{ content: true, 'content-react': sidebaron }">
			<section class="main">
				<div class="list-header">
					<ul>
						<li :class="listselect == 1 ? 'liselect' : ''" :data-id="1" @click="toggleSelect">推荐</li>|
						<li :class="listselect == 2 ? 'liselect' : ''" :data-id="2" @click="toggleSelect">最新</li>|
						<li :class="listselect == 3 ? 'liselect' : ''" :data-id="3" @click="toggleSelect">热榜</li>
					</ul>
				</div>
				<!-- 瀑布流组件 -->
				<div :class="{ waterfall: true, 'waterfall-react': sidebaron }" ref="scrollBox">
					<SkeletonVue :height="150" :class="{ 'Skeleton': !sidebaron, 'Skeleton-react': sidebaron }"
						v-if="isskeleton">
					</SkeletonVue>
					<List v-for="(item, index) in articlearr" :key="index" :postid="item.id" :authorname="item.username"
						:title="item.title" :coverimg="item.photo" :abstract="item.content" :date="item.posttime"
						:keywords="item.keywords" :comment="item.replycount" :likecount="item.followcount"
						:viewcount="item.viewcount">
					</List>
					<h3 v-if="istip">没有更多了</h3>
				</div>
			</section>
			<div style="width: 20px;height:1px;" v-if="!sidebaron"></div>
			<div class="sidebar" v-if="!sidebaron"></div>
		</div>
	</div>
</template>

<script>
import List from '../../components/List.vue'
import SkeletonVue from '../../components/Skeleton.vue';
import { getarticleAPI } from '../../api/getarticleAPI'

export default {
	data() {
		return {
			sidebaron: false,
			articlearr: [],//文章列表
			listselect: 1,//选择的排序依据
			isloading: false,//向后端请求文章
			isskeleton: true,
			loadheight: 200,//加载余量阈值
			index: 0,
			num: 10,
			istip: false//提示：没有更多了
		}
	},
	components: {
		List,
		SkeletonVue
	},
	methods: {
		// 切换选择排序，1表示推荐，2表示最新，3表示热榜
		toggleSelect(e) {
			// 重置索引与列表
			this.index = 0
			this.articlearr = []
			this.isskeleton = true
			// console.log(e.currentTarget.dataset.id);
			this.listselect = parseInt(e.currentTarget.dataset.id)
			this.getArticle()
		},
		async getArticle() {
			// 首页列表排序匹配，order表示传给后方的排序依据
			let order
			switch (this.listselect) {
				case 1:
					order = 'recommend'
					break;
				case 2:
					order = 'new'
					break;
				case 3:
					order = 'hot'
					break;
				default:
					order = 'recommend'
			}
			// 获取文章列表
			const res = await getarticleAPI(this.index, this.num, order)
			if (res.code !== 201) {
				this.istip = true
				return
			}
			this.articlearr = [...this.articlearr, ...res.data]
			this.index = this.index + this.num
			// console.log(this.index);
			this.isloading = false
			this.isskeleton = false
		},
		// 防抖函数
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
			if (windowInfo.width < 960) {
				this.sidebaron = true
			} else {
				this.sidebaron = false
			}
		},
		// 监听屏幕滚动
		windowScroll() {
			if (!this.isloading) {
				let boxHeight = this.$refs.scrollBox.offsetHeight
				let scrollboxheight = boxHeight + 56 + 42  //盒子高度（包括搜索栏）
				let boxoffset = window.pageYOffset  //屏幕滚动像素
				let deviceheight = window.screen.height  //设备高度
				// console.log(scrollboxheight + "=" + boxoffset + "+" + deviceheight);
				// 当滚动盒子偏移量小于屏幕滚动像素+设备高度+200余量时滚动
				if (scrollboxheight < boxoffset + deviceheight + this.loadheight) {
					// 设置节流阀isloading
					this.isloading = true
					this.getArticle()
				}
			} else return
		}
	},
	created() {
		this.toggleTopBar()
		window.addEventListener('resize', this.debounce(this.toggleTopBar, 500))
		window.addEventListener('scroll', this.windowScroll)
		this.getArticle()
	},
	mounted() {
		addEventListener('resize', this.debounce(this.toggleTopBar, 500))
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.debounce(this.toggleTopBar, 500));
		window.removeEventListener('scroll', this.windowScroll)

	}
};
</script>

<style lang="less" scoped>
#homeindex-container {
	li {
		list-style: none;
	}

	.content {
		max-width: 960px;
		margin: 0 auto;
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		// width: 63%;
		background-color: #f4f5f5;

		.main {
			overflow: hidden;
			background-color: #fff;

			.list-header {
				border-bottom: 1px solid rgb(239, 239, 239);
				padding: 1vw 2vw;

				ul {
					display: flex;
					justify-content: flex-start;
					color: #909090;

					li {
						font-size: 14px;
						margin: 0 15px;
						color: #909090;
					}

					.liselect {
						color: #007fff;
					}
				}
			}

			.waterfall {
				max-width: 700px;

				.Skeleton {
					width: 700px !important;
				}

				.Skeleton-react {
					width: calc(100vw - 15px)
				}
			}

			.waterfall-react {
				width: 100%;
				// max-width: 9999px;

			}
		}

		.sidebar {
			width: 240px;
			height: 900px;
			background-color: blue;
		}
	}

	.content-react {
		margin: 0;
		margin-top: 10px;
		// display: flex;
		// justify-content: center;
		width: 100%;
		// background: #ffffff;
	}
}
</style>