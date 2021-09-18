/* A simple jQuery TopTips (http://github.com/wwhyes/jquery-toptips) Version 0.0.1 */

(function (factory) {
  // Making your jQuery plugin work better with npm tools
  // http://blog.npmjs.org/post/112712169830/making-your-jquery-plugin-work-better-with-npm
  if(typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  };
}(function($, window, document, undefined) {
  var toptips = [];
  var getCurrent = function() {
    return toptips.length ? toptips[toptips.length - 1] : null;
  };
  var selectCurrent = function() {
    var selected = false;
    for (var i = toptips.length - 1; i >= 0; i--) {
      if (toptips[i].$elm) {
        toptips[i].$elm
          .toggleClass('toptips--current', !selected)
          .toggleClass('toptips--behind', selected)
          .css('order', toptips.length - i);
        selected = true;
      };
    };
  };
  var $blocker = $('<div class="toptips-container"></div>').appendTo($('body'));
  $.toptips = function(options) {
    this.$body = $('body');
    this.$blocker = $blocker;
    this.options = $.extend({}, $.toptips.defaults, options);
    if (this.options.closeExisting) {
      while ($.toptips.isActive()) {
        $.toptips.close(); // Close any open toptips.
      };
    };
    toptips.push(this);
    this.$elm = $(`<div class="toptips toptips--current">
      <div class="toptips__icon"></div>
      <div class="toptips__message">${options.message}</div>
    </div>`);
    this.$body.append(this.$elm);
    this.open();
  };

  $.toptips.prototype = {
    constructor: $.toptips,

    open: function() {
      var _this = this;
      this.show();
      $(document).off('keydown.toptips').on('keydown.toptips', function(event) {
        var current = getCurrent();
        if (event.which === 27 && current.options.escapeClose) {
          current.close();
        };
      });
      if (this.options.clickClose) {
        this.$elm.click(function(e) {
          if (e.target === this) {
            $.toptips.close();
          };
        });
      };
      if (this.options.duration > 0) {
        setTimeout(function() {
          _this.close();
        }, this.options.duration * 1000);
      };
    },

    close: function() {
      toptips.pop();
      this.hide();
      if (!$.toptips.isActive()) {
        $(document).off('keydown.toptips');
      };
    },

    show: function() {
      selectCurrent();
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-toptips" rel="toptips:close" class="toptips__close"></a>');
        this.$elm.append(this.closeButton);
      };
      this.$elm.addClass('toptips--animation');
      this.$elm.addClass(this.options.type).appendTo(this.$blocker);
    },

    hide: function() {
      const _this = this;
      if (this.options.closeExisting) {
        this.$elm.remove();
      } else {
        this.$elm.css('opacity', 1).animate({ opacity: 0 }, 500, function() {
          _this.$elm.remove();
        });
      }
    },

    //Return context for custom events
    _ctx: function() {
      return { elm: this.$elm, $elm: this.$elm, $blocker: this.$blocker, options: this.options };
    }
  };

  $.toptips.close = function(event) {
    if (!$.toptips.isActive()) {
      return;
    };
    if (event) {
      event.preventDefault();
    };
    var current = getCurrent();
    current && current.close();
    return current.$elm;
  };

  // Returns if there currently is an active toptips
  $.toptips.isActive = function () {
    return toptips.length > 0;
  };

  $.toptips.getCurrent = getCurrent;

  $.toptips.defaults = {
    message: '',
    type: 'info', // ['info', 'success', 'warning', 'error']
    closeExisting: false,
    escapeClose: true,
    clickClose: true,
    showClose: true,
    duration: 3 // 默认自动关闭延时，单位秒
  };

  $.fn.toptips = function(options) {
    if (this.length === 1) {
      new $.toptips(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="toptips:close" to, well, close the toptips.
  $(document).on('click.toptips', 'a[rel~="toptips:close"]', $.toptips.close);
  $(document).on('click.toptips', 'a[rel~="toptips:open"]', function(event) {
    event.preventDefault();
    var option = $(this).data();
    new $.toptips(option);
  });
}));
