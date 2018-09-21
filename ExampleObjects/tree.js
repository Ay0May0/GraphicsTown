
var grobjects = grobjects || [];

var tree = undefined;

(function() {
    "use strict";

    var shaderProgram = undefined;
    var buffers = undefined;

    tree = function tree(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
	
    tree.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
		
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["tree-vs", "tree-fs"]);
        }
		
        if (!buffers) {
			
            var arrays = {
				
                vpos : {
					numComponents: 3,
					data: [  
							-0.1,  0,  0,
							 0.1,  0,  0,
							-0.1,0.6,  0,
							-0.1,0.6,  0,
							 0.1,  0.6,0,
							 0.1,  0,  0,
							-0.1,  0,0.1,
							 0.1,  0,0.1,
							-0.1,0.6,0.1,
							-0.1,0.6,0.1,
							 0.1,0.6,0.1,
							 0.1,  0,0.1,

							 0.1,0.6,  0,
							 0.1,0.6,0.1,
							 0.1,  0,  0,
							 0.1,  0,  0,
							 0.1,  0,0.1,
							 0.1,0.6,0.1,
							-0.1,0.6,  0,
							-0.1,0.6,0.1,
							-0.1,  0,  0,
							-0.1,  0,  0,
							-0.1,  0,0.1,
							-0.1,0.6,0.1,
							
							-0.8,0.6, 0.05,
							 0.8,0.6, 0.05,
							   0,  2, 0.05,
							   0,0.6, 0.85,
							   0,0.6,-0.85,
							   0,  2, 0.05,
							]
				},
				
                vnormal : {
						numComponents:3,
						data: [
								0,0,-1, 
								0,0,-1, 
								0,0,-1,
								0,0,-1, 
								0,0,-1, 
								0,0,-1,
								0,0,-1, 
								0,0,-1, 
								0,0,-1,
								0,0,-1, 
								0,0,-1, 
								0,0,-1,

								1,0,0, 
								1,0,0, 
								1,0,0,
								1,0,0, 
								1,0,0, 
								1,0,0,
								1,0,0, 
								1,0,0, 
								1,0,0,
								1,0,0, 
								1,0,0, 
								1,0,0,

								0,0,-1, 
								0,0,-1, 
								0,0,-1,
								0,0,-1, 
								0,0,-1, 
								0,0,-1,
								]
				},

                vcolor : {
						numComponents:3,
						data: [
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,

								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,
								0.7, 0.5, 0.04,

								   0,0.39,   0,
								0.33,0.42,0.18,
								0.56,0.73,0.56,
								0,0.39,0,
								   0,0.39,   0,
								0.33,0.42,0.18,
								0.56,0.73,0.56,
								]
				}
				
            };
			
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
			
        }

    };
	
    tree.prototype.draw = function(drawingState) {
		
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
		
        twgl.m4.setTranslation(modelM,this.position,modelM);

        var gl = drawingState.gl;
		
        gl.useProgram(shaderProgram.program);
		
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
		
        twgl.setUniforms(shaderProgram,
			{
				view: drawingState.view,
				proj: drawingState.proj,
				lightdir: drawingState.sunDirection,
				treecolor: this.color,
				model: modelM
			});
		
		twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
		};
	
		tree.prototype.center = function(drawingState) {
			return this.position;
		}
	}
)();

grobjects.push(new tree("tree1", [-9,0, 9],0.5));
grobjects.push(new tree("tree2", [ 8,0,-8],0.7));
grobjects.push(new tree("tree3", [-9,0, 3],0.5));
grobjects.push(new tree("tree4", [ 9,0,-5],0.7));
grobjects.push(new tree("tree5", [-8,0, 6],0.5));
grobjects.push(new tree("tree6", [ 4,0, 8],0.7));
grobjects.push(new tree("tree7", [-2,0,-8],0.5));
grobjects.push(new tree("tree9", [-7,0,-2],0.7));
grobjects.push(new tree("tree10",[ 0,0, 7],0.5));
