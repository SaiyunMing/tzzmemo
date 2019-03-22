(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	let list = JSON.parse(localStorage.getItem('list') || '[]')
	console.log(list);
	
	/**
	 * : [
				{ id: 1, name: '打兔崽子', done: true },
				{ id: 2, name: '二打兔崽子', done: true },
				{ id: 3, name: '三打兔崽子', done: false },
			]
	 */
	const vm = new Vue({
		el: '#app',
		data: {
			list,
			todoName: '',
			isEditId : -1,
			completedShow : true,
			All: false
		},
		watch : {
			list : {
				deep:true,
				handler(newVal){
					localStorage.setItem('list' , JSON.stringify(newVal))
				}
			}
		},
		methods: {
			// 删除
			del(id) {
				this.list = this.list.filter(item => item.id != id)
			},

			// 添加
			add() {
				// 处理todoName
				if (this.todoName.trim().length === 0) {
					this.todoName = ''
					return
				}
				// 处理id
				let id = this.list.length === 0 ? 1 : this.list[this.list.length - 1].id + 1;
				// 将对象添加到data数据中
				this.list.push({ id: id, name: this.todoName, done: false })
				// 将todoName 清空
				this.todoName = ''
			},

			// 显示编辑状态
			showEdit(id) {
				console.log(id)
				this.isEditId = id
			},

			// 隐藏编辑状态
			hideEdit() {
				this.isEditId = -1
			},

			// 清除完成的事件
			clearCompleted() {
				this.list = this.list.filter( item => item.done != true)
			},

			// 全选事件
			toggleAll() {
				this.list.forEach( v => v.done = !this.All) 
			},

			// 展示完成的事件  => 让未完成的事件隐藏
			showCompleted() {
			
				
			},

			// 展示未完成的事件
			showActive() {
				
				
			}
		},
		// 计算属性
		computed : {
			isFooterShow() {
				return this.list.length > 0
			},
			// 计算未完成事件的数量
			itemleftCount(){
				return this.list.filter( item => item.done===false).length
			},
			// 隐藏 Clear Completed 
			isShowClearCompleted(){
				return this.list.some(item => item.done === true)
			},
			
		},


	})



})(window);
