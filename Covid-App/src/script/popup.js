function show() {
    document.getElementById("popup").style.display = "block";
}

function hide() {
    document.getElementById("popup").style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("country").value = "";
}