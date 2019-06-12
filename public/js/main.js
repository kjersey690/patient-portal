$(document).ready(function(){
  $('.delete-patient').on('click', function(e){
    console.log("inside jquery");
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/patients/'+id,
      success: function(response){
        alert('Delete Patient');
        window.location.href="/";
      },
      err: function(err){
        console.log(err);
      }
    });
  });
});

 $('.patient-btn').click(function(e){
  $target = $(e.target);
    const id = $target.attr('data-id');
  window.location = '/patients/'+id;

 });

 $('.edit-btn').click(function(e){
  $target = $(e.target);
    const id = $target.attr('data-id');
  window.location = '/patients/edit/'+id;

 });


