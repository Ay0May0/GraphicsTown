
var grobjects = grobjects || [];

var Ufo = undefined;
var m4 = twgl.m4;

(function() {
    "use strict";
    var shaderProgram = undefined;
    var buffers = undefined;

    Ufo = function Ufo(name, position, size, color) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || 0.5;
        this.color = color || [.7, .8, .9];
    }
	
    Ufo.prototype.init = function (drawingState) {
        var gl = drawingState.gl;

        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["ufo-vs", "ufo-fs"]);
        }
        if (!buffers) {
			
            var arrays = {
				
                vpos: {
                    numComponents: 3,
                    data: [
							//Body
							-1.0, -0.25, -0.5,
							 1.0, -0.25, -0.5,
							 1.0,  0.25, -0.5,
							-1.0, -0.25, -0.5,

							 1.0,  0.25, -0.5,
							-1.0,  0.25, -0.5,
							-1.0, -0.25,  0.5,
							 1.0, -0.25,  0.5,

							 1.0,  0.25, 0.5,
							-1.0, -0.25, 0.5,
							 1.0,  0.25, 0.5,
							-1.0,  0.25, 0.5,

							-1.0, -0.25, -0.5,
							 1.0, -0.25, -0.5,
							 1.0, -0.25,  0.5,
							-1.0, -0.25, -0.5,

							 1.0, -0.25,  0.5,
							-1.0, -0.25,  0.5,
							-1.0,  0.25, -0.5,
							 1.0,  0.25, -0.5,

							 1.0, 0.25,  0.5,
							-1.0, 0.25, -0.5,
							 1.0, 0.25,  0.5,
							-1.0, 0.25,  0.5,

							-1.0, -0.25, -0.5,
							-1.0,  0.25, -0.5,
							-1.0,  0.25,  0.5,
							-1.0, -0.25, -0.5,

							-1.0,  0.25,  0.5,
							-1.0, -0.25,  0.5,
							 1.0, -0.25, -0.5,
							 1.0,  0.25, -0.5,

							 1.0,  0.25,  0.5,
							 1.0, -0.25, -0.5,
							 1.0,  0.25,  0.5,
							 1.0, -0.25,  0.5,

							 //Wings
							  -1.0, 0.25,  0.5,
							 -0.75,  0.0, 1.25,
							   1.0, 0.25,  0.5,

							 -0.75,  0.0, 1.25,
							  0.75,  0.0, 1.25,
							   1.0, 0.25,  0.5,

							  -1.0, 0.25,  -0.5,
							 -0.75,  0.0, -1.25,
							   1.0, 0.25,  -0.5,

							 -0.75,  0.0, -1.25,
							  0.75,  0.0, -1.25,
							   1.0, 0.25,  -0.5,
							]
                },
				
                vnormal: {
                    numComponents: 3,
                    data: [
							0, 0, -1,
							0, 0, -1,
							0, 0, -1,
							0, 0, -1,
							0, 0, -1,
							0, 0, -1,
							
							0, 0, 1,
							0, 0, 1,
							0, 0, 1,
							0, 0, 1,
							0, 0, 1,
							0, 0, 1,
							
							0, -1, 0,
							0, -1, 0,
							0, -1, 0,
							0, -1, 0,
							0, -1, 0,
							0, -1, 0,
							
							0, 1, 0,
							0, 1, 0,
							0, 1, 0,
							0, 1, 0,
							0, 1, 0,
							0, 1, 0,
							
							-1, 0, 0,
							-1, 0, 0,
							-1, 0, 0,
							-1, 0, 0,
							-1, 0, 0,
							-1, 0, 0,
							
							1, 0, 0,
							1, 0, 0,
							1, 0, 0,
							1, 0, 0,
							1, 0, 0,
							1, 0, 0,

							1, 1, 0,
							1, 1, 0,
							1, 1, 0,

							1, 1, 0,
							1, 1, 0,
							1, 1, 0,

							1, 1, 0,
							1, 1, 0,
							1, 1, 0,

							1, 1, 0,
							1, 1, 0,
							1, 1, 0,
							]
                }

            };
			
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
			
        }

    };
	
    Ufo.prototype.draw = function (drawingState) {
		
        var mScale = twgl.m4.scaling([this.size, this.size, this.size]);

        var mTrans = twgl.m4.translation(curveOrbit(drawingState.realtime * 0.0005, this.position));
		
        var mRot = twgl.m4.lookAt([0, 0, 0], curveRotation(drawingState.realtime * 0.005), [0, 1, 0]);

        var modelM = twgl.m4.multiply(mRot, mTrans);
		
        modelM = twgl.m4.multiply(modelM, mScale);
		
        var normalMatrix = modelM;
		
        var gl = drawingState.gl;
		
        gl.useProgram(shaderProgram.program);
		
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
		
        twgl.setUniforms(shaderProgram,
			{
				view: drawingState.view,
				proj: drawingState.proj,
				lightdir: drawingState.sunDirection,
				ufocolor: this.color,
				model: modelM,
				normalMatrix: normalMatrix
			});
			
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
		};
		
		Ufo.prototype.center = function (drawingState) {
			return this.position;
		}

		function curveOrbit(time, position) {
			var result = [Math.cos(Math.PI * -time) * 2, 4, Math.sin(Math.PI * -time) * 2];
			return result;
		}

		function curveRotation(time) {
			var result = [-2 * Math.PI * Math.sin(Math.PI * time), 0, -2 * Math.PI * Math.cos(Math.PI * time)];
			return result;
		}
	}
)();

grobjects.push(new Ufo("ufo1", [0, 0, 0], 0.5, [1, 1, 1]));