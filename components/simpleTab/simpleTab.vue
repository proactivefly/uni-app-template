<template>
  <scroll-view 
		class="wuc-tab" 
		:class="tabClass"
		:style="tabStyle"
		scroll-with-animation
		scroll-x
		:scroll-left="scrollLeft"
		>
		
    <view :class="[textFlex?'flex text-center':'']">
			<view 
				:class="[index==tabCur?selectClass+' cur':'',textFlex?'flex-sub':'','wuc-tab-item']"
				v-for="(item,index) in tabList" 
				:key="index" 
				:id="index" 
				@tap="tabSelect(index,$event)"
			>	
				<!-- icon -->
        <text :class="item.icon"></text>
				<!-- name -->
        <text>{{item.name}}</text>
				<!-- num -->
				<text class='num' v-if='item.num!=null || item.num!=undefined'>{{item.num}}</text>
				<!-- 线 -->
				<image  v-if='showLine && index==tabCur' src="../../static/cur.png" :class="[index==tabCur?'animation-scale-up':'','border']"></image>
      </view>
    </view>
  </scroll-view>
</template>
<script>
export default {
    name: 'wuc-tab',
    data() {
			return {};
    },
    props: {
			tabList: { // 数组
				type: Array,
				default() {
					return [];
				}
			},
			tabCur: { // 当前active
				type: Number,
				default() {
					return 0;
				}
			},
			tabClass: { //tab 的class
				type: String,
				default() {
					return '';
				}
			},
			tabStyle: { //tab的style
				type: String,
				default() {
					return '';
				}
			},
			textFlex: { //是否平均分tab
				type: Boolean,
				default() {
					return false;
				}
			},
			selectClass: { //选中class 的样式
				type: String,
				default() {
					return 'text-blue';
				}
			},
			showLine:{
				type:Boolean,
				default(){
					return true
				}
			}
    },
    methods: {
			tabSelect(index, e) {
				if (this.currentTab === index) return false;
				this.$emit('update:tabCur', index);
				this.$emit('change', index);
			}
    },
    computed: {
			scrollLeft() {
				let _temp=(this.tabCur - 1) * 60;
				return _temp
			}
    }
};
</script>
<style lang="stylus">
	.wuc-tab {
		white-space: nowrap;
	}
	.wuc-tab-item {
		height: 90upx;
		display: inline-block;
		line-height: 90upx;
		margin: 0 10upx;
		padding: 0 20upx;
		font-size:32upx;
		position:relative
	}
	.wuc-tab-item .num{
		position:absolute;
		right:15upx;
		top:15upx;
		background:#DC5050;
		border-radius:14upx;
		padding:5upx 10upx;
		font-size:26upx;
		font-family:PingFangSC-Semibold,PingFangSC;
		font-weight:600;
		height:36upx;
		line-height:36upx;
		color:rgba(255,255,255,1);
	}
	.wuc-tab-item.cur .border{
		position:absolute;
		width:44upx;
		height:10upx;
		left:34%;
		transform: translateX(-50%);
		bottom:2upx;
	}
	.wuc-tab.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1024;
		box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	}

	.flex {
		display: flex;
	}
	.text-center {
		text-align: center;
	}
	.flex-sub {
		flex: 1;
	}
	.text-blue{
	  color:#0081ff;
	}
	.text-white{
	  color:#ffffff;
	}
	.bg-white{
		background-color: #ffffff;
	}
	.bg-blue{
		background-color: #0081ff;
	}
	.text-orange{
	  color: #f37b1d
	}

	.text-xl {
		font-size: 36upx;
	}
</style>
