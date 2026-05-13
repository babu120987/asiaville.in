$(document).ready(function(){
	$(".dropdown-trigger").dropdown();
});

function notification(type,message){
    if(type=='error'){
        $('.modal-content #content').addClass('error');
        $('.modal-content #content').removeClass('success');
        $('.modal-content #content').html('<i class="fa fa-exclamation-circle" aria-hidden="true"></i><p>'+message+'</p>');
    }else if(type=='success'){
        $('.modal-content #content').addClass('success');
        $('.modal-content #content').removeClass('error');
        $('.modal-content #content').html('<i class="fa fa-check-circle" aria-hidden="true"></i><p>'+message+'</p>');
    }else{
        $('.modal-content #content').removeClass('success');
        $('.modal-content #content').removeClass('error');
        $('.modal-content #content').html('<p>'+message+'</p>');
    }
    $('#notificationmodal').modal('show');
    setTimeout(function(){$('#notificationmodal').modal('hide');},4000);
}

function custom_notification(message,title_txt='Notification',color=""){
    c_notification_txt = document.createElement('p');
    c_notification_txt.innerHTML = message;

    c_notification_body = document.createElement('div')
    c_notification_body.setAttribute("class","c_notification_body");
    c_notification_body.append(c_notification_txt)


    title = document.createElement('p');
    title.innerHTML = title_txt;

    closeicon = document.createElement('button');
    closeicon.setAttribute("type","button");
    closeicon.setAttribute("class","notificationclose");
    closeicon.setAttribute("aria-label","close");
    closeicon.innerHTML = '<span aria-hidden="true">&times;</span>';



    c_notification_title = document.createElement('div')
    c_notification_title.setAttribute("class","c_notification_title");
    c_notification_title.append(title,closeicon)

    if(color!=''){
        c_notification_title.setAttribute("class","c_notification_title "+color)
    }

    c_notification_block = document.createElement('div')
    c_notification_block.setAttribute("class","c_notification_block");
    c_notification_block.append(c_notification_title,c_notification_body)

    c_notification = document.createElement('div')
    c_notification.setAttribute("class","c_notification");
    c_notification.append(c_notification_block)


    $("body").append(c_notification);
    $(".c_notification").fadeIn();
    setTimeout(function(){
        $(".c_notification").fadeOut(1000,'linear',);
            setTimeout(function(){
                $('.c_notification').remove()  
            },1000);
    },3500);
}

$(document).on('change','select#pagename',function(e){
    e.preventDefault();
    var response = getdata_ajax($(this).attr('data-action')+'/'+$(this).val());

    $('input[name="title"]').val(response.title);
    $('textarea[name="meta"]').val(response.meta);
});

$(document).on('change','select.change_status',function(e){
    e.preventDefault();
    var response = getdata_ajax($(this).attr('data-action')+'/'+$(this).attr('data-id')+'/'+$(this).val(),'true');
});


$(document).on('change','select.change_category',function(e){
    e.preventDefault();
    var response = getdata_ajax($(this).attr('data-action')+'/'+$(this).attr('data-id')+'/'+$(this).val(),'true');
});



$(document).on('click','a.delete-btn',function(e){
    e.preventDefault();
    var response = getdata_ajax($(this).attr('data-url'),'true');
    $($(this).attr('data-removeid')).remove();
});


// $(document).on('click','a.edit-img-btn',function(e){
//     e.preventDefault();
//     var action_url =  $(this).attr('data-updateurl')
//     var getdata_url = $(this).attr('data-geturl')
//     var modal = $(this).attr('data-modal')
//     console.log(modal)
//     var response = getdata_ajax(getdata_url);

//     $('form'+modal).attr('data-action',action_url);
//     $('form'+modal+' input[name="name"]').val(response.name);
//     $('form'+modal+' input[name="link"]').val(response.link);
//     $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
//     $('form'+modal+' img').attr('src',response.image);
//     $(modal).modal('show');
// });


$(document).on('click','a.edit-img-btn',function(e){
    e.preventDefault();
    var action_url =  $(this).attr('data-updateurl')
    var getdata_url = $(this).attr('data-geturl')
    var modal = $(this).attr('data-modal')
    console.log(modal)
    var response = getdata_ajax(getdata_url);

    $('form'+modal).attr('data-action',action_url);
    $('form'+modal+' input[name="name"]').val(response.name);
    $('form'+modal+' input[name="link"]').val(response.link);
    $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
    $('form'+modal+' img#imageurl').attr('src',response.image);
    if(response.mobileimage){
        $('form'+modal+' img#mobileimageurl').attr('src',response.mobileimage);
    }
    $(modal).modal('show');
});





$(document).on('click','a.edit-address-btn',function(e){
    e.preventDefault();
    var action_url =  $(this).attr('data-updateurl')
    var getdata_url = $(this).attr('data-geturl')
    var modal = $(this).attr('data-modal')
    var response = getdata_ajax(getdata_url);

    $('form'+modal).attr('data-action',action_url);
    $('form'+modal+' input[name="title"]').val(response.title);
    $('form'+modal+' input[name="address_line1"]').val(response.address_line1);
    $('form'+modal+' input[name="address_line2"]').val(response.address_line2);
    $('form'+modal+' input[name="address_line3"]').val(response.address_line3);
    $('form'+modal+' input[name="bgcolor"]').val(response.bgcolor);
    $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
    $('form'+modal+' img').attr('src',response.image);
    $(modal).modal('show');
});
$(document).on('click','a.edit-banner-btn',function(e){
e.preventDefault();
    var action_url =  $(this).attr('data-updateurl')
    var getdata_url = $(this).attr('data-geturl')
    var modal = $(this).attr('data-modal')
    var response = getdata_ajax(getdata_url);

    $('form'+modal).attr('data-action',action_url);
    $('form'+modal+' input[name="name"]').val(response.name);
    $('form'+modal+' input[name="link"]').val(response.link);
    $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
    $('form'+modal+' select[name="language_id"]  option[value="'+response.language_id+'"]').attr('selected', 'selected');
    $('form'+modal+' img#imageurl').attr('src',response.image);
    $('form'+modal+' img#mobileimageurl').attr('src',response.mobileimage);
    $(modal).modal('show');
});

$(document).on('click','a.edit-member-btn',function(e){
e.preventDefault();
    var action_url =  $(this).attr('data-updateurl')
    var getdata_url = $(this).attr('data-geturl')
    var modal = $(this).attr('data-modal')
    var response = getdata_ajax(getdata_url);

    $('form'+modal).attr('data-action',action_url);
    $('form'+modal+' input[name="name"]').val(response.name);
    $('form'+modal+' input[name="designation"]').val(response.designation);
    $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
    $('form'+modal+' select[name="category_id"]  option[value="'+response.category_id+'"]').attr('selected', 'selected');
    $('form'+modal+' img').attr('src',response.image);
    $(modal).modal('show');
});

$(document).on('click','a.edit-category-btn',function(e){
    e.preventDefault();
    var action_url =  $(this).attr('data-updateurl');
    var getdata_url = $(this).attr('data-geturl');
    var modal = $(this).attr('data-modal');
    var response = getdata_ajax(getdata_url);

    $('form'+modal).attr('data-action',action_url);
    $('form'+modal+' input[name="name"]').val(response.name);
    $('form'+modal+' select[name="status"]  option[value="'+response.status+'"]').attr('selected', 'selected');
    $(modal).modal('show');
});

$(document).on('click','.change-file',function(e){
    e.preventDefault();
    var displayid = $(this).attr('data-display');
    var hideid    = $(this).attr('data-hide');

    $('#'+hideid).addClass('hide');
    $('#'+displayid).removeClass('hide');
});


$(document).on('click','.change-image',function(e){
    e.preventDefault();
    var displayid = $(this).attr('data-display');
    var hideid    = $(this).attr('data-hide');

    $('#'+hideid).addClass('hide');
    $('#'+displayid).removeClass('hide');
});



$(document).on('click','.change-section-file',function(e){
    e.preventDefault();
    var displayid = $(this).attr('data-display');
    var hideid    = $(this).attr('data-hide');
    var url = $(this).attr('data-url');
    var html_code = getdata_ajax(url)
    $('#'+displayid).html(html_code);
    $('#'+hideid).addClass('hide');
    $('#'+displayid).removeClass('hide');
});

$(document).on('click','.unchange-section-file',function(e){
    e.preventDefault();
    console.log('clicked');
    var displayid = $(this).attr('data-display');
    var hideid    = $(this).attr('data-hide');
    $('#'+hideid).addClass('hide');
    $('#'+hideid).empty();
    $('#'+displayid).removeClass('hide');
});


$(document).on('click','.edit-display-order',function(e){
    e.preventDefault();
    $($(this).attr('data-input')).attr('disabled', false);
    $(this).removeClass('update-display-order');
    $(this).html('update display order');
    $(this).addClass('update-display-order');
});


$(document).on('click','.update-display-order',function(e){
    var datas = document.querySelectorAll($(this).attr('data-input'));
    var action = $(this).attr('data-action');
    var method = 'post';
    var formdata = new FormData();
    datas.forEach(data=>{
        var key = data.getAttribute('data-id');
        var val = data.value;
        formdata.append(key,val);
    });
    $.ajax({
        url: $(this).attr('data-action'),
        type: 'post',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function(){
            $(this).attr('disabled',true);
        },
        success: function (data) {
            var result = jQuery.parseJSON(data);
            if(result.message!=undefined){
                if(result.status=='success'){
                    custom_notification(result.message,'success','green')
                }else{
                    custom_notification(result.message,'Error','red')
                }
            }
            return false;
        }
    });

    $($(this).attr('data-input')).attr('disabled', 'disabled');
    $(this).addClass('update-display-order');
    $(this).removeClass('update-display-order');
    $(this).html('edit display order');
    $(this).attr('disabled', false); 
});

function getdata_ajax(url,successnotification=false){
    var response ;
    $.ajax({
        url: url,
        type: 'get',
        processData: false,
        contentType: false,
        async:false,
        success: function (data) {
            var result = jQuery.parseJSON(data);
            if(result.status=='error'){
                custom_notification(result.message,'Error','red')
            }else{
                if(successnotification == true && result.status=='success'){
                        custom_notification(result.message,'success','green')
                }
                if(result.data!= undefined){
                    response = result.data
                }
                if(result.html!= undefined){
                    response = result.html
                }
            }
        }   
    });
    return response ;  
}

$(document).on('change','.radio-inputtype',function(e){
    e.preventDefault();
    var id = $(this).attr('data-id');
    var value = $(this).attr('data_type');
    $(id).attr('type',value);


    var thumbid = $(this).attr('data-id-thumbnail');
    if(thumbid!=undefined){
        $(id+'_thumbnail').before('<label id="'+id.replace('#','')+'thumbnailtext">'+id.replace('#','')+' Select Thumbnail</label>');
        $(id+'_thumbnail').attr('name',id.replace('#','')+'_thumbnail');
        $(id+'_thumbnail').attr('hidden',false);
    }else{
        $(id+'thumbnailtext').remove();
        $(id+'_thumbnail').attr('name','');
        $(id+'_thumbnail').attr('hidden',true);
    }
});

$(document).on('click','.change-enable',function(e){
    e.preventDefault();
    $($(this).attr('data-showid')).removeClass('hide');
    $($(this).attr('data-hideid')).addClass('hide');
});

$(document).on('submit','form.ajax-form',function(e){
	e.preventDefault();
    var id = 'form#'+$(this).attr('id');
    var btn = id+'button[type="submit"]';
    var modelid = $(this).attr('data-model');
    var htmlblock = $(this).attr('data-html');
	$.ajax({
        url: $(this).attr('data-action'),
        type: $(this).attr('data-method'),
        data: new FormData(this),
        processData: false,
        contentType: false,
        beforeSend: function(){
            $(btn).attr('disabled',true);
        },
        success: function (data) {
            var result = jQuery.parseJSON(data);
            if(result.message!=undefined){
                if(result.status=='success'){
                    custom_notification(result.message,'success','green')
                }else{
                    custom_notification(result.message,'Error','red')
                }
            }
            if(htmlblock!=undefined){
                $(htmlblock).html(result.html)
            }
            return false;
        }
    }).done(function(){
            $(id).trigger("reset");
            $(btn).attr('disabled',false);
            if(modelid!=undefined){
                $(modelid).modal('hide')
            }
    });        
});
