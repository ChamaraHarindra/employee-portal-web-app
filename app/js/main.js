// Floating label plugin
var floatlabels = new FloatLabels('body', {
  customEvent: null,
  customLabel: null,
  customPlaceholder: null,
  exclude: '.no-label',
  inputRegex: /email|number|password|search|tel|text|url/,
  prefix: 'fl-',
  prioritize: 'label',
  style: 2,
  transform: 'input, select, textarea'
});

// Data tables
$(document).ready(function() {
  $('.data-tables').DataTable();
});

$('#reviewTable').dataTable({
  language: {
    emptyTable: 'No Reviews added so far'
  }
});

// date picker
$('[data-toggle="datepicker"]').datepicker({
  zIndex: 9999,
  autoHide: true
});

$('[data-toggle="datepicker"]').on('pick.datepicker', function() {
  floatlabels.rebuild();
});

// Jquery Masking

$(document).ready(function() {
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

$('.questions').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true
});



// Time picker
var options = { 
now: "00:00", //hh:mm 24 hour format only, defaults to current time 
twentyFour: false, //Display 24 hour format, defaults to false 
upArrow: 'wickedpicker__controls__control-up', //The up arrow class selector to use, for custom CSS 
downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS 
close: 'wickedpicker__close', //The close class selector to use, for custom CSS 
hoverState: 'hover-state', //The hover state class to use, for custom CSS 
title: 'Timepicker', //The Wickedpicker's title, 
showSeconds: false, //Whether or not to show seconds, 
secondsInterval: 1, //Change interval for seconds, defaults to 1  , 
minutesInterval: 0, //Change interval for minutes, defaults to 1 
beforeShow: null, //A function to be called before the Wickedpicker is shown 
show: null, //A function to be called when the Wickedpicker is shown 
clearable: true, //Make the picker's input clearable (has clickable "x")  
};
$('.timepicker').wickedpicker(options);

$(document).ready(function() {
  $('.hasWickedpicker').val('');
})

// iOS switch - switchery 
var elem = document.querySelector('.js-switch');
var init = new Switchery(elem, { size: 'small', color: '#4B80FD' });

// sweet alert delete modal

$('#deleteExperience').on('click', function() {
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
$('.hanger').on('click', function() {
  $('.popover-disclaimer').toggleClass('popover-hide');
  $('.arrow-toggle').toggleClass('fa-angle-up fa-angle-down');
})