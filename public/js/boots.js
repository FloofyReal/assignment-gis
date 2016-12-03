$(document).ready(function(){
  activaTab('shop');
});

function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};
