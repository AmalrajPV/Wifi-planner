// zoom
// return scale parameter
const getTransformParameter = (element) => {
    const transform = element.css("transform");
    let scale = 1,
    x = 0,
    y = 0;
    let matrix = transform.replace("matrix(", "").split(",");
    scale = parseFloat(matrix[0])
    x = parseFloat(matrix[1])
    y = parseFloat(matrix[2])
    return { scale, x, y };
};

// convert the data to string 
const getTransformString = (scale, x, y) => "scale(" + scale + ") " + "translateX(" + x + "%) translateY(" + y + "%)";
  
  
const zoom = (val) => {
    const { scale, x, y } = getTransformParameter($("#canvas"));
    let dScale = 0.1;
    if (val == -1) dScale *= -1;
    if (val == -1 && scale <= 0.1) dScale = 0;
    if (val == 1 && scale > 2) dScale = 0;
    $("#canvas").css("transform", getTransformString(scale + dScale, x, y));
};
  

//   1=zoom in, -1 = zoom out
$('#zplus-btn').click(()=>zoom(1));
$('#zmin-btn').click(()=>zoom(-1));
