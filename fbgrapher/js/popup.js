// config
var graph = 'https://www.facebook.com/search/';

/** GRAPH SEARCH PEOPLE
 * Age :
 * equal to 	=> https://www.facebook.com/search/19/users-age
 * between		=> https://www.facebook.com/search/22/19/users-age-2
 * younger than => https://www.facebook.com/search/22/users-younger
 * born in 		=> https://www.facebook.com/search/1994/date/users-born
 * older than 	=> https://www.facebook.com/search/25/users-older
 *
 * https://www.facebook.com/search/22/19/users-age-2/females/intersect
 */
$('#people_gender > label').click(function() {
	$(this).siblings().removeClass('btn-primary').addClass('btn-default').prop('checked', false);
	$(this).addClass('btn-primary').prop('checked', true);
});

function getAge(age_value) {
	var option;
	for (var i=13; i<100; i++) {
		option += '<option value="' + i +'">' + i + '</option>';
	}

	return '<div class="people_age col-md-3">\
              <select id="people_age_' + age_value + '" class="form-control">\
                '+ option +'\
              </select>\
            </div>';
}

$('#people_age').change(function() {
	$('.people_age').remove();
	var value = $('#people_age').val();
    
    if (/equal|older|younger/.test(value)) {
    	$(this).parent().parent().append(getAge(value));
    } else if (value == 'between') {
    	$(this).parent().parent().append(getAge('between_from')).append(getAge('between_to'));
    } else if (value == 'born') {
    	$(this).parent().parent().append('<div class="people_age col-md-3"><input id="people_age_born" type="number" class="form-control col-md-3" value="1994" ></div>');
    }
})

$('#people_search').click(function(e) {
	e.preventDefault();
	// age
	var age_value = $('#people_age').val();
	var age = $('#people_age').find('option[value="' + age_value +'"]').attr('data-graph');
	if (/equal|older|younger|born/.test(age_value)) {
		age = $('#people_age_' + age_value).val() + '/' + age;
	} else if(age_value == 'between') {
		age = $('#people_age_between_from').val() + '/' + $('#people_age_between_to').val() + '/' + age;
	}


	var gender 			= $('input[name="gender"]:checked').val();
	var relationship 	= $('#people_relationship').val();
	var live 			= $('#people_live').val() == false ? '' : 'str/'+$('#people_live').val()+'/pages-named/residents/';
	var url 			= graph + gender + relationship + age + live + 'intersect';
	console.log(url);
	var win = window.open(url, '_blank');
	win.focus();
})

// woman who are single and older than 17 and younger than 20 and live in plumpang