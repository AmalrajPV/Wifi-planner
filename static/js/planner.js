$(window).on("load", ()=>{
    $("#transparancy-range").val(0.5);
    $("#transparancy-layer").css("opacity", 0.5);

    const actualImage = new Image();
    actualImage.src = $("#canvas").css("background-image").replace(/url\(['"]*(.*?)['"]*\)/g, '$1');
    if(actualImage.src){
    actualImage.onload = ()=>{
        let cbWidth = $("#canvas-box").width();
        let cbHeight = $("#canvas-box").height();
        let ratio = actualImage.height / actualImage.width;
        $("#canvas").width(cbWidth);
        let calcHeight = ratio * cbWidth;
        if (cbHeight < calcHeight) {
            $("#canvas").height(cbHeight);
            $("#canvas").width(cbHeight / ratio);
        }
        else{
            $("#canvas").height(calcHeight);
        }
    }
}
});

// transparancy
$("#transparancy-range").on("input", (e)=>{
    $("#transparancy-layer").css("opacity", e.target.value);
});

