var pageX;
var pageY;
var editor;

  $(document).on("mousedown", function (e) {
    pageX = e.pageX;
    pageY = e.pageY;
    $('ul.color').fadeOut(200);
  });
  $('.pages').on('mouseup', function () {
    noteHighlight();                    //
    $('textarea.note').fadeOut(200);    //so that any existing instance of note and noteHighlight will be removed when new highlight is selected
    $('ul.color').fadeOut(200);         //

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    editor = { "startContainer": range.startContainer, "startOffset": range.startOffset, "endContainer": range.endContainer, "endOffset": range.endOffset };
    if (sel != '') {
      $('ul.tools').css({
        'left': pageX + 5,
        'top': pageY - 95
      }).fadeIn(200);
    } else {
      sel.removeAllRanges();
      $('ul.tools').fadeOut(200);
      $('ul.color').fadeOut(200);
      noteHighlight();
      $('.note').fadeOut(200);
      $('textarea').val('');
    }
  });

$('.highlightingText').click(function(){
  textEditor();
});
$('.deleteHighlight').click(function(){
  Highlight('transparent');
});
$('.postNote').click(function(){
  note();
});

function textEditor() {
  var sel = window.getSelection();
  if (sel != '') {
    $('ul.color').css({
      'left': pageX - 50,
      'top': pageY - 90
    }).fadeIn(200);
  }
}
function Highlight(color) {
  document.designMode = "on";
  var sel = window.getSelection();
  sel.removeAllRanges();
  var range = document.createRange();
  range.setStart(editor.startContainer, editor.startOffset);
  range.setEnd(editor.endContainer, editor.endOffset);
  sel.addRange(range);
  if (!sel.isCollapsed) {
    if (!document.execCommand("HiliteColor", false, color)) {
      document.execCommand("BackColor", false, color);
    }
  }debugger;
  sel.removeAllRanges();
  $('ul.color').fadeOut(200);
  $('ul.tools').fadeOut(200);
  noteHighlight();
  $('.note').fadeOut(200);
  $('#textarea').val = '';
  document.designMode = "off";
}
var notes = [];
function note(){
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  range.setStart(editor.startContainer, editor.startOffset);
  range.setEnd(editor.endContainer, editor.endOffset);
  if (sel != '') {
    $('ul.color').fadeOut(200);
    $('ul.tools').fadeOut(200);
    $('ul.note').css({
      'left': pageX - 200,
      'top': pageY - 120
    }).fadeIn(200);
    var $span = $('<span>').addClass('blueHighlight').append(range.extractContents());
    range.insertNode($span[0]);
    $('textarea').focus();
  }
}

function noteHighlight(){
  $('#pages').find('.blueHighlight').each(function(){
    $(this)[0].outerHTML = $(this).text();
  });
}
function addNote() {
  // if(tyepof(Storage) !== "undefined"){
  //   if(localStorage.notes){
  //     localStorage.notes
  //   } else {
  //     localStorage.notes = 
  //   }

  localStorage.setItem()
  noteHighlight();
  $('.note').fadeOut(200);
}

//checking if selection exists in notes range
Number.prototype.between = function (min, max) {
  return this > min && this < max;
};

function Notes(location, note) {
  this.location = location;
  this.note = note;
}