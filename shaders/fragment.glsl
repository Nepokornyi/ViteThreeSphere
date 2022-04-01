uniform sampler2D globeTexture;

varying vec2 vertexUV; // vec2(0,0.24) /uv coords - *x* - u *y* - v

varying vec3 vertexNormal;

void main(){
    //Pixel color rgba()
    //a for trasparecny
//-------
    // texture2D(globeTexture, vertexUV);
    // gl_FragColor = vec4(0.4,0.5,1,1); 
//-------
    //Normal -> direction associated with vertex (where it's pointing)
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.2,0.55,1.0) * pow(intensity, 1.5);
    //vec3 is adding color on top of the sphere
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);

    //texture2D is in vec3 and FragColor requires vec4
    //for making changes


}