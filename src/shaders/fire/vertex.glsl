 uniform float uSize;
uniform float uTime;
uniform float uLife;
uniform vec2 uResolution;


 attribute float aSize;
 attribute float timeMultiplier;

 varying float vFireProgress;

#include ../includes/remap.glsl
 
 void main(){

    vec3 newPosition = position;
    float life = mod(uTime * timeMultiplier, uLife);
    newPosition.y += life;

    float fireProgress = remap(life, 0.0, uLife, 1.0, 0.0);
    fireProgress = clamp(fireProgress, 0.0, 1.0);

    float scalingProgress = remap(life, 0.0, 0.6, 1.0, 0.0);
    scalingProgress = clamp(scalingProgress, 0.0, 1.0);


    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;


    gl_PointSize = uSize * aSize * uResolution.y * scalingProgress ;
    gl_PointSize *= 1.0 / - viewPosition.z;   

    //varying
    vFireProgress = fireProgress;
 }