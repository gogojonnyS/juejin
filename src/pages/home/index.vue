<template>
	<div id="homeindex-container">
		<router-view></router-view><!-- 标签导航列表组件 -->
		<div :class="{ content: true, 'content-react': sidebaron }">
			<section class="main">
				<div class="list-header">
					<ul>
						<li>推荐</li>
						<li>最新</li>
						<li>热榜</li>
					</ul>
				</div>
				<!-- 瀑布流组件 -->
				<div :class="{ waterfall: true, 'waterfall-react': sidebaron }">
					<List v-for="(item, index) in 10" :key="index" :postid="item"></List>
				</div>
			</section>
			<div style="width: 20px;height:1px;" v-if="!sidebaron"></div>
			<div class="sidebar" v-if="!sidebaron"></div>
		</div>
	</div>
</template>

<script>
import List from '../../components/List.vue'
export default {
	data() {
		return {
			// windowWidth: ">960",
			sidebaron: false
		}
	},
	components: {
		List
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
			if (windowInfo.width < 960) {
				this.sidebaron = true
			} else {
				this.sidebaron = false
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

					li {
						font-size: 14px;
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