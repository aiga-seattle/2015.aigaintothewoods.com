/**
 * Makes a nice constellation on canvas
 * @constructor Constellation
 * @version 1.0.0
 * @author Acaua Montiel <contato@acauamontiel.com.br>
 */
function Constellation (canvas) {
	var _this = this,
		ctx = canvas.getContext('2d');

	_this.config = {
		star: {
			color: 'rgba(255, 255, 255, .5)'
		},
		line: {
			color: 'rgba(0, 0, 0, .2)',
			width: 0.2
		},
		position: {
			x: canvas.width * 0.5,
			y: canvas.height * 0.5
		},
		velocity: 0.01,
		length: 500,
		distance: 120,
		radius: 150,
		stars: []
	};

	function Star () {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.vx = (_this.config.velocity - (Math.random() * 0.1));
		this.vy = (_this.config.velocity - (Math.random() * 0.1));

		this.radius = Math.random();
	}

	Star.prototype = {
		create: function(){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
		},

		animate: function(){
			var i;
			for(i = 0; i < _this.config.length; i++){

				var star = _this.config.stars[i];

				if(star.y < 0 || star.y > canvas.height){
					star.vx = star.vx;
					star.vy = - star.vy;
				}
				else if(star.x < 0 || star.x > canvas.width){
					star.vx = - star.vx;
					star.vy = star.vy;
				}
				star.x += star.vx;
				star.y += star.vy;
			}
		}
	};

	_this.createStars = function () {
		var length = _this.config.length,
			star,
			i;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(i = 0; i < length; i++){
			_this.config.stars.push(new Star());
			star = _this.config.stars[i];

			star.create();
		}

		star.animate();
	};

	_this.setCanvas = function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	_this.setContext = function () {
		ctx.fillStyle = _this.config.star.color;
		ctx.strokeStyle = _this.config.line.color;
		ctx.lineWidth = _this.config.line.width;
	};

	_this.loop = function (callback) {
		callback();

		reqAnimFrame(function () {
			_this.loop(function () {
				callback();
			});
		});
	};

	_this.bind = function () {
		$(window).on('mousemove', function(e){
			_this.config.position.x = e.pageX;
			_this.config.position.y = e.pageY;
		});
	};

	_this.init = function () {
		_this.setCanvas();
		_this.setContext();

		_this.loop(function () {
			_this.createStars();
		});

		_this.bind();
	};

  return _this;
}

/*
 * requestAnimationFrame pollyfill
 */
var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	window.setTimeout(callback, 1000 / 60);
};

Constellation($('canvas')[0]).init();
