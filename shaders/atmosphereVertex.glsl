varying vec3 vertexNormal;

void main(){
    vertexNormal = normalize(normalMatrix * normal); //debuging 3d and 2d shader look 
                                      //with normalize(no shiny color on the back of an object)

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}