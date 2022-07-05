let drawable = false;
let isDown = false;
let color = "red";
const buffer = 10;
const svgns = "http://www.w3.org/2000/svg";

$(window).on("load", ()=>{
    $("#select").prop("checked", true);
    $("#concrete").prop("checked", true);
});

$("#concrete").on("change", ()=> {if($("#concrete").prop("checked")) color="red"});
$("#wood").on("change", ()=> {if($("#wood").prop("checked")) color="brown"});
$("#metal").on("change", ()=> {if($("#metal").prop("checked")) color="grey"});
$("#glass").on("change", ()=> {if($("#glass").prop("checked")) color="blue"});

// draw selection 
$("#draw").on("change", ()=>{
    if($("#draw").prop("checked")){
        drawable = true;
        $("#canvas").css("cursor", "crosshair");
    }
});

$("#select").on("change", ()=>{
    if($("#select").prop("checked")){
        drawable = false;
        $("#canvas").css("cursor", "pointer");
    }
});

$("#undo").click(()=>$('#canvas').find("line:last").remove());


// drawing

// translate client coordinate to canvas coordinate
svgPoint = (element, x, y) => {
    const pt = element.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(element.getScreenCTM().inverse());
};

function distance(A, B) {
    return Math.sqrt((Math.pow((A[0]-B[0]), 2) + Math.pow((A[1]-B[1]), 2)));
}

const _zero2D = [0, 0]

function closestPointBetween2D(P, A, B) {
    const v = [B[0] - A[0], B[1] - A[1]]
    const u = [A[0] - P[0], A[1] - P[1]]
    const vu = v[0] * u[0] + v[1] * u[1]
    const vv = v[0] ** 2 + v[1] ** 2
    const t = -vu / vv
    if (t >= 0 && t <= 1) return _vectorToSegment2D(t, _zero2D, A, B)
    const g0 = _sqDiag2D(_vectorToSegment2D(0, P, A, B))
    const g1 = _sqDiag2D(_vectorToSegment2D(1, P, A, B))
    return g0 <= g1 ? A : B
}

function _vectorToSegment2D(t, P, A, B) {
    return [
        (1 - t) * A[0] + t * B[0] - P[0],
        (1 - t) * A[1] + t * B[1] - P[1],
    ]
}

function _sqDiag2D(P) { return P[0] ** 2 + P[1] ** 2 }

function collission(p) {
    let temp = {
        point: null,
        dist: null
    }
    for (let i = 0; i < $("line").length - 1; i++) {
        const e = $("line")[i];
        let cp = closestPointBetween2D(p, [e.x1.baseVal.value, e.y1.baseVal.value], [e.x2.baseVal.value, e.y2.baseVal.value]);
        let dist = distance(p, [cp[0], cp[1]]);
        if (dist <= buffer) {
            if (!temp.dist) {
                temp.point = cp;
                temp.dist = dist;
            }
            else{
                if (temp.dist > dist) {
                    temp.dist = dist;
                    temp.point = cp;
                }
            }
        }
        
    }
    if(temp.point) return temp.point;
    else return p;
}


$("#canvas").on("mousedown", (e)=>{
    let svgP = svgPoint(canvas, e.clientX, e.clientY);
    let col = collission([svgP.x, svgP.y]);
    if (drawable) {
        if (!isDown) {
            x1 = col[0];
            y1 = col[1];
        let newLine = document.createElementNS(svgns, "line");
        newLine.setAttribute("x1", `${x1}`);
        newLine.setAttribute("y1", `${y1}`);
        newLine.setAttribute("x2", `${x1}`);
        newLine.setAttribute("y2", `${y1}`);
        newLine.setAttribute("style", "stroke-width:2; stroke-linecap:square");
        newLine.setAttribute("stroke", `${color}`);
        $("#canvas").append(newLine);   
        isDown = true;
    }
    }
});

$("#canvas").on("mouseup", (e)=>{
    isDown = false;
    let svgP = svgPoint(canvas, e.clientX, e.clientY);
    let col = collission([svgP.x, svgP.y]);
    let lines = document.getElementsByTagName("line");
    lines[lines.length - 1].setAttribute(
        "x2",
        `${col[0]}`
    );
    lines[lines.length - 1].setAttribute(
        "y2",
        `${col[1]}`
    );
});

$("#canvas").on("mousemove", (e)=>{
    let svgP = svgPoint(canvas, e.clientX, e.clientY);
      if (isDown) {
        canvas.lastChild.setAttribute("x2", `${svgP.x}`);
        canvas.lastChild.setAttribute("y2", `${svgP.y}`);
      }
})
