$(".jq_ul li")
  .mouseenter(function(e) {
    // vanilla javascript properyty value
    // e.target.style.backgroundColor = "red";
    // e.target.style.color="white";
    
    // vanilla javascript style value
    // e.target.style = "background-color: red; color: white;";
    
    // jquery css(property, value)
    // $(e.target).css("backgroundColor","red").css("color","white");
    
    // jquery css(json object)
    $(e.target).css({backgroundColor: "red", color: "white"});
  })
  .mouseleave(function(e) {
    // e.target.style = "";
    $(e.target).css({backgroundColor: "", color: ""});
  })
  .click(function(e) {
    $(e.target).toggleClass("active");
  });

$("#dialogTest").dialog();
// $("#selectableTest").sortable();
$("#selectableTest").selectable();
