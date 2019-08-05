<template>
  <div>
    <Form
      inline
      :model="todo"
      ref="todoForm"
      @keydown.native="handleKeyDown"
    >
      <FormItem
        prop="content"
        :rules="[{ required: true, message: '内容不能为空' }]"
        style="width: 68%"
      >
        <Input
          v-model="todo.content"
          placeholder="请输入内容"
          ref="contentInput"
        />
      </FormItem>
      <FormItem
        style="width: 120px;"
        prop="expectedTime"
      >
        <DatePicker
          v-model="todo.expectedTime"
          type="date"
          placeholder="期望完成时间"
        />
      </FormItem>
      <FormItem style="width: 60px;">
        <Button
          type="primary"
          @click="handleAddTodo"
        >添加</Button>
      </FormItem>
    </Form>
    <div class="todo-filter">
      <div
        v-for="(filter, i) in filterMapping"
        :key="i"
        :class="['float-left', filterActive === i ? 'active' : '']"
        @click="filterActive = i"
      >
        <a>{{ filter }}</a>
      </div>
    </div>
    <div>
      <div
        v-for="(todo, i) in filterTodo"
        :key="todo._id"
        :title="todo.expectedTime ? `期望完成时间 ${Common.dateFmt('yyyy-MM-dd', todo.expectedTime)}`: ''"
        :class="[statusClassMapping[todo.status], 'todo-item']"
      >
        <Checkbox
          class="float-left"
          @on-change="handleCompleteTodo(todo._id, $event)"
          :value="todo.status !== 'completed' ? false : true"
          size="large"
          :disabled="todo.status === 'deleted'"
          :key="i"
        />
        <div class="float-left todo-item-content">{{ todo.content }}</div>
        <Tag
          class="todo-item-tag"
          v-if="todo.expectedTime && getTimeTag(todo.expectedTime) && todo.status === 'pending'"
          color="error"
        >{{ getTimeTag(todo.expectedTime) }}</Tag>
        <div class="todo-item-operation">
          <Icon
            type="md-trash"
            :size="20"
            @click="handleDeleteTodo(todo._id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filterActive: 'all',
      filterMapping: {
        all: '所有',
        pending: '待完成',
        undone: '未完成',
        completed: '已完成',
        deleted: '已删除'
      },
      statusClassMapping: {
        completed: 'completed',
        deleted: 'deleted',
        pending: 'pending'
      },
      todo: {
        content: '',
        status: 'pending',
        create_time: '',
        complete_time: '',
        expectedTime: ''
      },
      todos: []
    }
  },
  computed: {
    filterTodo() {
      const filterMappingFunciton = {
        all: (todo) => { return todo },
        pending: todo => {
          return todo.status === 'pending' && todo.expectedTime && new Date(todo.expectedTime).getTime() - new Date().getTime() < 3600 * 24 * 5 * 1000 // 返回期望完成时间距离现在五天以内的待完成的 todo
        },
        undone: todo => todo.status === 'pending',
        completed: todo => todo.status === 'completed',
        deleted: todo => todo.status === 'deleted'
      }
      return this.todos.filter(filterMappingFunciton[this.filterActive])
    }
  },
  mounted() {
    this.getTodoList()
  },
  methods: {
    dateChange(date) {
      this.todo.expectedTime = date
    },
    getTimeTag(date) {
      if (!date) return ''
      const expectedTime = new Date(date).getTime()
      const nowTime = new Date().getTime()
      if (expectedTime - nowTime < 0 - 60 * 60 * 24 * 1000) { // 过期
        return '已过期'
      } else if (expectedTime - nowTime < 60 * 60 * 24 * 1000 * 4) { // 五天以内返回 即将过期
        return '即将过期'
      } else {
        return 0
      }
    },
    getTodoList() {
      this.Common.axios('/api/todo/getTodoList')
        .then(res => {
          this.todos = res.data.data
        })
    },
    handleAddTodo() { // 新增一条 todo
      this.$refs['todoForm'].validate(valid => {
        if (valid) {
          const sendData = Object.assign({}, this.todo, { expectedTime: this.Common.dateFmt('yyyy-MM-dd hh:mm:ss', this.todo.expectedTime) })
          this.Common.axios('/api/todo/create', sendData).then(res => {
            this.todos = [res.data.data].concat(this.todos)
          })
          this.$refs['todoForm'].resetFields()
        } else {
          this.$Alert.error('表单验证失败')
        }
      })
    },
    handleCompleteTodo(id, checked) {
      this.handleStatusChange(id, checked ? 'completed' : 'pending')
    },
    handleDeleteTodo(id) { // 删除一条 todo
      this.handleStatusChange(id, 'deleted')
    },
    handleKeyDown(e) { // 监听 enter 事件
      if (e.keyCode === 13) {
        this.$refs['contentInput'].blur()
        this.handleAddTodo()
      } else {

      }
    },
    handleStatusChange(id, status) {
      this.Common.axios('/api/todo/updateTodoStatus', { id, status })
        .then(res => {
          this.todos.find(todo => todo._id === id).status = status
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/css/index.scss";
.todo-filter {
  overflow: hidden;
  margin: 10px 10px;
  div {
    border-right: 1px solid $borderColor;
    padding: 0 10px;
    font-size: 14px;
    color: $borderColor;
    a {
      color: $borderColor;
    }
    &:last-child {
      border-right: 0px;
    }
  }
  .active {
    color: $blueColor;
    font-size: 15px;
    a {
      color: $blueColor;
    }
  }
}
.todo-item {
  font-size: 18px;
  position: relative;
  padding: 15px 10px;
  vertical-align: middle;
  font-family: sans-serif;
  line-height: 1;
  overflow: hidden;
  span {
    word-break: break-all;
  }
  &-content {
    width: calc(100% - 120px);
  }
  &-operation {
    // display: none;
    opacity: 0;
    position: absolute;
    right: -20px;
    top: 13px;
  }
  &-tag {
    position: absolute;
    top: 10px;
    right: 40px;
  }
  &:hover {
    cursor: pointer;
    .todo-item-operation {
      // display: block;
      opacity: 0.6;
      transform: translateX(-40px);
      transition: all 0.5s linear;
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
}
.float-left {
  float: left;
}
.completed div,
.deleted div {
  text-decoration: line-through;
  text-decoration-color: $blueColor;
}
.deleted div {
  text-decoration-color: $redColor;
}
.deleted {
  &:hover {
    .todo-item-operation {
      display: none;
    }
  }
}
</style>
