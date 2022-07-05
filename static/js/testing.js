var c = document.getElementById("output-canvas");
var ctx = c.getContext("2d");
data = JSON.parse(data);
$(window).on("load", ()=>{
    $("#output-canvas").width(data.size[0]);
    $("#output-canvas").height(data.size[1]);
})
for (const i in data.svg) {
    if (Object.hasOwnProperty.call(data.svg, i)) {
        const e = data.svg[i];
        ctx.moveTo(0, 0);
        ctx.lineTo(210, 210);
    }
}
ctx.stroke();
