function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayHello = function () {
  console.log('使用原型得到' + this.name)
}
var per = new Person('李端', '26')
per.sayHello()
//创建新对象并实现继承
function Student(args) {
  this.name = args

  this.getName = function () {
    console.log(this.name)
  }
}
Student.prototype = new Person('端瑞', '23')
var stu = new Student('Student')
stu.sayHello()

function minixs(target: Function, source) {
  target.prototype = new source()
}
