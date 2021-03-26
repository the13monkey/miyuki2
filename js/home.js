$(document).ready( () => {

    const flipCategory = () => {

        let categories = $(".category")
        let activeCategory = $(".category.active")
        if (activeCategory.is(":last-child")) {
            categories.first().addClass("active")
        } else {
            activeCategory.next().addClass("active")
        }
        activeCategory.removeClass("active")
    }

    let interval = setInterval(flipCategory, 2000)

    $(".category").on("mouseenter",() =>{
        clearInterval(interval)
    })
    $(".category").on("mouseleave",() =>{
        interval = setInterval(flipCategory, 2000)
    })

}); /** End of Document */