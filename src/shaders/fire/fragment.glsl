uniform vec3 uColorA;
uniform vec3 uColorB;

uniform sampler2D uTexture;

 varying float vFireProgress;



void main() {

    float alphaTexture = texture(uTexture, gl_PointCoord).r;

    vec3 Color = mix(uColorA,uColorB, vFireProgress);


       gl_FragColor = vec4(Color, alphaTexture);
     }