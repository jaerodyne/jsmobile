$(document).ready(function () {
  $("#filld").hover(function() {
    $(".wrap").find("#popout").css({
      "opacity": "1.0",
      "background": "url(public/img/filld-bkgd.png) no-repeat",
      "border": "none"
    });
    $(".wrap").find("#popout h1").css({
      "opacity": "0.0"
    });
  }).mouseleave(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.0",
      "background": "none", 
    })
    $(".wrap").find("#popout h1").css({
      "opacity": "1.0"
    });
  });

  $("#connections").mouseenter(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.6",
      "background-color": "white"
    });
    // var img = document.createElement("img");
    // img.src = "public/img/logo.png";

    // var src = document.getElementById("popout");
    // src.appendChild(img);
  }).mouseleave(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.0"
    });
    // var src = document.getElementById("img");
    // src.parentNode.removeChild(src);
  })

  $("#anml").hover(function() {
    $(".wrap").find("#popout").css({
      "opacity": "1.0",
      "background": "url(public/img/anml-bkgd.png) no-repeat",
      "border": "none"
    });
    $(".wrap").find("#popout h1").css({
      "opacity": "0.0"
    });
  }).mouseleave(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.0",
      "background": "none", 
    })
    $(".wrap").find("#popout h1").css({
      "opacity": "1.0"
    });
  });

  $("#anml").click(function(e) {
    e.preventDefault();
    $(".wrap").find("#popout").addClass('no-hover');

    console.log('hey');
  });

  $("#looplio").hover(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.6",
      "background-color": "white"
    });
  }).mouseleave(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.0" 
    })
  });

  $("#vimeow").hover(function() {
    $(".wrap").find("#popout").css({
      "opacity": "1.0",
      "background": "url(public/img/vimeow-bkgd.png) no-repeat",
      "border": "none"
    });
    $(".wrap").find("#popout h1").css({
      "opacity": "0.0"
    });
  }).mouseleave(function() {
    $(".wrap").find("#popout").css({
      "opacity": "0.0",
      "background": "none", 
    })
    $(".wrap").find("#popout h1").css({
      "opacity": "1.0"
    });
  });

});

$(function() {
  var containerSelector = '[data-tab-wrapper]';
  var tabListSelector = '[data-tablist]';
  var tabListItemSelector = '[data-tablist] > li';
  var tabSelector = '[data-tablist] > li > a';
  var tabPanelSelector = '[data-tabpanel]';

  $(tabListSelector).attr('role', 'tablist');
  $(tabListItemSelector).attr('role', 'presentation');
  $(tabPanelSelector).attr('role', 'tabpanel');

  // Setup: Wire up the anchors and their target tabPanels
  $(tabSelector).each(function(_, element) {
    $(element).attr({
      'role': 'tab',
      'tabindex': '-1',
      'aria-controls': getAnchor($(element))
    });
  });

  // Setup: Set the tablist
  $(tabListSelector).attr('role', 'tablist');

  // Setup: Select the first tab
  var firstTabLinkSelector = tabListItemSelector + ':first-child a';
  select($(firstTabLinkSelector));

  // Setup: Make each tabPanel focusable
  $(tabPanelSelector + ' > *:first-child').attr({'tabindex' : '0'});

  // Setup: Hide all panels besides the first
  hide($(tabPanelSelector + ':not(:first-of-type)'));

  // When focused, left and right arrow keys cycle active tab
  $(tabSelector).on('keydown', function(event) {
    var $original = $(event.target);
    var leftArrow = 37;
    var rightArrow = 39;
    switch (event.keyCode) {
      case leftArrow:
        $target = $(event.target).parents(tabListItemSelector).prev().children(tabSelector);
        break;
      case rightArrow:
        $target = $(event.target).parents(tabListItemSelector).next().children(tabSelector);
        break;
      default:
        $target = false;
        break;
    }

    if ($target.length) {
      unselect($original);
      select($target).focus();
      hideAllTabPanels($(event.target));
      show($('#' + getAnchor($(document.activeElement))));
    }
  });

  // Show the associated panel when clicking on a tab
  $(tabSelector).on('click', function(event) {
    event.preventDefault();

    unselect($(tabSelector));
    select($(event.target));
    hideAllTabPanels($(event.target));
    show($('#' + getAnchor($(event.target))));
  });

  function getAnchor($element) {
    return $element.attr('href').substring(1);
  }

  function show($element) {
    return $element.attr('aria-hidden', null);
  }

  function hide($element) {
    return $element.attr('aria-hidden', 'true');
  }

  function hideAllTabPanels($element) {
    return hide($element.closest(containerSelector).find(tabPanelSelector));
  }

  function select($element) {
    return $element.attr({
      'aria-selected': true,
      'tabindex': '0'
    });
  }

  function unselect($element) {
    return $element.attr({
      'tabindex' : '-1',
      'aria-selected' : null
    });
   }
});
