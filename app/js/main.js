// Floating label plugin
var floatlabels = new FloatLabels('body', {
  customEvent: null,
  customLabel: null,
  customPlaceholder: null,
  exclude: '.no-label',
  inputRegex: /email|number|password|search|tel|text|url/,
  prefix: 'fl-',
  prioritize: 'label',
  style: 0,
  transform: 'input, select, textarea'
});


// date picker
$('[data-toggle="datepicker"]').datepicker({
  zIndex: 9999,
  autoHide: true,
  pickedClass: 'picked-date'
});

$('#fromDate, #toDate').on('show.datepicker', function () {
  floatlabels.rebuild();
  console.log(floatlabels);
});

// Make timepicker inputs readonly on mobile only
var width = jQuery(window).width();
if(width < 768) {
  $('.schedule-date').text(function(index, currentText) {
    return currentText.substr(0, 3);
});
}

jQuery(".timepicker").prop('readonly', true);
// remove value button
$('.remove-value').on('click', function () {  
      $(this).siblings('.timepicker').val('');
      $(this).siblings('.timepicker-drop').hide();
});

// TImepicker
var inputs = document.querySelectorAll('.timepicker');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('focus', function () {
    this.parentNode.appendChild(document.querySelector('.timepicker-drop'));
  });
}

$('.timepicker').on('focus', function () {
  var visible = $(this).closest('.time-holder').find('.timepicker-drop');
  var checkboxes = $(this).closest('.time-holder').find(".timepicker-drop input[name='time']");
  var buttonsM = $(this).closest('.time-holder').find(".timepicker-drop .maridian button");
  checkboxes.prop('checked', false);
  buttonsM.prop("disabled", true);
  // buttonsM.removeClass('active');
  visible.css('display', 'block');
});


$('.timepicker-close').on('click', function (e) {
  e.stopPropagation();
  var closed = $(this).closest('div.timepicker-drop');
  // closed.find('.maridian button').removeClass('active');
  closed.find("input[name='time']").prop('checked', false);
  closed.hide(0);
})


$('.time-values input:radio').change(function () {
  var hourInput = $(this).closest('.time-holder').find('.timepicker');
  var timeButtons = $(this).closest('.time-holder').find('.timepicker-drop .maridian button');
  var activeButton = $(this).closest('.time-holder').find('.timepicker-drop .maridian button.active').text();
  timeButtons.removeAttr('disabled');
  var hourValue = $(".time-values input[type='radio']:checked").val();
  $(hourInput).val(hourValue + ':00 ' + activeButton);
});

$('.maridian button').on('click', function() {
  $('.maridian button').removeClass('active');
  $(this).addClass('active');
  var maridianValue = $(this).text();
  var addMaridian = $(this).closest('.time-holder').find('.timepicker');
  var currentValue = addMaridian.val();
    if(currentValue.length == 8) {
      addMaridian.val(currentValue.slice(0, -2) + '' + maridianValue);
    } else {
      addMaridian.val(currentValue + maridianValue);
    }
    console.log(addMaridian.val());
})



// Jquery Masking

$(document).ready(function () {
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.zip').mask('00000');
  $('.phone').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', { reverse: true });
  $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
  $('.money').mask('000,000,000,000,000.00', { reverse: true });
  $('.money2').mask('#.##0,00', { reverse: true });
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      Z: {
        pattern: /[0-9]/,
        optional: true
      }
    }
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', { reverse: true });
  $('.clear-if-not-match').mask('00/00/0000', { clearIfNotMatch: true });
  $('.placeholder').mask('00/00/0000', { placeholder: '__/__/____' });
  $('.fallback').mask('00r00r0000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/'
      },
      placeholder: '__/__/____'
    }
  });
  $('.selectonfocus').mask('00/00/0000', { selectOnFocus: true });
});

// Review question slider
$('.questions').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true
});





// iOS switch - switchery 
if ($('.switch').length) {
  var elem = document.querySelector('.js-switch');
  var init = new Switchery(elem, { size: 'small', color: '#4B80FD' });
}



// sweet alert delete modal

$('#deleteExperience').on('click', function () {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger mr-3',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      swalWithBootstrapButtons(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons(
        'Cancelled',
        'You aborted',
        'error'
      )
    }
  })
});


// Disclaimer 
$('.hanger').on('click', function () {
  $('.popover-disclaimer').toggleClass('popover-hide');
  $('.arrow-toggle').toggleClass('fa-angle-up fa-angle-down');
})