<template>
	<div id="homeindex-container">
		<router-view></router-view><!-- 标签导航列表组件 -->
		<div :class="{ content: true, 'content-react': sidebaron }">
			<section class="main">
				<div class="list-header">
					<ul>
						<li>推荐</li>|
						<li>最新</li>|
						<li>热榜</li>
					</ul>
				</div>
				<!-- 瀑布流组件 -->
				<div :class="{ waterfall: true, 'waterfall-react': sidebaron }" ref="scrollBox">
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
import { getarticleAPI } from '../../api/getarticleAPI'

export default {
	data() {
		return {
			sidebaron: false,
			articlearr: [],
			isloading: false,
			loadheight: 200,
			index: 0,
			num: 10,
			istip: false
		}
	},
	components: {
		List
	},
	methods: {
		async getArticle() {
			const res = await getarticleAPI(this.index, this.num)
			if (res.code !== 201) {
				this.istip = true
				return
			}
			this.articlearr = [...this.articlearr, ...res.data]
			this.index = this.index + this.num
			// console.log(this.index);
			this.isloading = false
		},
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
			background-color: #fff;

			.list-header {
				padding: 1.5vw 2vw;

				ul {
					display: flex;
					justify-content: flex-start;
					color: #909090;

					li {
						font-size: 14px;
						margin: 0 15px;
						color: #909090;
					}

					.li-select {
						color: #007fff;
					}
				}
			}

			.waterfall {
				max-width: 700px;
			}

			.waterfall-react {
				max-width: 9999px;

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