class Organization{
  constructor(name,url,description,is_active,is_verified){
    this.name=name;
    this.url=url;
    this.description=description;
    this.is_active=is_active?1:0;
    this.is_verified=is_verified?1:0;
  }
}
function clickButton() {
  var company = new Organization($('#name').val(),$('#url').val(),$('#description').val(),$('#is_active').is(':checked'),$('#is_verified').is(':checked'));
  console.log(company);
  postCompany(company);
  printCompanies();
  printCompanies();
}
function postCompany(company) {
  $.ajax({
    method:"POST",
    url:"https://api.saministro.com/companies",
    data:company
  });
}
function getCompanies() {
  var x=[];
  $.ajax({
    async:false,
    method:"GET",
    url:"https://api.saministro.com/companies",
    success:function(data){
      for(var i=0;i<data.length;i++){
      x.push(data[i]);
    }
    }
  });
  return x;
}
function printCompanies(){
  var array = getCompanies();
  $( 'ul' ).empty();
   for(let i=0;i<array.length;i++){
     $( 'ul' ).append('<li id=\"'+ array[i].id +'\"><button type="button" class="close" onclick="closeButton('+array[i].id+')">X</button> id:'+array[i].id+'<br> name:'+array[i].name+'<br> url:'+array[i].url+'<br> description:'+array[i].description+'<br> is_active:'+array[i].is_active+'<br> is_verified:'+array[i].is_verified+'</li>');
  }
}
function clickButton1(){printCompanies();}
function closeButton(id){
deleteCompany(id);
//$('#'+id).remove();
getCompanies();
printCompanies();
}
function deleteCompany(id){
  $.ajax({
    type:"DELETE",
    url:"https://api.saministro.com/companies/"+id
  });
}
