#version 300 es

uniform mat4 u_ViewProj;
uniform float u_Time;

uniform mat3 u_CameraAxes; // Used for rendering particles as billboards (quads that are always looking at the camera)
// gl_Position = center + vs_Pos.x * camRight + vs_Pos.y * camUp;

in vec4 vs_Pos; // Non-instanced; each particle is the same quad drawn in a different place
in vec4 vs_Nor; // Non-instanced, and presently unused
in vec4 vs_Col; // An instanced rendering attribute; each particle instance has a different color
// in vec3 vs_Translate; // Another instance rendering attribute used to position each quad instance in the scene
 in vec4 vs_Transform1;
  in vec4 vs_Transform2;
   in vec4 vs_Transform3;
    in vec4 vs_Transform4;
in vec2 vs_UV; // Non-instanced, and presently unused in main(). Feel free to use it for your meshes.

out vec4 fs_Col;
out vec4 fs_Pos;
//out vec4 fs_Rot;


vec4 multQuat(vec4 q1, vec4 q2)
{
return vec4(
q1.w * q2.x + q1.x * q2.w + q1.z * q2.y - q1.y * q2.z,
q1.w * q2.y + q1.y * q2.w + q1.x * q2.z - q1.z * q2.x,
q1.w * q2.z + q1.z * q2.w + q1.y * q2.x - q1.x * q2.y,
q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
);
}

vec4 rotate_vector( vec4 quat, vec4 vec )
{
vec4 qv = multQuat( quat, vec);
return multQuat( qv, vec4(-quat.x, -quat.y, -quat.z, quat.w) );
}


void main()
{
    fs_Col = vs_Col;
    fs_Pos = vs_Pos;
    // fs_Rot = abs(vs_Rotate);

    // vec3 offset = vs_Translate;
    // vec4 rotate = (vs_Rotate);
    // //offset.z = (sin((u_Time + offset.x) * 3.14159 * 0.1) + cos((u_Time + offset.y) * 3.14159 * 0.1)) * 1.5;

    mat4 trans = mat4(vs_Transform1, vs_Transform2, vs_Transform3, vs_Transform4);
    vec4 pos = trans * vs_Pos;

    // vec4 pos = rotate_vector(vs_Rotate, vs_Pos + vec4(offset, 0.0));
    pos -= vec4(0, 8.0, 0, 0);

    //fs_Pos = pos;
    //pos = vec4(0.5 * vec2(pos), pos.zw);
    //vec3 billboardPos = offset + vs_Pos.x * u_CameraAxes[0] + vs_Pos.y * u_CameraAxes[1];
    //vec3 billboardPos = offset + pos.x * u_CameraAxes[0] + pos.y * u_CameraAxes[1];
    //billboardPos = rotate * billboardPos;

    //gl_Position = u_ViewProj * vec4(billboardPos, 1.0);


      vec3 color = vec3(0.2314, 0.149, 0.0);

    //gl_Position = u_ViewProj * vs_Pos;
    gl_Position = u_ViewProj * vec4(0.7 * vec3(pos), pos.w);
    //gl_Position = u_ViewProj * pos;

}
