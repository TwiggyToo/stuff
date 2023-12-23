function play(x){
    //clears any local storage so maze runs smoothly
    localStorage.clear();
    if(x==1){
        //changes href based on x, x is 1 when clicked on from About page
        location.href = "one.html";
    }
    else{
        location.href = "html/one.html";
    }
}

function about(){
    //directs user to about page
    location.href = "html/about.html";
}

function endless(){
    location.href = "endless.html";
}