<template>
	<view>
		<view class="color" :style="{backgroundColor:color}" @click="transColor"></view>
		<slot>
			
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			color:{
				type:String,
				default(){
					return "gray"
				}
			}
		},
		methods:{
			transColor(){
				this.$emit("getColor",this.color)
			}
		}
	}
</script>

<style lang="stylus">
	.color
		height:100upx
		border:1upx solid blue
</style>
