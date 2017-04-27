
var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder,
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};

$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '<div class="mfp-inline-wrapper">'+
					'<div class="mfp-header-wrapper">' +
						'<div class="mfp-file-name"></div>'+
						'<a class="mfp-download" target="_blank" download=""><i class="icon-get_app"></i>下载</a>'+
						'<div class="mfp-close"></div>'+
					'</div>'+
					'<div class="mfp-inline"></div>'+
				'</div>',
		tNotFound: 'Content not found'
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},

		getInline: function(item, template) {

			_putInlineElementsBack();

			$('.mfp-file-name', template).html(item.fileName);
			$('.mfp-download', template).attr('href', item.downloadUrl);

			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = $(item.src);

				if(el.length) {
					el.addClass('mfp-inline');

					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					// var parent = el[0].parentNode;
					// if(parent && parent.tagName) {
					// 	if(!_inlinePlaceholder) {
					// 		_hiddenClass = inlineSt.hiddenClass;
					// 		_inlinePlaceholder = _getEl(_hiddenClass);
					// 		_hiddenClass = 'mfp-'+_hiddenClass;
					// 	}
					// 	// replace target inline element with placeholder
					// 	_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					// }

					// mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = $('<div>');
				}

				// template.find('.mfp-inline').append(el);

				item.inlineElement = el;
				// return template;
			}

			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {
				inline_replaceWith: item.inlineElement
			}, item);
			return template;
		}
	}
});