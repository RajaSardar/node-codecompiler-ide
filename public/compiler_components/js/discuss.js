/* 
    Javascript codes that control the client side
    discussion system.

    Author: Satheesh Kumar D
    Date: 19-10-2017
    Project: Offline Code Compiler
    Organisation: Code Lordz

*/
var interval;

$('document').ready(function(){
    $('#title').keydown(function(){
        var length = $('#title').val().length;
        if(length >= 15 && length <= 40 && $('#title').val()!= " "){
            $('#body').removeAttr('disabled');
        }
        else{
            $('#body').attr('disabled', 'disabled');
        }
    });
    $('#body').keydown(function(){
        $('#title').attr('disabled', 'disabled');
        var length = $("#body").val().length;
        if(length >= 25){
            $("#submit").removeAttr('disabled');
        }
        else{
            $("#submit").attr('disabled', 'disabled');
        }
    });
    $("#submit").click(function(){
        var author = $("#author").val();
        var title = $("#title").val();
        var body = $("#body").val();
        var errors = "";
        if(title.length < 15){
            errors += "Length of Title is less than 15!</br>";
        }
        if(body.length < 25){
            errors += "Length of Content is less than 25!</br>"
        }
        if(errors.length > 0){
            $("#error-msg").html("<h5>ERROR:</h5>");
            $("#error-msg").append(errors);
            $("#submit").attr('disabled', 'disabled');
        }
        else{
            var req_url = '/discuss/add';
            var data = {
                author: author,
                title: title,
                body: body
            };
            $.post(req_url, data, function(data, status, jqXHR){
                console.log('AddDiscussion Request Status: '+status);
                window.location.reload();
            });;
        }
    });
    $("#solution").keydown(function(){
        var solution = $("#solution").val();
        if(solution.length > 10 && solution.length < 200){
            $("#submit_soln").removeAttr('disabled');
        }
        else{
            $("#submit_soln").attr('disabled', 'disabled');
        }
    });
    $("#submit_soln").click(function(){
        $("#submit_soln").html("Submitting....");
        $("#submit_soln").attr('disabled', 'disabled');
        var discussion = $("#solution").attr('discussion');
        var solution = $("#solution").val();
        var req_url = '/discuss/addsolution';
        var data = {
            discuss: discussion,
            solution: solution
        };
        $.post(req_url, data, function(data, status, jqXHR){
            console.log('AddSolution Request Status: '+status);
        });
        interval = setInterval(openButton, 1000);
    });
});

var count_for_discuss = 50;

function openButton(){
    if(count_for_discuss < 0){
        $("#submit_soln").html("Add Solution");
        $("#submit_soln").removeAttr('disabled');
        count_for_discuss = 50;
        clearInterval(interval);
        window.location.reload();
    }
    else{
        $("#submit_soln").html("Wait ("+count_for_discuss+")"+ " secs");
        $("#solution").val("");
        count_for_discuss--;
    }
}
function openMyThreads(){
    window.location.assign("/discuss/my");
}