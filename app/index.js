webpackJsonp([0,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(330);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _App = __webpack_require__(469);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(483);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('designFixationApp'));

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _App = __webpack_require__(470);

	var _App2 = _interopRequireDefault(_App);

	var _Flow = __webpack_require__(471);

	var _Flow2 = _interopRequireDefault(_Flow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function App() {
	  return _react2.default.createElement(
	    'div',
	    { className: _App2.default.App },
	    _react2.default.createElement(_Flow2.default, null)
	  );
	};

	exports.default = App;

/***/ },

/***/ 470:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI"};

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _flow = __webpack_require__(472);

	var _flow2 = _interopRequireDefault(_flow);

	var _Wrap = __webpack_require__(473);

	var _Wrap2 = _interopRequireDefault(_Wrap);

	var _KeywordSection = __webpack_require__(474);

	var _KeywordSection2 = _interopRequireDefault(_KeywordSection);

	var _ImageSection = __webpack_require__(481);

	var _ImageSection2 = _interopRequireDefault(_ImageSection);

	var _Block = __webpack_require__(477);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Flow = function Flow() {
	  var flowSections = [];
	  var backPoint = null;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = _flow2.default.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _slicedToArray(_step.value, 2);

	      var index = _step$value[0];
	      var section = _step$value[1];

	      switch (section.type) {
	        case 'keyword':
	          backPoint = section;
	          flowSections.push(_react2.default.createElement(
	            _Block2.default,
	            {
	              n: 2,
	              key: index },
	            _react2.default.createElement(_KeywordSection2.default, {
	              pins: section.collectedPins,
	              query: section.query })
	          ));
	          break;
	        case 'image':
	          flowSections.push(_react2.default.createElement(
	            _Block2.default,
	            {
	              n: 2,
	              key: index },
	            _react2.default.createElement(_ImageSection2.default, {
	              pins: section.collectedPins,
	              image: section.imageUrl,
	              id: section.id,
	              key: index })
	          ));
	          break;
	        case 'back':
	          console.log(backPoint);
	          flowSections.push(_react2.default.createElement(
	            _Block2.default,
	            {
	              n: 2,
	              key: index },
	            _react2.default.createElement(_KeywordSection2.default, {
	              pins: section.collectedPins,
	              query: backPoint.query,
	              backPoint: true,
	              key: index })
	          ));
	          backPoint = null;
	          break;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return _react2.default.createElement(
	    _Wrap2.default,
	    { maxWidth: '80rem' },
	    flowSections
	  );
	};

	exports.default = Flow;

/***/ },

/***/ 472:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var flow = [{
	  type: 'keyword',
	  query: 'UI',
	  collectedPins: [{
	    id: '541980136388671406',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/ba/8c/ff/ba8cff39c5f9e762fe117ef28543ab85.jpg'
	  }, {
	    id: '278589926928722988',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/41/6c/27/416c278a199545d4d0921b4e6e4c5aa9.jpg'
	  }, {
	    id: '395402042267571408',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/e5/8d/d9/e58dd902a674f6e4022662a3f219816d.jpg'
	  }]
	}, {
	  type: 'keyword',
	  query: 'dashboard',
	  collectedPins: [{
	    id: '381046818454514386',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/2a/2b/72/2a2b729cff602417d93561d3b1d78908.jpg'
	  }, {
	    id: '251146116697882182',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/0d/23/3f/0d233ff7156e298829abb09be140ecc3.jpg'
	  }, {
	    id: '476114991832273770',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/b3/e1/4a/b3e14a1e6fec59ed626f3cf7c802f51d.jpg'
	  }, {
	    id: '189432728051324328',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/67/1a/8c/671a8c0e518f1c2b2ef81327ba86b05a.jpg'
	  }]
	}, {
	  type: 'image',
	  id: '189432728051324328',
	  imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/67/1a/8c/671a8c0e518f1c2b2ef81327ba86b05a.jpg',
	  collectedPins: [{
	    id: '116038127876687086',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/8c/c2/e9/8cc2e990dcde99fa3ecc458b321e6bde.jpg'
	  }, {
	    id: '127930445643431714',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/50/c7/85/50c7859e03f2774040790a604e7cba15.jpg'
	  }]
	}, {
	  type: 'image',
	  id: '127930445643431714',
	  imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/50/c7/85/50c7859e03f2774040790a604e7cba15.jpg'
	}, {
	  type: 'back',
	  collectedPins: [{
	    id: '354306695668090313',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/7f/bd/57/7fbd57c603d89b8dc58d6bf03b558add.jpg'
	  }, {
	    id: '257620041163565546',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/de/02/45/de024571a6735ad2c59f06e33a36aba5.jpg'
	  }, {
	    id: '28780885092288191',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/03/c9/f4/03c9f4a1b37e7e01f391e36b2e0a163e.jpg'
	  }, {
	    id: '541417186430022531',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/6d/1b/62/6d1b62519f0a97769464ae30035de8c4.jpg'
	  }, {
	    id: '506021708112437092',
	    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/50/5c/95/505c9599188c103a987086b38f21a829.jpg'
	  }]
	}, {
	  type: 'image',
	  id: '506021708112437092',
	  imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/50/5c/95/505c9599188c103a987086b38f21a829.jpg'
	}];

		exports.default = flow;

/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Wrap = function Wrap(_ref) {
	  var _ref$width = _ref.width;
	  var width = _ref$width === undefined ? '90%' : _ref$width;
	  var _ref$maxWidth = _ref.maxWidth;
	  var maxWidth = _ref$maxWidth === undefined ? '80rem' : _ref$maxWidth;
	  var _ref$extraClassNames = _ref.extraClassNames;
	  var extraClassNames = _ref$extraClassNames === undefined ? '' : _ref$extraClassNames;
	  var children = _ref.children;

	  var style = {
	    width: width,
	    maxWidth: maxWidth,
	    marginLeft: 'auto',
	    marginRight: 'auto'
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: style, className: extraClassNames },
	    children
	  );
	};

	exports.default = Wrap;

/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _Section = __webpack_require__(475);

	var _Section2 = _interopRequireDefault(_Section);

	var _KeywordSection = __webpack_require__(480);

	var _KeywordSection2 = _interopRequireDefault(_KeywordSection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KeywordSection = function KeywordSection(_ref) {
	  var query = _ref.query;
	  var pins = _ref.pins;
	  var _ref$backPoint = _ref.backPoint;
	  var backPoint = _ref$backPoint === undefined ? false : _ref$backPoint;

	  var title = '';
	  if (backPoint) {
	    title = 'Going back to searching for';
	  } else {
	    title = 'Searching for';
	  }

	  var keywordQuery = _react2.default.createElement(
	    'div',
	    { className: _KeywordSection2.default.KeywordQuery },
	    '"',
	    query,
	    '"'
	  );

	  return _react2.default.createElement(_Section2.default, {
	    title: title,
	    query: keywordQuery,
	    pins: pins });
	};

	exports.default = KeywordSection;

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _Section = __webpack_require__(476);

	var _Section2 = _interopRequireDefault(_Section);

	var _Block = __webpack_require__(477);

	var _Block2 = _interopRequireDefault(_Block);

	var _Pin = __webpack_require__(478);

	var _Pin2 = _interopRequireDefault(_Pin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Section = function Section(_ref) {
	  var title = _ref.title;
	  var query = _ref.query;
	  var pins = _ref.pins;

	  return _react2.default.createElement(
	    'div',
	    { className: _Section2.default.Section },
	    _react2.default.createElement(SectionHeader, { title: title, query: query }),
	    _react2.default.createElement(SectionBody, { pins: pins })
	  );
	};

	var SectionHeader = function SectionHeader(_ref2) {
	  var title = _ref2.title;
	  var query = _ref2.query;

	  return _react2.default.createElement(
	    'div',
	    { className: _Section2.default.SectionHeader },
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Section2.default.SectionHeader__title },
	        title
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _Section2.default.SectionHeader__query },
	      query
	    )
	  );
	};

	var SectionBody = function SectionBody(_ref3) {
	  var _ref3$pins = _ref3.pins;
	  var pins = _ref3$pins === undefined ? [] : _ref3$pins;

	  console.log(pins);
	  var pinColumns = [];

	  var _loop = function _loop(i) {
	    var column = pins.filter(function (pin, index) {
	      return index % 4 === i;
	    });
	    pinColumns.push(column);
	  };

	  for (var i = 0; i < 4; i++) {
	    _loop(i);
	  }

	  var content = pinColumns.map(function (col, colIndex) {
	    return _react2.default.createElement(
	      'div',
	      { className: _Section2.default.SectionBody__column, key: colIndex },
	      col.map(function (p, pIndex) {
	        return _react2.default.createElement(
	          _Block2.default,
	          { n: 1.5, key: pIndex },
	          _react2.default.createElement(_Pin2.default, { pin: p })
	        );
	      })
	    );
	  });

	  return _react2.default.createElement(
	    'div',
	    { className: _Section2.default.SectionBody },
	    content
	  );
	};

	exports.default = Section;

/***/ },

/***/ 476:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Section":"Section__Section___35Bcb","SectionHeader":"Section__SectionHeader___3X4Yb","SectionHeader__title":"Section__SectionHeader__title___CIySX","SectionHeader__query":"Section__SectionHeader__query___3GEFq","SectionBody":"Section__SectionBody___1mCQJ","SectionBody__column":"Section__SectionBody__column___2laSu"};

/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;

	var Block = function Block(_ref) {
	  var _ref$n = _ref.n;
	  var n = _ref$n === undefined ? 1 : _ref$n;
	  var _ref$extraClassNames = _ref.extraClassNames;
	  var extraClassNames = _ref$extraClassNames === undefined ? '' : _ref$extraClassNames;
	  var children = _ref.children;

	  var style = {
	    marginBottom: baseline * n + 'rem'
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: style, className: extraClassNames },
	    children
	  );
	};

	exports.default = Block;

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _Pin = __webpack_require__(479);

	var _Pin2 = _interopRequireDefault(_Pin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Pin = function Pin(_ref) {
	  var pin = _ref.pin;

	  return _react2.default.createElement(
	    'a',
	    {
	      className: _Pin2.default.Pin,
	      href: 'https://www.pinterest.com/pin/' + pin.id + '/' },
	    _react2.default.createElement('img', { src: pin.imageUrl })
	  );
	};

	exports.default = Pin;

/***/ },

/***/ 479:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Pin":"Pin__Pin___2QxlK"};

/***/ },

/***/ 480:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"KeywordQuery":"KeywordSection__KeywordQuery___24EMe"};

/***/ },

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(299);

	var _react2 = _interopRequireDefault(_react);

	var _Section = __webpack_require__(475);

	var _Section2 = _interopRequireDefault(_Section);

	var _ImageSection = __webpack_require__(482);

	var _ImageSection2 = _interopRequireDefault(_ImageSection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImageSection = function ImageSection(_ref) {
	  var id = _ref.id;
	  var image = _ref.image;
	  var pins = _ref.pins;

	  var imageQuery = _react2.default.createElement(
	    'a',
	    {
	      href: 'https://www.pinterest.com/pin/' + id,
	      className: _ImageSection2.default.ImageQuery },
	    _react2.default.createElement('img', { className: _ImageSection2.default.ImageQuery__img, src: image })
	  );

	  return _react2.default.createElement(_Section2.default, {
	    title: 'Searching for related images',
	    query: imageQuery,
	    pins: pins });
	};

	exports.default = ImageSection;

/***/ },

/***/ 482:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ImageQuery":"ImageSection__ImageQuery___2jgi9","ImageQuery__img":"ImageSection__ImageQuery__img___PwuDv"};

/***/ },

/***/ 483:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0Zsb3cvRmxvdy5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9tb2NrL2Zsb3cuanMiLCJ3ZWJwYWNrOi8vL3NyYy9sYXlvdXRzL1dyYXAvV3JhcC5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0tleXdvcmRTZWN0aW9uL0tleXdvcmRTZWN0aW9uLmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi9TZWN0aW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uL1NlY3Rpb24uY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1Bpbi9QaW4uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Bpbi9QaW4uY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRTZWN0aW9uL0tleXdvcmRTZWN0aW9uLmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvSW1hZ2VTZWN0aW9uL0ltYWdlU2VjdGlvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW1hZ2VTZWN0aW9uL0ltYWdlU2VjdGlvbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9yZXNldC5jc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cblJlYWN0RE9NLnJlbmRlcigoXG4gIDxBcHAgLz5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNpZ25GaXhhdGlvbkFwcCcpKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2luZGV4LmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0FwcC5jc3MnXG5pbXBvcnQgRmxvdyBmcm9tICcuLi9GbG93J1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHB9PlxuICAgICAgPEZsb3cgLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0FwcC9BcHAuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiQXBwXCI6XCJBcHBfX0FwcF9fX2xCRVhJXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgZmxvdyBmcm9tICcuLi8uLi9tb2NrL2Zsb3cuanMnXG5pbXBvcnQgV3JhcCBmcm9tICcuLi8uLi9sYXlvdXRzL1dyYXAnXG5pbXBvcnQgS2V5d29yZFNlY3Rpb24gZnJvbSAnLi4vS2V5d29yZFNlY3Rpb24nXG5pbXBvcnQgSW1hZ2VTZWN0aW9uIGZyb20gJy4uL0ltYWdlU2VjdGlvbidcbmltcG9ydCBCbG9jayBmcm9tICcuLi8uLi9sYXlvdXRzL0Jsb2NrJ1xuXG5jb25zdCBGbG93ID0gKCkgPT4ge1xuICBsZXQgZmxvd1NlY3Rpb25zID0gW11cbiAgbGV0IGJhY2tQb2ludCA9IG51bGxcblxuICBmb3IgKGxldCBbaW5kZXgsIHNlY3Rpb25dIG9mIGZsb3cuZW50cmllcygpKSB7XG4gICAgc3dpdGNoIChzZWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2tleXdvcmQnOlxuICAgICAgICBiYWNrUG9pbnQgPSBzZWN0aW9uXG4gICAgICAgIGZsb3dTZWN0aW9ucy5wdXNoKFxuICAgICAgICAgIDxCbG9ja1xuICAgICAgICAgICAgbj17Mn1cbiAgICAgICAgICAgIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgPEtleXdvcmRTZWN0aW9uXG4gICAgICAgICAgICAgIHBpbnM9e3NlY3Rpb24uY29sbGVjdGVkUGluc31cbiAgICAgICAgICAgICAgcXVlcnk9e3NlY3Rpb24ucXVlcnl9Lz5cbiAgICAgICAgICA8L0Jsb2NrPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgIGZsb3dTZWN0aW9ucy5wdXNoKFxuICAgICAgICAgIDxCbG9ja1xuICAgICAgICAgICAgbj17Mn1cbiAgICAgICAgICAgIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgPEltYWdlU2VjdGlvblxuICAgICAgICAgICAgICBwaW5zPXtzZWN0aW9uLmNvbGxlY3RlZFBpbnN9XG4gICAgICAgICAgICAgIGltYWdlPXtzZWN0aW9uLmltYWdlVXJsfVxuICAgICAgICAgICAgICBpZD17c2VjdGlvbi5pZH1cbiAgICAgICAgICAgICAga2V5PXtpbmRleH0gLz5cbiAgICAgICAgICA8L0Jsb2NrPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgY29uc29sZS5sb2coYmFja1BvaW50KVxuICAgICAgICBmbG93U2VjdGlvbnMucHVzaChcbiAgICAgICAgICA8QmxvY2tcbiAgICAgICAgICAgIG49ezJ9XG4gICAgICAgICAgICBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxLZXl3b3JkU2VjdGlvblxuICAgICAgICAgICAgICBwaW5zPXtzZWN0aW9uLmNvbGxlY3RlZFBpbnN9XG4gICAgICAgICAgICAgIHF1ZXJ5PXtiYWNrUG9pbnQucXVlcnl9XG4gICAgICAgICAgICAgIGJhY2tQb2ludFxuICAgICAgICAgICAgICBrZXk9e2luZGV4fSAvPlxuICAgICAgICAgIDwvQmxvY2s+XG4gICAgICAgIClcbiAgICAgICAgYmFja1BvaW50ID0gbnVsbFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFdyYXAgbWF4V2lkdGg9XCI4MHJlbVwiPlxuICAgICAge2Zsb3dTZWN0aW9uc31cbiAgICA8L1dyYXA+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxvd1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRmxvdy9GbG93LmpzeFxuICoqLyIsImNvbnN0IGZsb3cgPSBbXG4gIHtcbiAgICB0eXBlOiAna2V5d29yZCcsXG4gICAgcXVlcnk6ICdVSScsXG4gICAgY29sbGVjdGVkUGluczogW1xuICAgICAge1xuICAgICAgICBpZDogJzU0MTk4MDEzNjM4ODY3MTQwNicsXG4gICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tLzU2NHgvYmEvOGMvZmYvYmE4Y2ZmMzljNWY5ZTc2MmZlMTE3ZWYyODU0M2FiODUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICcyNzg1ODk5MjY5Mjg3MjI5ODgnLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS81NjR4LzQxLzZjLzI3LzQxNmMyNzhhMTk5NTQ1ZDRkMDkyMWI0ZTZlNGM1YWE5LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnMzk1NDAyMDQyMjY3NTcxNDA4JyxcbiAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC9lNS84ZC9kOS9lNThkZDkwMmE2NzRmNmU0MDIyNjYyYTNmMjE5ODE2ZC5qcGcnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2tleXdvcmQnLFxuICAgIHF1ZXJ5OiAnZGFzaGJvYXJkJyxcbiAgICBjb2xsZWN0ZWRQaW5zOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnMzgxMDQ2ODE4NDU0NTE0Mzg2JyxcbiAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC8yYS8yYi83Mi8yYTJiNzI5Y2ZmNjAyNDE3ZDkzNTYxZDNiMWQ3ODkwOC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJzI1MTE0NjExNjY5Nzg4MjE4MicsXG4gICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tLzU2NHgvMGQvMjMvM2YvMGQyMzNmZjcxNTZlMjk4ODI5YWJiMDliZTE0MGVjYzMuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICc0NzYxMTQ5OTE4MzIyNzM3NzAnLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS81NjR4L2IzL2UxLzRhL2IzZTE0YTFlNmZlYzU5ZWQ2MjZmM2NmN2M4MDJmNTFkLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnMTg5NDMyNzI4MDUxMzI0MzI4JyxcbiAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC82Ny8xYS84Yy82NzFhOGMwZTUxOGYxYzJiMmVmODEzMjdiYTg2YjA1YS5qcGcnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2ltYWdlJyxcbiAgICBpZDogJzE4OTQzMjcyODA1MTMyNDMyOCcsXG4gICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC82Ny8xYS84Yy82NzFhOGMwZTUxOGYxYzJiMmVmODEzMjdiYTg2YjA1YS5qcGcnLFxuICAgIGNvbGxlY3RlZFBpbnM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICcxMTYwMzgxMjc4NzY2ODcwODYnLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS81NjR4LzhjL2MyL2U5LzhjYzJlOTkwZGNkZTk5ZmEzZWNjNDU4YjMyMWU2YmRlLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnMTI3OTMwNDQ1NjQzNDMxNzE0JyxcbiAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC81MC9jNy84NS81MGM3ODU5ZTAzZjI3NzQwNDA3OTBhNjA0ZTdjYmExNS5qcGcnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2ltYWdlJyxcbiAgICBpZDogJzEyNzkzMDQ0NTY0MzQzMTcxNCcsXG4gICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC81MC9jNy84NS81MGM3ODU5ZTAzZjI3NzQwNDA3OTBhNjA0ZTdjYmExNS5qcGcnXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnYmFjaycsXG4gICAgY29sbGVjdGVkUGluczogW1xuICAgICAge1xuICAgICAgICBpZDogJzM1NDMwNjY5NTY2ODA5MDMxMycsXG4gICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tLzU2NHgvN2YvYmQvNTcvN2ZiZDU3YzYwM2Q4OWI4ZGM1OGQ2YmYwM2I1NThhZGQuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICcyNTc2MjAwNDExNjM1NjU1NDYnLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS81NjR4L2RlLzAyLzQ1L2RlMDI0NTcxYTY3MzVhZDJjNTlmMDZlMzNhMzZhYmE1LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnMjg3ODA4ODUwOTIyODgxOTEnLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS81NjR4LzAzL2M5L2Y0LzAzYzlmNGExYjM3ZTdlMDFmMzkxZTM2YjJlMGExNjNlLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnNTQxNDE3MTg2NDMwMDIyNTMxJyxcbiAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNTY0eC82ZC8xYi82Mi82ZDFiNjI1MTlmMGE5Nzc2OTQ2NGFlMzAwMzVkZThjNC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJzUwNjAyMTcwODExMjQzNzA5MicsXG4gICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tLzU2NHgvNTAvNWMvOTUvNTA1Yzk1OTkxODhjMTAzYTk4NzA4NmIzOGYyMWE4MjkuanBnJ1xuICAgICAgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIHR5cGU6ICdpbWFnZScsXG4gICAgaWQ6ICc1MDYwMjE3MDgxMTI0MzcwOTInLFxuICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zLW1lZGlhLWNhY2hlLWFrMC5waW5pbWcuY29tLzU2NHgvNTAvNWMvOTUvNTA1Yzk1OTkxODhjMTAzYTk4NzA4NmIzOGYyMWE4MjkuanBnJ1xuICB9XG5dXG5cbmV4cG9ydCBkZWZhdWx0IGZsb3dcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9tb2NrL2Zsb3cuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFdyYXAgPSAoe1xuICB3aWR0aCA9ICc5MCUnLFxuICBtYXhXaWR0aCA9ICc4MHJlbScsIC8vIDEyODBweCBwcm92aWRlZCAxZW0gPT09IDE2cHhcbiAgZXh0cmFDbGFzc05hbWVzID0gJycsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIHdpZHRoLFxuICAgIG1heFdpZHRoLFxuICAgIG1hcmdpbkxlZnQ6ICdhdXRvJyxcbiAgICBtYXJnaW5SaWdodDogJ2F1dG8nXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2V4dHJhQ2xhc3NOYW1lc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgV3JhcFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvV3JhcC9XcmFwLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi4vU2VjdGlvbidcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9LZXl3b3JkU2VjdGlvbi5jc3MnXG5cbmNvbnN0IEtleXdvcmRTZWN0aW9uID0gKHtcbiAgcXVlcnksXG4gIHBpbnMsXG4gIGJhY2tQb2ludCA9IGZhbHNlXG59KSA9PiB7XG4gIGxldCB0aXRsZSA9ICcnXG4gIGlmIChiYWNrUG9pbnQpIHtcbiAgICB0aXRsZSA9ICdHb2luZyBiYWNrIHRvIHNlYXJjaGluZyBmb3InXG4gIH0gZWxzZSB7XG4gICAgdGl0bGUgPSAnU2VhcmNoaW5nIGZvcidcbiAgfVxuXG4gIGNvbnN0IGtleXdvcmRRdWVyeSA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRRdWVyeX0+XCJ7cXVlcnl9XCI8L2Rpdj5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPFNlY3Rpb25cbiAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgIHF1ZXJ5PXtrZXl3b3JkUXVlcnl9XG4gICAgICBwaW5zPXtwaW5zfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEtleXdvcmRTZWN0aW9uXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkU2VjdGlvbi9LZXl3b3JkU2VjdGlvbi5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9TZWN0aW9uLmNzcydcbmltcG9ydCBCbG9jayBmcm9tICcuLi8uLi9sYXlvdXRzL0Jsb2NrJ1xuaW1wb3J0IFBpbiBmcm9tICcuLi9QaW4nXG5cbmNvbnN0IFNlY3Rpb24gPSAoe1xuICB0aXRsZSxcbiAgcXVlcnksXG4gIHBpbnNcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlNlY3Rpb259PlxuICAgICAgPFNlY3Rpb25IZWFkZXIgdGl0bGU9e3RpdGxlfSBxdWVyeT17cXVlcnl9IC8+XG5cbiAgICAgIDxTZWN0aW9uQm9keSBwaW5zPXtwaW5zfSAvPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmNvbnN0IFNlY3Rpb25IZWFkZXIgPSAoe1xuICB0aXRsZSxcbiAgcXVlcnlcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlNlY3Rpb25IZWFkZXJ9PlxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU2VjdGlvbkhlYWRlcl9fdGl0bGV9Pnt0aXRsZX08L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU2VjdGlvbkhlYWRlcl9fcXVlcnl9PntxdWVyeX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5jb25zdCBTZWN0aW9uQm9keSA9ICh7XG4gIHBpbnMgPSBbXVxufSkgPT4ge1xuICBjb25zb2xlLmxvZyhwaW5zKVxuICBsZXQgcGluQ29sdW1ucyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgbGV0IGNvbHVtbiA9IHBpbnMuZmlsdGVyKChwaW4sIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gaW5kZXggJSA0ID09PSBpXG4gICAgfSlcbiAgICBwaW5Db2x1bW5zLnB1c2goY29sdW1uKVxuICB9XG5cbiAgY29uc3QgY29udGVudCA9IHBpbkNvbHVtbnMubWFwKChjb2wsIGNvbEluZGV4KSA9PlxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU2VjdGlvbkJvZHlfX2NvbHVtbn0ga2V5PXtjb2xJbmRleH0+XG4gICAgICB7Y29sLm1hcCgocCwgcEluZGV4KSA9PlxuICAgICAgICA8QmxvY2sgbj17MS41fSBrZXk9e3BJbmRleH0+XG4gICAgICAgICAgPFBpbiBwaW49e3B9IC8+XG4gICAgICAgIDwvQmxvY2s+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlNlY3Rpb25Cb2R5fT5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1NlY3Rpb24vU2VjdGlvbi5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJTZWN0aW9uXCI6XCJTZWN0aW9uX19TZWN0aW9uX19fMzVCY2JcIixcIlNlY3Rpb25IZWFkZXJcIjpcIlNlY3Rpb25fX1NlY3Rpb25IZWFkZXJfX18zWDRZYlwiLFwiU2VjdGlvbkhlYWRlcl9fdGl0bGVcIjpcIlNlY3Rpb25fX1NlY3Rpb25IZWFkZXJfX3RpdGxlX19fQ0l5U1hcIixcIlNlY3Rpb25IZWFkZXJfX3F1ZXJ5XCI6XCJTZWN0aW9uX19TZWN0aW9uSGVhZGVyX19xdWVyeV9fXzNHRUZxXCIsXCJTZWN0aW9uQm9keVwiOlwiU2VjdGlvbl9fU2VjdGlvbkJvZHlfX18xbUNRSlwiLFwiU2VjdGlvbkJvZHlfX2NvbHVtblwiOlwiU2VjdGlvbl9fU2VjdGlvbkJvZHlfX2NvbHVtbl9fXzJsYVN1XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uL1NlY3Rpb24uY3NzXG4gKiogbW9kdWxlIGlkID0gNDc2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IGJhc2VsaW5lID0gMC43NTBcblxuY29uc3QgQmxvY2sgPSAoe1xuICBuID0gMSxcbiAgZXh0cmFDbGFzc05hbWVzID0gJycsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIG1hcmdpbkJvdHRvbTogYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17ZXh0cmFDbGFzc05hbWVzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9ja1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvQmxvY2svQmxvY2suanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUGluLmNzcydcblxuY29uc3QgUGluID0gKHtcbiAgcGluXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGFcbiAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlBpbn1cbiAgICAgIGhyZWY9e2BodHRwczovL3d3dy5waW50ZXJlc3QuY29tL3Bpbi8ke3Bpbi5pZH0vYH0+XG4gICAgICA8aW1nIHNyYz17cGluLmltYWdlVXJsfSAvPlxuICAgIDwvYT5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaW5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1Bpbi9QaW4uanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUGluXCI6XCJQaW5fX1Bpbl9fXzJReGxLXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9QaW4vUGluLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ3OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiS2V5d29yZFF1ZXJ5XCI6XCJLZXl3b3JkU2VjdGlvbl9fS2V5d29yZFF1ZXJ5X19fMjRFTWVcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0tleXdvcmRTZWN0aW9uL0tleXdvcmRTZWN0aW9uLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tICcuLi9TZWN0aW9uJ1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0ltYWdlU2VjdGlvbi5jc3MnXG5cbmNvbnN0IEltYWdlU2VjdGlvbiA9ICh7XG4gIGlkLFxuICBpbWFnZSxcbiAgcGluc1xufSkgPT4ge1xuICBjb25zdCBpbWFnZVF1ZXJ5ID0gKFxuICAgIDxhXG4gICAgICBocmVmPXtgaHR0cHM6Ly93d3cucGludGVyZXN0LmNvbS9waW4vJHtpZH1gfVxuICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuSW1hZ2VRdWVyeX0+XG4gICAgICA8aW1nIGNsYXNzTmFtZT17c3R5bGVzLkltYWdlUXVlcnlfX2ltZ30gc3JjPXtpbWFnZX0gLz5cbiAgICA8L2E+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxTZWN0aW9uXG4gICAgICB0aXRsZT1cIlNlYXJjaGluZyBmb3IgcmVsYXRlZCBpbWFnZXNcIlxuICAgICAgcXVlcnk9e2ltYWdlUXVlcnl9XG4gICAgICBwaW5zPXtwaW5zfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlU2VjdGlvblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvSW1hZ2VTZWN0aW9uL0ltYWdlU2VjdGlvbi5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJJbWFnZVF1ZXJ5XCI6XCJJbWFnZVNlY3Rpb25fX0ltYWdlUXVlcnlfX18yamdpOVwiLFwiSW1hZ2VRdWVyeV9faW1nXCI6XCJJbWFnZVNlY3Rpb25fX0ltYWdlUXVlcnlfX2ltZ19fX1B3dUR2XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9JbWFnZVNlY3Rpb24vSW1hZ2VTZWN0aW9uLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0eWxlcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0ODNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNaQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7QUF4Q0E7QUEwQ0E7QUEvQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBZ0RBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0RBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBWkE7QUFtQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBaEJBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBVEE7QUFnQkE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBbkJBO0FBMEJBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7OztBQzdGQTtBQUNBOzs7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQUVBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFEQTtBQURBO0FBREE7QUFDQTtBQVNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7OztBQy9EQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBOzs7QUFDQTtBQUNBOzs7OztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTs7Ozs7Ozs7QUNmQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7O0FDekJBO0FBQ0E7Ozs7Ozs7QUNEQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=