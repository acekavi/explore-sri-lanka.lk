const learnMoreBtn = document.querySelector(".btn");
 
learnMoreBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const href = learnMoreBtn.getAttribute("href");
    
    document.querySelector(href).scrollIntoView({
        behavior: "smooth"
    });
});