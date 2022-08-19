<template>
    <div >
        <el-input
            placeholder="探索稀土掘金"
            v-model="input3"
            class="input-with-select"
            size="small"
        >
            <el-button
                slot="append"
                size="small"
                icon="el-icon-search"
            ></el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input3: "",
			isActive:false
        };
    },
	methods:{
		handlerClass(){
			this.isActive = !this.isActive;
		}
	}
};
</script>

<style>

.el-input {
	float: right;
    width: 250px;
}
.input-with-select{
    background-color: #fff;
}
</style>