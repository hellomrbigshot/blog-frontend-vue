<template>
  <div>
    <canvas>>浏览器不支持canvas</canvas>
    <div class="text">
      <h1>新年快乐</h1>
      <router-link 
        class="link" 
        :to="{ name: 'normalPageList' }" 
        @mouseenter.native="showLinkIcon=true" 
        @mouseover.native="showLinkIcon=true" 
        @mouseleave.native="showLinkIcon=false"
        @mouseout.native="showLinkIcon=false" >
        <span>继续访问</span>
        <transition name="slide-fade-x"><Icon type="md-arrow-forward" class="link-icon" v-show="showLinkIcon"/></transition>
      </router-link>
    </div>
  </div>
</template>
<script>
let ctx = null
let sparks = []
let fireworks = []
let i = 20
function render () {
  setTimeout(render, 1000 / 60)
  ctx.fillStyle = 'rgba(193, 51, 65, 0.1)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  for (var firework of fireworks) {
      if (firework.dead) continue
      firework.move()
      firework.draw()
  }
  for (var spark of sparks) {
      if (spark.dead) continue
      spark.move()
      spark.draw()
  }

  if (Math.random() < 0.05) {
      fireworks.push(new Firework())
  }
}
function Spark (x, y, color) {
  this.x = x
  this.y = y
  this.dir = Math.random() * (Math.PI * 2)
  this.dead = false
  this.color = color
  this.speed = Math.random() * 3 + 3;
  this.walker = new Walker({
      radius: 20,
      speed: 0.25
  })
  this.gravity = 0.25
  this.dur = this.speed / 0.1
  this.move = function () {
      this.dur--
          if (this.dur < 0) this.dead = true

      if (this.speed < 0) return
      if (this.speed > 0) this.speed -= 0.1
      var walk = this.walker.step()
      this.x += Math.cos(this.dir + walk) * this.speed
      this.y += Math.sin(this.dir + walk) * this.speed
      this.y += this.gravity
      this.gravity += 0.05

  }
  this.draw = function () {
      drawCircle(this.x, this.y, 3, this.color)
  }
}

function Firework (x, y) {
  this.xmove = new Walker({
      radius: 10,
      speed: 0.5
  })
  this.x = x || Math.random() * ctx.canvas.width
  this.y = y || ctx.canvas.height
  this.height = Math.random() * ctx.canvas.height / 2
  this.dead = false
  this.color = randomColor()

  this.move = function () {
      this.x += this.xmove.step()
      if (this.y > this.height) this.y -= 1;
      else this.burst()

  }
  this.draw = function () {
    drawCircle(this.x, this.y, 1, this.color)
  }
  this.burst = function () {
    this.dead = true
    var i = 100;
    while (i--) sparks.push(new Spark(this.x, this.y, this.color))
  }
}

function drawCircle (x, y, radius, color) {
  color = color || '#FFF'
  ctx.fillStyle = color
  ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius)
}

function randomColor () {
  return ['#6ae5ab', '#88e3b2', '#36b89b', '#7bd7ec', '#66cbe1', '#f0f', '#00fdb', '#00e2ff', '#ffbf00'][Math.floor(Math.random() * 9)];
}

function Walker (options) {
  this.step = function () {
    this.direction = Math.sign(this.target) * this.speed
    this.value += this.direction
    this.target ?
        this.target -= this.direction :
        (this.value) ?
        (this.wander) ?
        this.target = this.newTarget() :
        this.target = -this.value :
        this.target = this.newTarget()
    return this.direction
  }

  this.newTarget = function () {
    return Math.round(Math.random() * (this.radius * 2) - this.radius)
  }

  this.start = 0
  this.value = 0
  this.radius = options.radius
  this.target = this.newTarget()
  this.direction = Math.sign(this.target)
  this.wander = options.wander
  this.speed = options.speed || 1
}
export default {
  data () {
    return {
      showLinkIcon: false
    }
  },
  mounted () {
    ctx = document.querySelector('canvas').getContext('2d')
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    while (i--) {
      fireworks.push(
          new Firework(Math.random() * window.innerWidth, window.innerHeight * Math.random(), ctx)
      )
    }
    render()
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 121;
}
.text {
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  margin-top: -20px;
  text-align: center;
  overflow: hidden;
  h1 {
    font-size: 10.555vw;
    color: transparent;
    background: linear-gradient(to right, rgba(255, 215, 0, 0.8), rgba(255, 255, 74, 0.8));
    -webkit-background-clip: text;
    font-family: kaiti, FangSong, STLiti;
  }
  .link {
    color: rgba(192, 192, 192, 0.7);
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
    width: 120px;
    &:hover {
      color: rgba(192, 192, 192, 1);
    }
    span {
      float: left;
    }
    overflow: hidden;
    // &:hover {
    //   .link-icon {
    //     display: inline-block;
    //   }
    // }
  }
}
</style>

