import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
Vue.use(Message.name, Message)
vue.use(MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
