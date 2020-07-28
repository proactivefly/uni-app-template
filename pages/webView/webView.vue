<template>
	<view>
		<web-view :src="info.url+'?version='+time"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				time:new Date().getTime()
			};
		},
		onLoad(){
			this.info=uni.getStorageSync('webViewInfo');
			uni.setNavigationBarTitle({
					title:this.info.title || " "
			});
		}
	}
</script>

<style lang="stylus">

</style>
