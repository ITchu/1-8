var Main=Vue.component("Main",{
	template:`
		<div class="template">
			<div class="text">
				<div class="left">
					<router-view name="left"></router-view>
				</div>
				<div class="right">
					<router-view name="right"></router-view>
				</div>
			</div>
		</div>
	`
})
var Left=Vue.component("Left",{
    template:`
		<div>
			<ul v-for="item in data" class="main">
				<li><router-link :to="'#'+item.id">{{item.title}}</router-link></li>
				<ul>
					<li v-for="item1 in item.child">
					<router-link :to="'#'+item1.id">{{item1.title}}</router-link>
					</li>
				</ul>
			</ul>
		</div>`,
	data(){
		return {
			datas:[]
		}
	},
	computed:{
        data(){
            var arr=[];
            for(var i in this.datas){
                if(this.datas[i].pid==0){
                    arr.push(this.datas[i]);
                }else{
                    for(var j in arr){
                        if(arr[j].id==this.datas[i].pid){
                            if(!arr[j].child){
                                arr[j].child=[];
                            }
                            arr[j].child.push(this.datas[i])
                        }
                    }
                }
            }
            return arr;
        }
	},
	mounted(){
		fetch("./data.txt").then(e=>e.json()).then(e=>{
		    this.datas=e;
        })
	}
})
var Right=Vue.component("Right",{
	template:`<div class="markdown-body">
        <div v-html="right"></div>
    </div>`,
    data(){
	    return {
	        right:""
        }
    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var lis=document.querySelector("#a"+num);
            var pos=lis.offsetTop-40;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate);
                }
            }

            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function(){
                     document.querySelector(".right").scrollTop= this.number.toFixed(0)
                })
                .start()

            animate()
        }
    },
    mounted(){
        fetch("./right.txt").then(e=>e.text()).then(e=>{
            this.right=e;
        })
    }
})
var New=Vue.component("New",{
    template:`
        <div  style="position: absolute;top:50px">
            Introduction
This boilerplate is targeted towards large, serious projects and assumes you are somewhat familiar with Webpack and vue-loader. Make sure to also read vue-loader's documentation for common workflow recipes.

If you just want to try out vue-loader or whip out a quick prototype, use the webpack-simple template instead.

Quickstart
To use this template, scaffold a project with vue-cli. It is recommended to use npm 3+ for a more efficient dependency tree.
        </div>
    `
})