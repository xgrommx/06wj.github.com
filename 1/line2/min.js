function Vector(a,b){this.x=a||0;this.y=b||0}Vector.prototype.reset=function(a,b){this.x=a;this.y=b};Vector.prototype.getClone=function(){return new Vector(this.x,this.y)};Vector.prototype.cut=function(a){this.setLength(Math.min(a,this.getLength()))};Vector.prototype.cutNew=function(a){var a=Math.min(a,this.getLength()),b=this.getClone();b.setLength(a);return b};Vector.prototype.equals=function(a){return this.x==a.x&&this.y==a.y};Vector.prototype.plus=function(a){this.x+=a.x;this.y+=a.y};
Vector.prototype.plusNew=function(a){return new Vector(this.x+a.x,this.y+a.y)};Vector.prototype.minus=function(a){this.x-=a.x;this.y-=a.y};Vector.prototype.minusNew=function(a){return new Vector(this.x-a.x,this.y-a.y)};Vector.prototype.negate=function(){this.x=-this.x;this.y=-this.y};Vector.prototype.negateNew=function(){return new Vector(-this.x,-this.y)};Vector.prototype.scale=function(a){this.x*=a;this.y*=a};Vector.prototype.scaleNew=function(a){return new Vector(this.x*a,this.y*a)};
Vector.prototype.getLength=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};Vector.prototype.setLength=function(a){var b=this.getLength();b?this.scale(a/b):this.x=a};Vector.prototype.getAngle=function(){return Math.atan2(this.y,this.x)};Vector.prototype.setAngle=function(a){var b=this.getLength();this.x=b*Math.cos(a);this.y=b*Math.sin(a)};Vector.prototype.rotate=function(a){var b=Math.cos(a),a=Math.sin(a),c=this.x*a+this.y*b;this.x=this.x*b-this.y*a;this.y=c};
Vector.prototype.rotateNew=function(a){var b=new Vector(this.x,this.y);b.rotate(a);return b};Vector.prototype.dot=function(a){return this.x*a.x+this.y*a.y};Vector.prototype.getNormal=function(){return new Vector(-this.y,this.x)};Vector.prototype.isPerpTo=function(a){return this.dot(a)==0};Vector.prototype.angleBetween=function(a){a=this.dot(a)/(this.getLength()*a.getLength());return Math.acos(a)};(function(){var a=window.Game={};a.init=function(b,c,d){a.context=document.getElementById(b).getContext("2d");setInterval(d,1E3/c)};a.merge=function(a,c,d){for(var e in c)if(!d||a.hasOwnProperty(e))a[e]=c[e];return a};a.setFps=function(b){a.fpsDiv=document.getElementById(b);a.fps=0;a.fpsDiv.innerHTML="fps:60";setInterval(function(){a.fpsDiv.innerHTML="fps:"+a.fps;a.fps=0},1E3)};a.key={};a.initKeyEvent=function(){document.onkeydown=function(b){a.key[b.keyCode]=!0};document.onkeyup=function(b){a.key[b.keyCode]=
!1}};a.keyCode={UP:38,DOWN:40,LEFT:37,RIGHT:39}})();(function(){var a=Game.Box=function(b){this.rotation=this.height=this.width=this.y=this.x=0;this.color="#"+parseInt(Math.random()*16777215).toString(16);Game.merge(this,b);a.add(this)};a.prototype.render=function(){var a=Game.context;a.save();a.fillStyle=this.color;a.translate(this.x,this.y);a.rotate(this.rotation);a.globalAlpha=0.3;a.beginPath();a.globalAlpha=0.3;a.arc(0,0,this.height/2,0,Math.PI*2);a.arc(this.width,0,this.height/2,0,Math.PI*2);a.fill();a.lineWidth=2;a.arc(0,0,2,0,Math.PI*2);a.arc(this.width,
0,2,0,Math.PI*2);a.stroke();a.restore()};a.prototype.update=function(){};a.prototype.getBottomX=function(){return this.x+this.width*Math.cos(this.rotation)};a.prototype.getBottomY=function(){return this.y+this.width*Math.sin(this.rotation)};a.container=[];a.add=function(b){a.container.push(b)};a.render=function(){var b,c=this.container.length;for(b=0;b<c;b++)a.container[b].render(),a.container[b].update()}})();(function(){var a=Game.Box,b=Game.SnakeBody=function(b){this.before=null;b=b||{};a.call(this,b)};b.prototype=new a;b.prototype.construstor=b;b.prototype.update=function(){if(this.before)this.rotation=Math.atan2(this.before.y-this.y,this.before.x-this.x),this.x=this.before.x-this.getBottomX()+this.x,this.y=this.before.y-this.getBottomY()+this.y}})();(function(){var a=Game.SnakeBody,b=Game.Snake=function(b){this.loc=new Vector(0,0);this.v=new Vector(8,0);this.v.rotate(Math.random()*Math.PI*2);this.a=new Vector(0,0);this.wanderAngle=1;Game.merge(this,b);this.tail=this.head=new a({height:30,before:this.loc});this.add()};b.prototype.add=function(){this.tail=new a({width:40,height:15,before:this.tail})};b.prototype.update=function(){this.loc.plus(this.v);this.v.plus(this.a);this.v.cut(6);this.bounce();this.eatFood()};b.prototype.bounce=function(){if(this.loc.x<
0)this.loc.x=0,this.v.x*=-1;else if(this.loc.x>800)this.loc.x=800,this.v.x*=-1;if(this.loc.y<0)this.loc.y=0,this.v.y*=-1;else if(this.loc.y>600)this.loc.y=600,this.v.y*=-1};b.prototype.wander=function(){this.wanderAngle+=Math.random()-0.5;var a=this.v.getClone();a.setLength(100);var b=new Vector;b.setLength(50);b.setAngle(this.wanderAngle);this.a=a.plusNew(b);this.a.cut(1)};b.prototype.search=function(){};b.prototype.eatFood=function(){};b.food={x:110,y:110,r:10,time:20,color:"#ff9966",init:function(){this.color=
"#"+parseInt(Math.random()*16777215).toString(16);this.x=Math.random()*800;this.y=Math.random()*600},render:function(){this.time++;var a;if(this.time>70)this.time=this.r*2;a=this.time*0.5;Game.context.save();Game.context.beginPath();Game.context.fillStyle=this.color;Game.context.globalAlpha=(90-this.time)/80;Game.context.arc(this.x,this.y,a,0,Math.PI*2);Game.context.fill();Game.context.globalAlpha=0.8;Game.context.beginPath();Game.context.arc(this.x,this.y,this.r,0,Math.PI*2);Game.context.fill();
Game.context.restore()}}})();(function(){var a=Game.Segment=function(a){this.v=0;this.before=null;Game.Box.call(this,a)};a.prototype=Game.Box.prototype;a.prototype.construstor=a;a.prototype.update=function(){this.rotation+=this.v/2;if(this.before)this.x=this.before.getBottomX(),this.y=this.before.getBottomY()}})();window.onload=function(){var a=Game.Box,b=Game.Segment,c=Game.Snake;document.getElementById("main");document.getElementById("main");var d=new b({x:400,y:300,width:120,height:15,v:0.09}),d=new b({width:100,height:27,v:-0.14,before:d});new b({width:60,height:27,v:0.2,before:d});new b({x:100,y:100,width:60,height:21,v:0.4});new b({width:40,height:15,v:-0.7,before:d});var e;Game.initKeyEvent();Game.init("main",60,function(){Game.context.clearRect(0,0,800,600);a.render();e.update();e.wander();Game.key[Game.keyCode.LEFT]?
(void 0).v.rotate(-0.1):Game.key[Game.keyCode.RIGHT]&&(void 0).v.rotate(0.1);Game.fps++});Game.setFps("fps");e=new c({loc:new Vector(300,300)});e.add()};
