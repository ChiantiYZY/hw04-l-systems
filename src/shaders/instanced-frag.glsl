#version 300 es
precision highp float;
uniform mat4 u_ViewProj;
uniform float u_Time;
uniform mat3 u_CameraAxes;

in vec4 fs_Col;
in vec4 fs_Pos;
//in vec4 fs_Rot;

out vec4 out_Col;



void main()
{
    float dist = length(fs_Pos.xyz) * 1.0;
    //dist = 1.0;
    out_Col = vec4(dist) * fs_Col;
   // out_Col = fs_Rot;
}
