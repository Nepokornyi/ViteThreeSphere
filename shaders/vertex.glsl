varying vec2 vertexUV;
varying vec3 vertexNormal;

void main(){
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    //https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}