webpackJsonp([0,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(331);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _App = __webpack_require__(471);

	var _App2 = _interopRequireDefault(_App);

	var _store = __webpack_require__(571);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(579);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _store2.default)();

	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_App2.default, null)
		), document.getElementById('designFixationApp'));

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _App = __webpack_require__(495);

	var _App2 = _interopRequireDefault(_App);

	var _QueryList = __webpack_require__(496);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _CollectionView = __webpack_require__(511);

	var _CollectionView2 = _interopRequireDefault(_CollectionView);

	var _Summary = __webpack_require__(516);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Title = __webpack_require__(518);

	var _Title2 = _interopRequireDefault(_Title);

	var _socket = __webpack_require__(520);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(569);

	var _studyActions = __webpack_require__(570);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var scrollTo = function scrollTo(element, to, duration) {
	  if (duration > 0) {
	    (function () {
	      var difference = to - element.scrollTop;
	      var perTick = difference / duration * 10;

	      setTimeout(function () {
	        element.scrollTop = element.scrollTop + perTick;
	        if (difference > 0 && element.scrollTop < to || difference < 0 && element.scrollTop > to) {
	          scrollTo(element, to, duration - 10);
	        }
	      }, 10);
	    })();
	  }
	};

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      var focusedGroupPage = newProps.focusedGroupPage;
	      var focusedGroupQuery = newProps.focusedGroupQuery;


	      if (focusedGroupPage !== this.props.focusedGroupPage || focusedGroupQuery !== this.props.focusedGroupQuery) {
	        if (focusedGroupPage) {
	          var selectorQuery = '.page' + focusedGroupPage;
	          if (focusedGroupQuery) {
	            selectorQuery = selectorQuery + '.' + focusedGroupQuery.replace(/\s/g, '_').replace(/"/g, '');
	          }
	          console.log(selectorQuery);
	          var matchingElements = Array.prototype.slice.call(document.querySelectorAll(selectorQuery));
	          var topMatchingElement = matchingElements.sort(function (a, b) {
	            return a.offsetTop - b.offsetTop;
	          })[0];

	          scrollTo(this._main, topMatchingElement.offsetTop, 200);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var dispatch = this.props.dispatch;


	      _socket2.default.emit('get study');

	      _socket2.default.on('study', function (data) {
	        dispatch((0, _studyActions.receiveStudy)(data.participantId, data.sessionId, data.condition, data.taskAlias));
	        _socket2.default.emit('get data', { sessionId: data.training ? 'test' : data.sessionId, taskAlias: data.taskAlias });
	      });

	      _socket2.default.on('confirm kill study', function () {
	        dispatch((0, _studyActions.killStudy)());
	      });

	      _socket2.default.on('confirm create example', function (e) {
	        dispatch((0, _dataActions.receiveExample)(e));
	      });

	      _socket2.default.on('confirm create query', function (q) {
	        dispatch((0, _dataActions.receiveQuery)(q));
	      });

	      _socket2.default.on('data', function (data) {
	        dispatch((0, _dataActions.receiveData)(data.queries, data.examples, data.task));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var condition = this.props.condition;


	      var sidebarEl = '';
	      if (condition === 'system') {
	        sidebarEl = _react2.default.createElement(
	          'div',
	          { className: _App2.default.AppSidebar },
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__heading },
	            _react2.default.createElement(_Title2.default, { title: 'Collection Summary' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__section },
	            _react2.default.createElement(_Summary2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__heading },
	            _react2.default.createElement(_Title2.default, { title: 'Search History' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__section + ' ' + _App2.default.AppSidebar__section_full },
	            _react2.default.createElement(_QueryList2.default, null)
	          )
	        );
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: _App2.default.App },
	        sidebarEl,
	        _react2.default.createElement(
	          'div',
	          {
	            ref: function ref(el) {
	              _this2._main = el;
	            },
	            className: _App2.default.App__main },
	          _react2.default.createElement(_CollectionView2.default, null)
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    sessionId: state.study.sessionId,
	    condition: state.study.condition,
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery
	  };
		})(App);

/***/ },

/***/ 495:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","AppSidebar":"App__AppSidebar___wXvF4","AppSidebar__heading":"App__AppSidebar__heading___nZ31m","AppSidebar__section":"App__AppSidebar__section___QZuCD","AppSidebar__section_full":"App__AppSidebar__section_full___2-O-7"};

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _QueryList = __webpack_require__(497);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _Query = __webpack_require__(498);

	var _Query2 = _interopRequireDefault(_Query);

	var _List = __webpack_require__(509);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QueryList = function (_React$Component) {
	  _inherits(QueryList, _React$Component);

	  function QueryList() {
	    _classCallCheck(this, QueryList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueryList).apply(this, arguments));
	  }

	  _createClass(QueryList, [{
	    key: 'render',
	    value: function render() {
	      var queries = this.props.queries;


	      return _react2.default.createElement(_List2.default, {
	        n: 1.5,
	        items: queries.map(function (q, index) {
	          return _react2.default.createElement(_Query2.default, {
	            key: index,
	            query: q });
	        }) });
	    }
	  }]);

	  return QueryList;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    queries: [].concat(_toConsumableArray(state.data.queries)).sort(function (a, b) {
	      return b.examplesCount - a.examplesCount;
	    })
	  };
		})(QueryList);

/***/ },

/***/ 497:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryList":"QueryList__QueryList___2HcgL"};

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Query = __webpack_require__(499);

	var _Query2 = _interopRequireDefault(_Query);

	var _Media = __webpack_require__(500);

	var _Media2 = _interopRequireDefault(_Media);

	var _Flex = __webpack_require__(502);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _ExamplesBar = __webpack_require__(503);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _Block = __webpack_require__(508);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Query = function Query(_ref) {
	  var query = _ref.query;
	  var examples = _ref.examples;

	  var relatedImages = examples.filter(function (e) {
	    return e.relevance === -1;
	  });
	  var relatedImagesPerColumn = 7;
	  var relatedColsCount = Math.ceil(relatedImages.length / relatedImagesPerColumn);
	  var relatedImagesColumns = [];
	  for (var i = 0; i < relatedColsCount; i++) {
	    relatedImagesColumns[i] = relatedImages.slice(i * relatedImagesPerColumn, (i + 1) * relatedImagesPerColumn);
	  }

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
	    })
	  }];

	  var _loop = function _loop(_i) {
	    searchResultsChartData = [{
	      label: '' + _i,
	      page: _i,
	      examples: examples.filter(function (e) {
	        return e.relevance === _i;
	      })
	    }].concat(_toConsumableArray(searchResultsChartData));
	  };

	  for (var _i = 9; _i > 0; _i--) {
	    _loop(_i);
	  }

	  var searchResultsChart = _react2.default.createElement(
	    'div',
	    { className: _Query2.default.qChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.qChart__title },
	      'Search Result Pages'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qChart__canvas },
	        searchResultsChartData.map(function (s, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: query.query,
	            page: s.page,
	            label: s.label,
	            examples: examples.filter(function (e) {
	              return e.relevance === s.page;
	            }) });
	        })
	      )
	    )
	  );

	  var relatedImagesChart = _react2.default.createElement(
	    'div',
	    { className: _Query2.default.qChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.qChart__title },
	      'Related Images'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qChart__canvas },
	        relatedImagesColumns.map(function (c, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: query.query,
	            page: -1,
	            theme: 'accent2',
	            examples: c });
	        })
	      )
	    )
	  );

	  return _react2.default.createElement(
	    'div',
	    { className: _Query2.default.Query },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.Query__header },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qHeader },
	        _react2.default.createElement(
	          _Flex2.default,
	          {
	            alignItems: 'center',
	            justifyContent: 'space-between' },
	          _react2.default.createElement(
	            'div',
	            { className: _Query2.default.qHeader__query },
	            query.query
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _Query2.default.qHeader__examplesCount },
	            query.examplesCount,
	            ' example(s)'
	          )
	        )
	      )
	    ),
	    query.examplesCount ? _react2.default.createElement(
	      'div',
	      { className: _Query2.default.Query__body },
	      _react2.default.createElement(_Media2.default, {
	        alignItems: 'stretch',
	        figure: searchResultsChart,
	        body: relatedImagesChart })
	    ) : ''
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	  return {
	    examples: state.data.examples.filter(function (e) {
	      return e.query === ownProps.query.query;
	    })
	  };
		})(Query);

/***/ },

/***/ 499:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Query":"Query__Query___32yVP","Query__header":"Query__Query__header____CMRg","Query__body":"Query__Query__body___3wjLX","qHeader":"Query__qHeader___1vH8H","qHeader__query":"Query__qHeader__query___AneVh","qHeader__examplesCount":"Query__qHeader__examplesCount___1x_SX","qChart":"Query__qChart___EjNV6","qChart__title":"Query__qChart__title___hN_to","qChart__canvas":"Query__qChart__canvas___1knIp"};

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Media = __webpack_require__(501);

	var _Media2 = _interopRequireDefault(_Media);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;


	var MediaBody = function MediaBody(_ref) {
	  var content = _ref.content;

	  return _react2.default.createElement(
	    'div',
	    { className: _Media2.default.media__body },
	    content
	  );
	};

	var MediaFigure = function MediaFigure(_ref2) {
	  var n = _ref2.n;
	  var content = _ref2.content;
	  var _ref2$reverse = _ref2.reverse;
	  var reverse = _ref2$reverse === undefined ? false : _ref2$reverse;

	  var style = {};
	  if (reverse) {
	    style.marginLeft = baseline * n + 'rem';
	  } else {
	    style.marginRight = baseline * n + 'rem';
	  }

	  return _react2.default.createElement(
	    'div',
	    { style: style, className: _Media2.default.media__figure },
	    content
	  );
	};

	var Media = function Media(_ref3) {
	  var figure = _ref3.figure;
	  var body = _ref3.body;
	  var _ref3$n = _ref3.n;
	  var n = _ref3$n === undefined ? 1 : _ref3$n;
	  var _ref3$reverse = _ref3.reverse;
	  var reverse = _ref3$reverse === undefined ? false : _ref3$reverse;
	  var _ref3$alignItems = _ref3.alignItems;
	  var alignItems = _ref3$alignItems === undefined ? 'flex-start' : _ref3$alignItems;

	  var style = {
	    alignItems: alignItems
	  };

	  var figureElement = _react2.default.createElement(MediaFigure, {
	    content: figure,
	    reverse: reverse,
	    n: n });

	  var bodyElement = _react2.default.createElement(MediaBody, {
	    content: body });

	  if (reverse) {
	    return _react2.default.createElement(
	      'div',
	      { style: style, className: _Media2.default.media },
	      bodyElement,
	      figureElement
	    );
	  } else {
	    return _react2.default.createElement(
	      'div',
	      { style: style, className: _Media2.default.media },
	      figureElement,
	      bodyElement
	    );
	  }
	};

	exports.default = Media;

/***/ },

/***/ 501:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"media":"Media__media___9EAih","media__figure":"Media__media__figure___1msaG","media__body":"Media__media__body___1VZfM"};

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Flex = function Flex(_ref) {
	  var _ref$flexDirection = _ref.flexDirection;
	  var flexDirection = _ref$flexDirection === undefined ? 'row' : _ref$flexDirection;
	  var _ref$justifyContent = _ref.justifyContent;
	  var justifyContent = _ref$justifyContent === undefined ? 'flex-start' : _ref$justifyContent;
	  var _ref$alignItems = _ref.alignItems;
	  var alignItems = _ref$alignItems === undefined ? 'center' : _ref$alignItems;
	  var children = _ref.children;

	  var style = {
	    flexDirection: flexDirection,
	    alignItems: alignItems,
	    justifyContent: justifyContent,
	    display: 'flex',
	    width: '100%',
	    height: '100%'
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: style },
	    children
	  );
	};

	exports.default = Flex;

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExamplesBar = __webpack_require__(504);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _ExamplesBarItem = __webpack_require__(505);

	var _ExamplesBarItem2 = _interopRequireDefault(_ExamplesBarItem);

	var _uiActions = __webpack_require__(507);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExamplesBar = function ExamplesBar(_ref) {
	  var examples = _ref.examples;
	  var query = _ref.query;
	  var page = _ref.page;
	  var _ref$label = _ref.label;
	  var label = _ref$label === undefined ? '' : _ref$label;
	  var focusedGroupPage = _ref.focusedGroupPage;
	  var focusedGroupQuery = _ref.focusedGroupQuery;
	  var toggleFocusExampleGroup = _ref.toggleFocusExampleGroup;

	  var classNames = [_ExamplesBar2.default.ExamplesBar];
	  if (focusedGroupPage) {
	    if (focusedGroupQuery && focusedGroupQuery !== query || focusedGroupPage !== page) {
	      classNames.push(_ExamplesBar2.default.ExamplesBar_dimmed);
	    }
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onClick: toggleFocusExampleGroup,
	      className: classNames.join(' ') },
	    examples.map(function (e, index) {
	      return _react2.default.createElement(_ExamplesBarItem2.default, {
	        key: index,
	        example: e });
	    }),
	    _react2.default.createElement(
	      'div',
	      { className: _ExamplesBar2.default.ExamplesBar__label },
	      label
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery
	  };
	}, function (dispatch, ownProps) {
	  return {
	    toggleFocusExampleGroup: function toggleFocusExampleGroup() {
	      dispatch((0, _uiActions.toggleFocusExampleGroup)(ownProps.query, ownProps.page));
	    }
	  };
		})(ExamplesBar);

/***/ },

/***/ 504:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExamplesBar":"ExamplesBar__ExamplesBar___2Ba8-","ExamplesBar__label":"ExamplesBar__ExamplesBar__label___14Cl1","ExamplesBar_dimmed":"ExamplesBar__ExamplesBar_dimmed___1nFEB"};

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExamplesBarItem = __webpack_require__(506);

	var _ExamplesBarItem2 = _interopRequireDefault(_ExamplesBarItem);

	var _uiActions = __webpack_require__(507);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExamplesBarItem = function ExamplesBarItem(_ref) {
	  var example = _ref.example;
	  var highlightedExampleId = _ref.highlightedExampleId;
	  var highlightExample = _ref.highlightExample;
	  var dimExample = _ref.dimExample;

	  return _react2.default.createElement('div', {
	    onMouseEnter: highlightExample,
	    onMouseLeave: dimExample,
	    className: _ExamplesBarItem2.default.ExamplesBarItem + ' ' + (highlightedExampleId === example._id ? _ExamplesBarItem2.default.ExamplesBarItem_highlighted : '') });
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    highlightedExampleId: state.ui.highlightedExampleId
	  };
	}, function (dispatch, ownProps) {
	  return {
	    highlightExample: function highlightExample() {
	      dispatch((0, _uiActions.highlightExample)(ownProps.example._id));
	    },
	    dimExample: function dimExample() {
	      dispatch((0, _uiActions.highlightExample)(null));
	    }
	  };
		})(ExamplesBarItem);

/***/ },

/***/ 506:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExamplesBarItem":"ExamplesBarItem__ExamplesBarItem___K0GEc"};

/***/ },

/***/ 507:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE_FOCUS_EXAMPLE_GROUP = exports.TOGGLE_FOCUS_EXAMPLE_GROUP = 'TOGGLE_FOCUS_EXAMPLE_GROUP';
	var HIGHLIGHT_EXAMPLE = exports.HIGHLIGHT_EXAMPLE = 'HIGHLIGHT_EXAMPLE';

	var highlightExample = exports.highlightExample = function highlightExample(id) {
	  return {
	    type: HIGHLIGHT_EXAMPLE,
	    id: id
	  };
	};

	var toggleFocusExampleGroup = exports.toggleFocusExampleGroup = function toggleFocusExampleGroup(query, page) {
	  return {
	    type: TOGGLE_FOCUS_EXAMPLE_GROUP,
	    query: query,
	    page: page
	  };
		};

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

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

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _List = __webpack_require__(510);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;


	var ListItem = function ListItem(_ref) {
	  var _ref$n = _ref.n;
	  var n = _ref$n === undefined ? 1 : _ref$n;
	  var item = _ref.item;

	  var style = {
	    marginBottom: baseline * n + 'rem'
	  };

	  return _react2.default.createElement(
	    'li',
	    { style: style, className: _List2.default.list__item },
	    item
	  );
	};

	var List = function List(_ref2) {
	  var items = _ref2.items;
	  var _ref2$n = _ref2.n;
	  var n = _ref2$n === undefined ? 1 : _ref2$n;
	  var _ref2$alignItems = _ref2.alignItems;
	  var alignItems = _ref2$alignItems === undefined ? 'flex-start' : _ref2$alignItems;
	  var _ref2$justifyContent = _ref2.justifyContent;
	  var justifyContent = _ref2$justifyContent === undefined ? 'flex-start' : _ref2$justifyContent;

	  var style = {
	    marginBottom: '-' + baseline * n + 'rem',
	    alignItems: alignItems,
	    justifyContent: justifyContent
	  };

	  var listItems = items.map(function (i, index) {
	    return _react2.default.createElement(ListItem, { key: index, item: i, n: n });
	  });

	  return _react2.default.createElement(
	    'ul',
	    { style: style, className: _List2.default.list },
	    listItems
	  );
	};

	exports.default = List;

/***/ },

/***/ 510:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"list":"List__list___2Ho-z","list__item":"List__list__item___Kvdr6"};

/***/ },

/***/ 511:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExampleList = __webpack_require__(512);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var CollectionView = function CollectionView(_ref) {
	  var examples = _ref.examples;

	  return _react2.default.createElement(_ExampleList2.default, {
	    nCols: 5,
	    examples: examples });
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    examples: [].concat(_toConsumableArray(state.data.examples)).sort(function (a, b) {
	      if (b.createdAt > a.createdAt) {
	        return -1;
	      } else if (a.createdAt >= b.createdAt) {
	        return 1;
	      }
	    })
	  };
		})(CollectionView);

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(513);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Example = __webpack_require__(514);

	var _Example2 = _interopRequireDefault(_Example);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExampleList = function (_React$Component) {
	  _inherits(ExampleList, _React$Component);

	  function ExampleList() {
	    _classCallCheck(this, ExampleList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExampleList).apply(this, arguments));
	  }

	  _createClass(ExampleList, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var examples = _props.examples;
	      var nCols = _props.nCols;

	      var columns = [];

	      var _loop = function _loop(i) {
	        var column = examples.filter(function (e, index) {
	          return index % nCols === i;
	        });

	        columns.push(column);
	      };

	      for (var i = 0; i < nCols; i++) {
	        _loop(i);
	      }

	      var classNames = [_ExampleList2.default.ExampleList];

	      return _react2.default.createElement(
	        'div',
	        { className: classNames.join(' ') },
	        columns.map(function (column, i) {
	          return _react2.default.createElement(
	            'div',
	            {
	              key: i,
	              className: _ExampleList2.default.ExampleList__column },
	            column.map(function (example, j) {
	              return _react2.default.createElement(
	                'div',
	                {
	                  key: j,
	                  className: _ExampleList2.default.ExampleList__example },
	                _react2.default.createElement(_Example2.default, {
	                  compact: nCols > 5,
	                  example: example })
	              );
	            })
	          );
	        })
	      );
	    }
	  }]);

	  return ExampleList;
	}(_react2.default.Component);

		exports.default = ExampleList;

/***/ },

/***/ 513:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExampleList":"ExampleList__ExampleList___74Jc3","ExampleList__column":"ExampleList__ExampleList__column___3FzkW","ExampleList__example":"ExampleList__ExampleList__example___3ejL_"};

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Example = __webpack_require__(515);

	var _Example2 = _interopRequireDefault(_Example);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Example = function Example(_ref) {
	  var example = _ref.example;
	  var focusedGroupPage = _ref.focusedGroupPage;
	  var focusedGroupQuery = _ref.focusedGroupQuery;
	  var highlightedExampleId = _ref.highlightedExampleId;

	  var classNames = [_Example2.default.Example, example.query.replace(/\s/g, '_').replace(/"/g, ''), 'page' + example.relevance];
	  if (focusedGroupPage) {
	    if (focusedGroupQuery && focusedGroupQuery !== example.query) {
	      classNames.push(_Example2.default.Example_dimmed);
	    } else if (focusedGroupPage !== example.relevance) {
	      classNames.push(_Example2.default.Example_dimmed);
	    } else {
	      classNames.push(_Example2.default.Example_focused);
	    }
	  }

	  if (highlightedExampleId === example._id) {
	    classNames.push(_Example2.default.Example_highlighted);
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      id: example._id,
	      className: classNames.join(' ') },
	    _react2.default.createElement(
	      'a',
	      {
	        href: 'https://pinterest.com/pin/' + example.example.id,
	        className: _Example2.default.Example__imageWrapper,
	        target: '_blank' },
	      _react2.default.createElement('img', {
	        className: _Example2.default.Example__image,
	        src: example.example.src }),
	      _react2.default.createElement(
	        'div',
	        { className: _Example2.default.Example__descriptionOverlay },
	        _react2.default.createElement(
	          'div',
	          { className: _Example2.default.Example__description },
	          example.imageDescription
	        )
	      )
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	  return {
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery,
	    highlightedExampleId: state.ui.highlightedExampleId
	  };
		})(Example);

/***/ },

/***/ 515:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Example":"Example__Example___27S0i","Example__imageWrapper":"Example__Example__imageWrapper___1L-z5","Example__descriptionOverlay":"Example__Example__descriptionOverlay___2UzC3","Example__image":"Example__Example__image___3Yd61","Example__description":"Example__Example__description___1RWhr","Example_dimmed":"Example__Example_dimmed___2sTfY","Example_focused":"Example__Example_focused___36rx0"};

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Summary = __webpack_require__(517);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Media = __webpack_require__(500);

	var _Media2 = _interopRequireDefault(_Media);

	var _Flex = __webpack_require__(502);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _ExamplesBar = __webpack_require__(503);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _Block = __webpack_require__(508);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Summary = function Summary(_ref) {
	  var queriesCount = _ref.queriesCount;
	  var examples = _ref.examples;

	  var relatedImages = examples.filter(function (e) {
	    return e.relevance === -1;
	  });
	  var relatedImagesPerColumn = 7;
	  var relatedColsCount = Math.ceil(relatedImages.length / relatedImagesPerColumn);
	  var relatedImagesColumns = [];
	  for (var i = 0; i < relatedColsCount; i++) {
	    relatedImagesColumns[i] = relatedImages.slice(i * relatedImagesPerColumn, (i + 1) * relatedImagesPerColumn);
	  }

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
	    })
	  }];

	  var _loop = function _loop(_i) {
	    searchResultsChartData = [{
	      label: '' + _i,
	      page: _i,
	      examples: examples.filter(function (e) {
	        return e.relevance === _i;
	      })
	    }].concat(_toConsumableArray(searchResultsChartData));
	  };

	  for (var _i = 9; _i > 0; _i--) {
	    _loop(_i);
	  }

	  var searchResultsChart = _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.sChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.sChart__title },
	      'Search Result Pages'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Summary2.default.sChart__canvas },
	        searchResultsChartData.map(function (s, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: null,
	            page: s.page,
	            label: s.label,
	            examples: examples.filter(function (e) {
	              return e.relevance === s.page;
	            }) });
	        })
	      )
	    )
	  );

	  var relatedImagesChart = _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.sChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.sChart__title },
	      'Related Images'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Summary2.default.sChart__canvas },
	        relatedImagesColumns.map(function (c, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: null,
	            page: -1,
	            theme: 'accent2',
	            examples: c });
	        })
	      )
	    )
	  );

	  return _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.Summary },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.Summary__header },
	      _react2.default.createElement(
	        _Flex2.default,
	        {
	          alignItems: 'center',
	          justifyContent: 'center' },
	        _react2.default.createElement(
	          'div',
	          { className: _Summary2.default.sHeader },
	          _react2.default.createElement(_Media2.default, {
	            alignItems: 'center',
	            figure: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__counter },
	              queriesCount
	            ),
	            body: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__body },
	              'search queries'
	            ) })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _Summary2.default.sHeader },
	          _react2.default.createElement(_Media2.default, {
	            alignItems: 'center',
	            figure: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__counter },
	              examples.length
	            ),
	            body: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__body },
	              'examples collected'
	            ) })
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.Summary__body },
	      _react2.default.createElement(_Media2.default, {
	        alignItems: 'stretch',
	        figure: searchResultsChart,
	        body: relatedImagesChart })
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    queriesCount: state.data.queries.length,
	    examples: state.data.examples
	  };
		})(Summary);

/***/ },

/***/ 517:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Summary":"Summary__Summary___2vbQY","Summary__header":"Summary__Summary__header___1WvvM","Summary__body":"Summary__Summary__body___3F3-b","sHeader":"Summary__sHeader___3-LoW","sHeader__counter":"Summary__sHeader__counter___3Zgqn","sHeader__body":"Summary__sHeader__body___36EEB","sChart":"Summary__sChart___3IpWC","sChart__title":"Summary__sChart__title___2HV6I","sChart__canvas":"Summary__sChart__canvas___1w9nY"};

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(519);

	var _Title2 = _interopRequireDefault(_Title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Title = function Title(_ref) {
	  var title = _ref.title;

	  return _react2.default.createElement(
	    'div',
	    { className: _Title2.default.Title },
	    _react2.default.createElement(
	      'div',
	      { className: _Title2.default.Title__text },
	      title
	    )
	  );
	};

	exports.default = Title;

/***/ },

/***/ 519:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Title":"Title__Title___17BuK","Title__text":"Title__Title__text___1TsHj"};

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(521);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 569:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var RECEIVE_DATA = exports.RECEIVE_DATA = 'RECEIVE_DATA';
	var RECEIVE_EXAMPLE = exports.RECEIVE_EXAMPLE = 'RECEIVE_EXAMPLE';
	var RECEIVE_QUERY = exports.RECEIVE_QUERY = 'RECEIVE_QUERY';
	var INC_EXAMPLE_COUNTER = exports.INC_EXAMPLE_COUNTER = 'INC_EXAMPLE_COUNTER';

	var receiveExample = exports.receiveExample = function receiveExample(example) {
	  return function (dispatch, getState) {
	    console.log(example);
	    dispatch({
	      type: INC_EXAMPLE_COUNTER,
	      query: example.query
	    });

	    dispatch({
	      type: RECEIVE_EXAMPLE,
	      example: example
	    });
	  };
	};

	var receiveQuery = exports.receiveQuery = function receiveQuery(query) {
	  return function (dispatch) {
	    dispatch({
	      type: RECEIVE_QUERY,
	      query: _extends({}, query, {
	        examplesCount: 0
	      })
	    });
	  };
	};

	var receiveData = exports.receiveData = function receiveData(queries, examples) {
	  return function (dispatch) {
	    var enhancedQueries = queries.map(function (q, index) {
	      return _extends({}, q, {
	        examplesCount: examples.filter(function (e) {
	          return e.query === q.query;
	        }).length
	      });
	    });

	    dispatch({
	      type: RECEIVE_DATA,
	      queries: enhancedQueries,
	      examples: examples
	    });
	  };
	};

/***/ },

/***/ 570:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RECEIVE_STUDY = exports.RECEIVE_STUDY = 'RECEIVE_STUDY';
	var KILL_STUDY = exports.KILL_STUDY = 'KILL_STUDY';

	var receiveStudy = exports.receiveStudy = function receiveStudy(participantId, sessionId, condition, taskAlias) {
	  return {
	    type: RECEIVE_STUDY,
	    participantId: participantId,
	    sessionId: sessionId,
	    condition: condition,
	    taskAlias: taskAlias
	  };
	};

	var killStudy = exports.killStudy = function killStudy() {
	  return {
	    type: KILL_STUDY
	  };
		};

/***/ },

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(572);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(573);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(574);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var middleware = [_reduxThunk2.default];

	// if (process.env.NODE_ENV === 'development') {
	//   const logger = createLogger()
	//   middleware.push(logger)
	// }

	var configureStore = function configureStore(initialState) {
	  return (0, _redux.createStore)(_rootReducer2.default, initialState, _redux.applyMiddleware.apply(undefined, middleware));
	};

	exports.default = configureStore;

/***/ },

/***/ 574:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(575);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(577);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(578);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 575:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(569);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var data = function data() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.data : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _dataActions.RECEIVE_DATA:
	      return _extends({}, state, {
	        queries: action.queries,
	        examples: action.examples
	      });
	    case _dataActions.RECEIVE_EXAMPLE:
	      return _extends({}, state, {
	        examples: [].concat(_toConsumableArray(state.examples), [action.example])
	      });
	    case _dataActions.RECEIVE_QUERY:
	      return _extends({}, state, {
	        queries: [].concat(_toConsumableArray(state.queries), [action.query])
	      });
	    case _dataActions.INC_EXAMPLE_COUNTER:
	      return _extends({}, state, {
	        queries: state.queries.map(function (q) {
	          if (q.query === action.query) {
	            return _extends({}, q, {
	              examplesCount: q.examplesCount + 1
	            });
	          } else {
	            return q;
	          }
	        })
	      });
	    default:
	      return state;
	  }
	};

	exports.default = data;

/***/ },

/***/ 576:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: {
	    queries: [],
	    examples: []
	  },
	  ui: {
	    focusedGroupPage: null,
	    focusedGroupQuery: null,
	    highlightedExampleId: null
	  },
	  study: {
	    participantId: '',
	    sessionId: null,
	    condition: 'baseline',
	    taskAlias: ''
	  }
		};

/***/ },

/***/ 577:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(507);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ui = function ui() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.ui : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _uiActions.TOGGLE_FOCUS_EXAMPLE_GROUP:
	      if (action.page === state.focusedGroupPage && action.query === state.focusedGroupQuery) {
	        return _extends({}, state, {
	          focusedGroupPage: null,
	          focusedGroupQuery: null
	        });
	      } else {
	        return _extends({}, state, {
	          focusedGroupPage: action.page,
	          focusedGroupQuery: action.query
	        });
	      }
	    case _uiActions.HIGHLIGHT_EXAMPLE:
	      return _extends({}, state, {
	        highlightedExampleId: action.id
	      });
	    default:
	      return state;
	  }
	};

	exports.default = ui;

/***/ },

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(570);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var study = function study() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.study : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _studyActions.RECEIVE_STUDY:
	      return _extends({}, state, {
	        participantId: action.participantId,
	        sessionId: action.sessionId,
	        condition: action.condition,
	        taskAlias: action.taskAlias
	      });
	    case _studyActions.KILL_STUDY:
	      return _extends({}, state, {
	        sessionId: null
	      });
	    default:
	      return state;
	  }
	};

	exports.default = study;

/***/ },

/***/ 579:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2xheW91dHMvQmxvY2svQmxvY2suanN4Iiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9MaXN0L0xpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9sYXlvdXRzL0xpc3QvTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25WaWV3L0NvbGxlY3Rpb25WaWV3LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9TdW1tYXJ5L1N1bW1hcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1N1bW1hcnkvU3VtbWFyeS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBRdWVyeUxpc3QgZnJvbSAnLi4vUXVlcnlMaXN0J1xuaW1wb3J0IENvbGxlY3Rpb25WaWV3IGZyb20gJy4uL0NvbGxlY3Rpb25WaWV3J1xuaW1wb3J0IFN1bW1hcnkgZnJvbSAnLi4vU3VtbWFyeSdcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5LCBraWxsU3R1ZHl9IGZyb20gJy4uLy4uL3N0b3JlL3N0dWR5QWN0aW9ucydcblxuY29uc3Qgc2Nyb2xsVG8gPSAoZWxlbWVudCwgdG8sIGR1cmF0aW9uKSA9PiB7XG4gIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gdG8gLSBlbGVtZW50LnNjcm9sbFRvcFxuICAgIGNvbnN0IHBlclRpY2sgPSBkaWZmZXJlbmNlIC8gZHVyYXRpb24gKiAxMFxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wICsgcGVyVGlja1xuICAgICAgaWYgKChkaWZmZXJlbmNlID4gMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA8IHRvKSB8fFxuICAgICAgICAgIChkaWZmZXJlbmNlIDwgMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA+IHRvKSkge1xuICAgICAgICBzY3JvbGxUbyhlbGVtZW50LCB0bywgZHVyYXRpb24gLSAxMClcbiAgICAgIH1cbiAgICB9LCAxMClcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGNvbnN0IHtmb2N1c2VkR3JvdXBQYWdlLCBmb2N1c2VkR3JvdXBRdWVyeX0gPSBuZXdQcm9wc1xuXG4gICAgaWYgKGZvY3VzZWRHcm91cFBhZ2UgIT09IHRoaXMucHJvcHMuZm9jdXNlZEdyb3VwUGFnZSB8fCBmb2N1c2VkR3JvdXBRdWVyeSAhPT0gdGhpcy5wcm9wcy5mb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgICAgaWYgKGZvY3VzZWRHcm91cFBhZ2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdG9yUXVlcnkgPSBgLnBhZ2Uke2ZvY3VzZWRHcm91cFBhZ2V9YFxuICAgICAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgICAgICBzZWxlY3RvclF1ZXJ5ID0gYCR7c2VsZWN0b3JRdWVyeX0uJHtmb2N1c2VkR3JvdXBRdWVyeS5yZXBsYWNlKC9cXHMvZywgJ18nKS5yZXBsYWNlKC9cIi9nLCAnJyl9YFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdG9yUXVlcnkpXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yUXVlcnkpKVxuICAgICAgICBjb25zdCB0b3BNYXRjaGluZ0VsZW1lbnQgPSBtYXRjaGluZ0VsZW1lbnRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICByZXR1cm4gYS5vZmZzZXRUb3AgLSBiLm9mZnNldFRvcFxuICAgICAgICB9KVswXVxuXG4gICAgICAgIHNjcm9sbFRvKHRoaXMuX21haW4sIHRvcE1hdGNoaW5nRWxlbWVudC5vZmZzZXRUb3AsIDIwMClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgIGNvbnN0IHtkaXNwYXRjaH0gPSB0aGlzLnByb3BzXG5cbiAgICBzb2NrZXQuZW1pdCgnZ2V0IHN0dWR5JylcblxuICAgIHNvY2tldC5vbignc3R1ZHknLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVN0dWR5KGRhdGEucGFydGljaXBhbnRJZCwgZGF0YS5zZXNzaW9uSWQsIGRhdGEuY29uZGl0aW9uLCBkYXRhLnRhc2tBbGlhcykpXG4gICAgICBzb2NrZXQuZW1pdCgnZ2V0IGRhdGEnLCB7c2Vzc2lvbklkOiBkYXRhLnRyYWluaW5nID8gJ3Rlc3QnIDogZGF0YS5zZXNzaW9uSWQsIHRhc2tBbGlhczogZGF0YS50YXNrQWxpYXN9KVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0ga2lsbCBzdHVkeScsICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGtpbGxTdHVkeSgpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0gY3JlYXRlIGV4YW1wbGUnLCBlID0+IHtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVFeGFtcGxlKGUpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0gY3JlYXRlIHF1ZXJ5JywgcSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlUXVlcnkocSkpXG4gICAgfSlcblxuICAgIHNvY2tldC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRGF0YShkYXRhLnF1ZXJpZXMsIGRhdGEuZXhhbXBsZXMsIGRhdGEudGFzaykpXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2NvbmRpdGlvbn0gPSB0aGlzLnByb3BzXG5cbiAgICBsZXQgc2lkZWJhckVsID0gJydcbiAgICBpZiAoY29uZGl0aW9uID09PSAnc3lzdGVtJykge1xuICAgICAgc2lkZWJhckVsID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9faGVhZGluZ30+XG4gICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJDb2xsZWN0aW9uIFN1bW1hcnlcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9ufT5cbiAgICAgICAgICAgIDxTdW1tYXJ5IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRpbmd9PlxuICAgICAgICAgICAgPFRpdGxlIHRpdGxlPVwiU2VhcmNoIEhpc3RvcnlcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9ufSAke3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9uX2Z1bGx9YH0+XG4gICAgICAgICAgICA8UXVlcnlMaXN0IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcH0+XG4gICAgICAgIHtzaWRlYmFyRWx9XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMuX21haW4gPSBlbCB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkFwcF9fbWFpbn0+XG4gICAgICAgICAgPENvbGxlY3Rpb25WaWV3IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2Vzc2lvbklkOiBzdGF0ZS5zdHVkeS5zZXNzaW9uSWQsXG4gICAgICBjb25kaXRpb246IHN0YXRlLnN0dWR5LmNvbmRpdGlvbixcbiAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFBhZ2UsXG4gICAgICBmb2N1c2VkR3JvdXBRdWVyeTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUXVlcnlcbiAgICB9XG4gIH1cbikoQXBwKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJBcHBcIjpcIkFwcF9fQXBwX19fbEJFWElcIixcIkFwcF9fbWFpblwiOlwiQXBwX19BcHBfX21haW5fX18yVlpqaVwiLFwiQXBwU2lkZWJhclwiOlwiQXBwX19BcHBTaWRlYmFyX19fd1h2RjRcIixcIkFwcFNpZGViYXJfX2hlYWRpbmdcIjpcIkFwcF9fQXBwU2lkZWJhcl9faGVhZGluZ19fX25aMzFtXCIsXCJBcHBTaWRlYmFyX19zZWN0aW9uXCI6XCJBcHBfX0FwcFNpZGViYXJfX3NlY3Rpb25fX19RWnVDRFwiLFwiQXBwU2lkZWJhcl9fc2VjdGlvbl9mdWxsXCI6XCJBcHBfX0FwcFNpZGViYXJfX3NlY3Rpb25fZnVsbF9fXzItTy03XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5TGlzdC5jc3MnXG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vUXVlcnknXG5pbXBvcnQgTGlzdCBmcm9tICcuLi8uLi9sYXlvdXRzL0xpc3QnXG5cbmNsYXNzIFF1ZXJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3F1ZXJpZXN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0XG4gICAgICAgIG49ezEuNX1cbiAgICAgICAgaXRlbXM9e3F1ZXJpZXMubWFwKChxLCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxRdWVyeVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBxdWVyeT17cX0gLz5cbiAgICAgICAgKX0gLz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyaWVzOiBbLi4uc3RhdGUuZGF0YS5xdWVyaWVzXS5zb3J0KChhLCBiKSA9PiBiLmV4YW1wbGVzQ291bnQgLSBhLmV4YW1wbGVzQ291bnQpXG4gICAgfVxuICB9XG4pKFF1ZXJ5TGlzdClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlMaXN0XCI6XCJRdWVyeUxpc3RfX1F1ZXJ5TGlzdF9fXzJIY2dMXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5LmNzcydcbmltcG9ydCBNZWRpYSBmcm9tICcuLi8uLi9sYXlvdXRzL01lZGlhJ1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vLi4vbGF5b3V0cy9GbGV4J1xuaW1wb3J0IEV4YW1wbGVzQmFyIGZyb20gJy4uL0V4YW1wbGVzQmFyJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNvbnN0IFF1ZXJ5ID0gKHtcbiAgcXVlcnksXG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIGNvbnN0IHJlbGF0ZWRJbWFnZXMgPSBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gLTEpXG4gIGNvbnN0IHJlbGF0ZWRJbWFnZXNQZXJDb2x1bW4gPSA3XG4gIGxldCByZWxhdGVkQ29sc0NvdW50ID0gTWF0aC5jZWlsKHJlbGF0ZWRJbWFnZXMubGVuZ3RoIC8gcmVsYXRlZEltYWdlc1BlckNvbHVtbilcbiAgbGV0IHJlbGF0ZWRJbWFnZXNDb2x1bW5zID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxhdGVkQ29sc0NvdW50OyBpKyspIHtcbiAgICByZWxhdGVkSW1hZ2VzQ29sdW1uc1tpXSA9IHJlbGF0ZWRJbWFnZXMuc2xpY2UoaSAqIHJlbGF0ZWRJbWFnZXNQZXJDb2x1bW4sIChpICsgMSkgKiByZWxhdGVkSW1hZ2VzUGVyQ29sdW1uKVxuICB9XG5cbiAgbGV0IHNlYXJjaFJlc3VsdHNDaGFydERhdGEgPSBbXG4gICAge1xuICAgICAgbGFiZWw6ICcxMCsnLFxuICAgICAgcGFnZTogMTAsXG4gICAgICBleGFtcGxlczogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IDEwKVxuICAgIH1cbiAgXVxuICBmb3IgKGxldCBpID0gOTsgaSA+IDA7IGktLSkge1xuICAgIHNlYXJjaFJlc3VsdHNDaGFydERhdGEgPSBbXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBgJHtpfWAsXG4gICAgICAgIHBhZ2U6IGksXG4gICAgICAgIGV4YW1wbGVzOiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gaSlcbiAgICAgIH0sXG4gICAgICAuLi5zZWFyY2hSZXN1bHRzQ2hhcnREYXRhXG4gICAgXVxuICB9XG5cbiAgY29uc3Qgc2VhcmNoUmVzdWx0c0NoYXJ0ID0gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0X190aXRsZX0+U2VhcmNoIFJlc3VsdCBQYWdlczwvZGl2PlxuXG4gICAgICA8QmxvY2sgbj17MC41fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnRfX2NhbnZhc30+XG4gICAgICAgICAge3NlYXJjaFJlc3VsdHNDaGFydERhdGEubWFwKChzLCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxFeGFtcGxlc0JhclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBxdWVyeT17cXVlcnkucXVlcnl9XG4gICAgICAgICAgICAgIHBhZ2U9e3MucGFnZX1cbiAgICAgICAgICAgICAgbGFiZWw9e3MubGFiZWx9XG4gICAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gcy5wYWdlKX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICBjb25zdCByZWxhdGVkSW1hZ2VzQ2hhcnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnRfX3RpdGxlfT5SZWxhdGVkIEltYWdlczwvZGl2PlxuXG4gICAgICA8QmxvY2sgbj17MC41fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnRfX2NhbnZhc30+XG4gICAgICAgICAge3JlbGF0ZWRJbWFnZXNDb2x1bW5zLm1hcCgoYywgaW5kZXgpID0+XG4gICAgICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgcXVlcnk9e3F1ZXJ5LnF1ZXJ5fVxuICAgICAgICAgICAgICBwYWdlPXstMX1cbiAgICAgICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICAgICAgZXhhbXBsZXM9e2N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIDwvZGl2PlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlfX2hlYWRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUhlYWRlcn0+XG4gICAgICAgICAgPEZsZXhcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFIZWFkZXJfX3F1ZXJ5fT57cXVlcnkucXVlcnl9PC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUhlYWRlcl9fZXhhbXBsZXNDb3VudH0+e3F1ZXJ5LmV4YW1wbGVzQ291bnR9IGV4YW1wbGUocyk8L2Rpdj5cbiAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtxdWVyeS5leGFtcGxlc0NvdW50XG4gICAgICAgID8gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeV9fYm9keX0+XG4gICAgICAgICAgPE1lZGlhXG4gICAgICAgICAgICBhbGlnbkl0ZW1zPVwic3RyZXRjaFwiXG4gICAgICAgICAgICBmaWd1cmU9e3NlYXJjaFJlc3VsdHNDaGFydH1cbiAgICAgICAgICAgIGJvZHk9e3JlbGF0ZWRJbWFnZXNDaGFydH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDogJydcbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGV4YW1wbGVzOiBzdGF0ZS5kYXRhLmV4YW1wbGVzLmZpbHRlcihlID0+IGUucXVlcnkgPT09IG93blByb3BzLnF1ZXJ5LnF1ZXJ5KVxuICAgIH1cbiAgfVxuKShRdWVyeSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlF1ZXJ5XCI6XCJRdWVyeV9fUXVlcnlfX18zMnlWUFwiLFwiUXVlcnlfX2hlYWRlclwiOlwiUXVlcnlfX1F1ZXJ5X19oZWFkZXJfX19fQ01SZ1wiLFwiUXVlcnlfX2JvZHlcIjpcIlF1ZXJ5X19RdWVyeV9fYm9keV9fXzN3akxYXCIsXCJxSGVhZGVyXCI6XCJRdWVyeV9fcUhlYWRlcl9fXzF2SDhIXCIsXCJxSGVhZGVyX19xdWVyeVwiOlwiUXVlcnlfX3FIZWFkZXJfX3F1ZXJ5X19fQW5lVmhcIixcInFIZWFkZXJfX2V4YW1wbGVzQ291bnRcIjpcIlF1ZXJ5X19xSGVhZGVyX19leGFtcGxlc0NvdW50X19fMXhfU1hcIixcInFDaGFydFwiOlwiUXVlcnlfX3FDaGFydF9fX0VqTlY2XCIsXCJxQ2hhcnRfX3RpdGxlXCI6XCJRdWVyeV9fcUNoYXJ0X190aXRsZV9fX2hOX3RvXCIsXCJxQ2hhcnRfX2NhbnZhc1wiOlwiUXVlcnlfX3FDaGFydF9fY2FudmFzX19fMWtuSXBcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vTWVkaWEuY3NzJ1xuXG5jb25zdCBNZWRpYUJvZHkgPSAoe1xuICBjb250ZW50XG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tZWRpYV9fYm9keX0+XG4gICAgICB7Y29udGVudH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5jb25zdCBNZWRpYUZpZ3VyZSA9ICh7XG4gIG4sXG4gIGNvbnRlbnQsXG4gIHJldmVyc2UgPSBmYWxzZVxufSkgPT4ge1xuICBsZXQgc3R5bGUgPSB7fVxuICBpZiAocmV2ZXJzZSkge1xuICAgIHN0eWxlLm1hcmdpbkxlZnQgPSBgJHtiYXNlbGluZSAqIG59cmVtYFxuICB9IGVsc2Uge1xuICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17c3R5bGVzLm1lZGlhX19maWd1cmV9PlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuY29uc3QgTWVkaWEgPSAoe1xuICBmaWd1cmUsXG4gIGJvZHksXG4gIG4gPSAxLFxuICByZXZlcnNlID0gZmFsc2UsXG4gIGFsaWduSXRlbXMgPSAnZmxleC1zdGFydCdcbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgYWxpZ25JdGVtc1xuICB9XG5cbiAgY29uc3QgZmlndXJlRWxlbWVudCA9IChcbiAgICA8TWVkaWFGaWd1cmVcbiAgICAgIGNvbnRlbnQ9e2ZpZ3VyZX1cbiAgICAgIHJldmVyc2U9e3JldmVyc2V9XG4gICAgICBuPXtufSAvPlxuICApXG5cbiAgY29uc3QgYm9keUVsZW1lbnQgPSAoXG4gICAgPE1lZGlhQm9keVxuICAgICAgY29udGVudD17Ym9keX0gLz5cbiAgKVxuXG4gIGlmIChyZXZlcnNlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5tZWRpYX0+XG4gICAgICAgIHtib2R5RWxlbWVudH1cbiAgICAgICAge2ZpZ3VyZUVsZW1lbnR9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5tZWRpYX0+XG4gICAgICAgIHtmaWd1cmVFbGVtZW50fVxuICAgICAgICB7Ym9keUVsZW1lbnR9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL01lZGlhL01lZGlhLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIm1lZGlhXCI6XCJNZWRpYV9fbWVkaWFfX185RUFpaFwiLFwibWVkaWFfX2ZpZ3VyZVwiOlwiTWVkaWFfX21lZGlhX19maWd1cmVfX18xbXNhR1wiLFwibWVkaWFfX2JvZHlcIjpcIk1lZGlhX19tZWRpYV9fYm9keV9fXzFWWmZNXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRmxleCA9ICh7XG4gIGZsZXhEaXJlY3Rpb24gPSAncm93JyxcbiAganVzdGlmeUNvbnRlbnQgPSAnZmxleC1zdGFydCcsXG4gIGFsaWduSXRlbXMgPSAnY2VudGVyJyxcbiAgY2hpbGRyZW5cbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgZmxleERpcmVjdGlvbixcbiAgICBhbGlnbkl0ZW1zLFxuICAgIGp1c3RpZnlDb250ZW50LFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbGV4XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGVzQmFyLmNzcydcbmltcG9ydCBFeGFtcGxlc0Jhckl0ZW0gZnJvbSAnLi4vRXhhbXBsZXNCYXJJdGVtJ1xuaW1wb3J0IHt0b2dnbGVGb2N1c0V4YW1wbGVHcm91cH0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBFeGFtcGxlc0JhciA9ICh7XG4gIGV4YW1wbGVzLFxuICBxdWVyeSxcbiAgcGFnZSxcbiAgbGFiZWwgPSAnJyxcbiAgZm9jdXNlZEdyb3VwUGFnZSxcbiAgZm9jdXNlZEdyb3VwUXVlcnksXG4gIHRvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwXG59KSA9PiB7XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlc0Jhcl1cbiAgaWYgKGZvY3VzZWRHcm91cFBhZ2UpIHtcbiAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkgJiYgZm9jdXNlZEdyb3VwUXVlcnkgIT09IHF1ZXJ5IHx8IGZvY3VzZWRHcm91cFBhZ2UgIT09IHBhZ2UpIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZXNCYXJfZGltbWVkKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25DbGljaz17dG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXB9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIHtleGFtcGxlcy5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICA8RXhhbXBsZXNCYXJJdGVtXG4gICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICBleGFtcGxlPXtlfSAvPlxuICAgICAgKX1cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlc0Jhcl9fbGFiZWx9PntsYWJlbH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFBhZ2UsXG4gICAgICBmb2N1c2VkR3JvdXBRdWVyeTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUXVlcnlcbiAgICB9XG4gIH0sXG4gIChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXA6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXAob3duUHJvcHMucXVlcnksIG93blByb3BzLnBhZ2UpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlc0JhcilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGVzQmFyL0V4YW1wbGVzQmFyLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVzQmFyXCI6XCJFeGFtcGxlc0Jhcl9fRXhhbXBsZXNCYXJfX18yQmE4LVwiLFwiRXhhbXBsZXNCYXJfX2xhYmVsXCI6XCJFeGFtcGxlc0Jhcl9fRXhhbXBsZXNCYXJfX2xhYmVsX19fMTRDbDFcIixcIkV4YW1wbGVzQmFyX2RpbW1lZFwiOlwiRXhhbXBsZXNCYXJfX0V4YW1wbGVzQmFyX2RpbW1lZF9fXzFuRkVCXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlc0Jhckl0ZW0uY3NzJ1xuaW1wb3J0IHtoaWdobGlnaHRFeGFtcGxlfSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IEV4YW1wbGVzQmFySXRlbSA9ICh7XG4gIGV4YW1wbGUsXG4gIGhpZ2hsaWdodGVkRXhhbXBsZUlkLFxuICBoaWdobGlnaHRFeGFtcGxlLFxuICBkaW1FeGFtcGxlXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25Nb3VzZUVudGVyPXtoaWdobGlnaHRFeGFtcGxlfVxuICAgICAgb25Nb3VzZUxlYXZlPXtkaW1FeGFtcGxlfVxuICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuRXhhbXBsZXNCYXJJdGVtfSAke2hpZ2hsaWdodGVkRXhhbXBsZUlkID09PSBleGFtcGxlLl9pZCA/IHN0eWxlcy5FeGFtcGxlc0Jhckl0ZW1faGlnaGxpZ2h0ZWQgOiAnJ31gfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IHN0YXRlLnVpLmhpZ2hsaWdodGVkRXhhbXBsZUlkXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZ2hsaWdodEV4YW1wbGU6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goaGlnaGxpZ2h0RXhhbXBsZShvd25Qcm9wcy5leGFtcGxlLl9pZCkpXG4gICAgICB9LFxuICAgICAgZGltRXhhbXBsZTogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChoaWdobGlnaHRFeGFtcGxlKG51bGwpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlc0Jhckl0ZW0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVzQmFySXRlbVwiOlwiRXhhbXBsZXNCYXJJdGVtX19FeGFtcGxlc0Jhckl0ZW1fX19LMEdFY1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXJJdGVtL0V4YW1wbGVzQmFySXRlbS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBjb25zdCBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCA9ICdUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCdcbmV4cG9ydCBjb25zdCBISUdITElHSFRfRVhBTVBMRSA9ICdISUdITElHSFRfRVhBTVBMRSdcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodEV4YW1wbGUgPSAoaWQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBISUdITElHSFRfRVhBTVBMRSxcbiAgICBpZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGb2N1c0V4YW1wbGVHcm91cCA9IChxdWVyeSwgcGFnZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQLFxuICAgIHF1ZXJ5LFxuICAgIHBhZ2VcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3VpQWN0aW9ucy5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYmFzZWxpbmUgPSAwLjc1MFxuXG5jb25zdCBCbG9jayA9ICh7XG4gIG4gPSAxLFxuICBleHRyYUNsYXNzTmFtZXMgPSAnJyxcbiAgY2hpbGRyZW5cbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbWFyZ2luQm90dG9tOiBgJHtiYXNlbGluZSAqIG59cmVtYFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtleHRyYUNsYXNzTmFtZXN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IGJhc2VsaW5lID0gMC43NTBcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9MaXN0LmNzcydcblxuY29uc3QgTGlzdEl0ZW0gPSAoe1xuICBuID0gMSxcbiAgaXRlbVxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxsaSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17c3R5bGVzLmxpc3RfX2l0ZW19PlxuICAgICAge2l0ZW19XG4gICAgPC9saT5cbiAgKVxufVxuXG5jb25zdCBMaXN0ID0gKHtcbiAgaXRlbXMsXG4gIG4gPSAxLFxuICBhbGlnbkl0ZW1zID0gJ2ZsZXgtc3RhcnQnLFxuICBqdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0J1xufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAtJHtiYXNlbGluZSAqIG59cmVtYCxcbiAgICBhbGlnbkl0ZW1zLFxuICAgIGp1c3RpZnlDb250ZW50XG4gIH1cblxuICBjb25zdCBsaXN0SXRlbXMgPSBpdGVtcy5tYXAoKGksIGluZGV4KSA9PlxuICAgIDxMaXN0SXRlbSBrZXk9e2luZGV4fSBpdGVtPXtpfSBuPXtufSAvPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8dWwgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5saXN0fT5cbiAgICAgIHtsaXN0SXRlbXN9XG4gICAgPC91bD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9MaXN0L0xpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wibGlzdFwiOlwiTGlzdF9fbGlzdF9fXzJIby16XCIsXCJsaXN0X19pdGVtXCI6XCJMaXN0X19saXN0X19pdGVtX19fS3ZkcjZcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9sYXlvdXRzL0xpc3QvTGlzdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcblxuY29uc3QgQ29sbGVjdGlvblZpZXcgPSAoe1xuICBleGFtcGxlc1xufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxFeGFtcGxlTGlzdFxuICAgICAgbkNvbHM9ezV9XG4gICAgICBleGFtcGxlcz17ZXhhbXBsZXN9IC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogWy4uLnN0YXRlLmRhdGEuZXhhbXBsZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGIuY3JlYXRlZEF0ID4gYS5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgfSBlbHNlIGlmIChhLmNyZWF0ZWRBdCA+PSBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4pKENvbGxlY3Rpb25WaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZUxpc3QuY3NzJ1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi4vRXhhbXBsZSdcblxuY2xhc3MgRXhhbXBsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtleGFtcGxlcywgbkNvbHN9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQ29sczsgaSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBleGFtcGxlcy5maWx0ZXIoKGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRleCAlIG5Db2xzID09PSBpXG4gICAgICB9KVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKVxuICAgIH1cblxuICAgIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlTGlzdF1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgICB7Y29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fY29sdW1ufT5cbiAgICAgICAgICAgIHtjb2x1bW4ubWFwKChleGFtcGxlLCBqKSA9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19leGFtcGxlfT5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgY29tcGFjdD17bkNvbHMgPiA1fVxuICAgICAgICAgICAgICAgICAgZXhhbXBsZT17ZXhhbXBsZX0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfTwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlTGlzdFwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19fNzRKYzNcIixcIkV4YW1wbGVMaXN0X19jb2x1bW5cIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fY29sdW1uX19fM0Z6a1dcIixcIkV4YW1wbGVMaXN0X19leGFtcGxlXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2V4YW1wbGVfX18zZWpMX1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZS5jc3MnXG5cbmNvbnN0IEV4YW1wbGUgPSAoe1xuICBleGFtcGxlLFxuICBmb2N1c2VkR3JvdXBQYWdlLFxuICBmb2N1c2VkR3JvdXBRdWVyeSxcbiAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWRcbn0pID0+IHtcbiAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGUsIGV4YW1wbGUucXVlcnkucmVwbGFjZSgvXFxzL2csICdfJykucmVwbGFjZSgvXCIvZywgJycpLCBgcGFnZSR7ZXhhbXBsZS5yZWxldmFuY2V9YF1cbiAgaWYgKGZvY3VzZWRHcm91cFBhZ2UpIHtcbiAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkgJiYgZm9jdXNlZEdyb3VwUXVlcnkgIT09IGV4YW1wbGUucXVlcnkpIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9kaW1tZWQpXG4gICAgfSBlbHNlIGlmIChmb2N1c2VkR3JvdXBQYWdlICE9PSBleGFtcGxlLnJlbGV2YW5jZSkge1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlX2RpbW1lZClcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlX2ZvY3VzZWQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGhpZ2hsaWdodGVkRXhhbXBsZUlkID09PSBleGFtcGxlLl9pZCkge1xuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9oaWdobGlnaHRlZClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgaWQ9e2V4YW1wbGUuX2lkfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICA8YVxuICAgICAgICBocmVmPXtgaHR0cHM6Ly9waW50ZXJlc3QuY29tL3Bpbi8ke2V4YW1wbGUuZXhhbXBsZS5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZVdyYXBwZXJ9XG4gICAgICAgIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9faW1hZ2V9XG4gICAgICAgICAgc3JjPXtleGFtcGxlLmV4YW1wbGUuc3JjfSAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9fZGVzY3JpcHRpb25PdmVybGF5fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2Rlc2NyaXB0aW9ufT5cbiAgICAgICAgICAgIHtleGFtcGxlLmltYWdlRGVzY3JpcHRpb259XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZEdyb3VwUGFnZTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUGFnZSxcbiAgICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBRdWVyeSxcbiAgICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBzdGF0ZS51aS5oaWdobGlnaHRlZEV4YW1wbGVJZFxuICAgIH1cbiAgfVxuKShFeGFtcGxlKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX18yN1MwaVwiLFwiRXhhbXBsZV9faW1hZ2VXcmFwcGVyXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZVdyYXBwZXJfX18xTC16NVwiLFwiRXhhbXBsZV9fZGVzY3JpcHRpb25PdmVybGF5XCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbk92ZXJsYXlfX18yVXpDM1wiLFwiRXhhbXBsZV9faW1hZ2VcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlX19fM1lkNjFcIixcIkV4YW1wbGVfX2Rlc2NyaXB0aW9uXCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbl9fXzFSV2hyXCIsXCJFeGFtcGxlX2RpbW1lZFwiOlwiRXhhbXBsZV9fRXhhbXBsZV9kaW1tZWRfX18yc1RmWVwiLFwiRXhhbXBsZV9mb2N1c2VkXCI6XCJFeGFtcGxlX19FeGFtcGxlX2ZvY3VzZWRfX18zNnJ4MFwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1N1bW1hcnkuY3NzJ1xuaW1wb3J0IE1lZGlhIGZyb20gJy4uLy4uL2xheW91dHMvTWVkaWEnXG5pbXBvcnQgRmxleCBmcm9tICcuLi8uLi9sYXlvdXRzL0ZsZXgnXG5pbXBvcnQgRXhhbXBsZXNCYXIgZnJvbSAnLi4vRXhhbXBsZXNCYXInXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vbGF5b3V0cy9CbG9jaydcblxuY29uc3QgU3VtbWFyeSA9ICh7XG4gIHF1ZXJpZXNDb3VudCxcbiAgZXhhbXBsZXNcbn0pID0+IHtcbiAgY29uc3QgcmVsYXRlZEltYWdlcyA9IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAtMSlcbiAgY29uc3QgcmVsYXRlZEltYWdlc1BlckNvbHVtbiA9IDdcbiAgbGV0IHJlbGF0ZWRDb2xzQ291bnQgPSBNYXRoLmNlaWwocmVsYXRlZEltYWdlcy5sZW5ndGggLyByZWxhdGVkSW1hZ2VzUGVyQ29sdW1uKVxuICBsZXQgcmVsYXRlZEltYWdlc0NvbHVtbnMgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbGF0ZWRDb2xzQ291bnQ7IGkrKykge1xuICAgIHJlbGF0ZWRJbWFnZXNDb2x1bW5zW2ldID0gcmVsYXRlZEltYWdlcy5zbGljZShpICogcmVsYXRlZEltYWdlc1BlckNvbHVtbiwgKGkgKyAxKSAqIHJlbGF0ZWRJbWFnZXNQZXJDb2x1bW4pXG4gIH1cblxuICBsZXQgc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJzEwKycsXG4gICAgICBwYWdlOiAxMCxcbiAgICAgIGV4YW1wbGVzOiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gMTApXG4gICAgfVxuICBdXG4gIGZvciAobGV0IGkgPSA5OyBpID4gMDsgaS0tKSB7XG4gICAgc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IGAke2l9YCxcbiAgICAgICAgcGFnZTogaSxcbiAgICAgICAgZXhhbXBsZXM6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSBpKVxuICAgICAgfSxcbiAgICAgIC4uLnNlYXJjaFJlc3VsdHNDaGFydERhdGFcbiAgICBdXG4gIH1cblxuICBjb25zdCBzZWFyY2hSZXN1bHRzQ2hhcnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnRfX3RpdGxlfT5TZWFyY2ggUmVzdWx0IFBhZ2VzPC9kaXY+XG5cbiAgICAgIDxCbG9jayBuPXswLjV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNDaGFydF9fY2FudmFzfT5cbiAgICAgICAgICB7c2VhcmNoUmVzdWx0c0NoYXJ0RGF0YS5tYXAoKHMsIGluZGV4KSA9PlxuICAgICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIHF1ZXJ5PXtudWxsfVxuICAgICAgICAgICAgICBwYWdlPXtzLnBhZ2V9XG4gICAgICAgICAgICAgIGxhYmVsPXtzLmxhYmVsfVxuICAgICAgICAgICAgICBleGFtcGxlcz17ZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IHMucGFnZSl9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIDwvZGl2PlxuICApXG5cbiAgY29uc3QgcmVsYXRlZEltYWdlc0NoYXJ0ID0gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0NoYXJ0fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0NoYXJ0X190aXRsZX0+UmVsYXRlZCBJbWFnZXM8L2Rpdj5cblxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0NoYXJ0X19jYW52YXN9PlxuICAgICAgICAgIHtyZWxhdGVkSW1hZ2VzQ29sdW1ucy5tYXAoKGMsIGluZGV4KSA9PlxuICAgICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIHF1ZXJ5PXtudWxsfVxuICAgICAgICAgICAgICBwYWdlPXstMX1cbiAgICAgICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICAgICAgZXhhbXBsZXM9e2N9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIDwvZGl2PlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlN1bW1hcnl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5TdW1tYXJ5X19oZWFkZXJ9PlxuICAgICAgICA8RmxleFxuICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zSGVhZGVyfT5cbiAgICAgICAgICAgIDxNZWRpYVxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgZmlndXJlPXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2NvdW50ZXJ9PntxdWVyaWVzQ291bnR9PC9kaXY+fVxuICAgICAgICAgICAgICBib2R5PXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2JvZHl9PnNlYXJjaCBxdWVyaWVzPC9kaXY+fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0hlYWRlcn0+XG4gICAgICAgICAgICA8TWVkaWFcbiAgICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgICAgIGZpZ3VyZT17PGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zSGVhZGVyX19jb3VudGVyfT57ZXhhbXBsZXMubGVuZ3RofTwvZGl2Pn1cbiAgICAgICAgICAgICAgYm9keT17PGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zSGVhZGVyX19ib2R5fT5leGFtcGxlcyBjb2xsZWN0ZWQ8L2Rpdj59IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRmxleD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlN1bW1hcnlfX2JvZHl9PlxuICAgICAgICA8TWVkaWFcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwic3RyZXRjaFwiXG4gICAgICAgICAgZmlndXJlPXtzZWFyY2hSZXN1bHRzQ2hhcnR9XG4gICAgICAgICAgYm9keT17cmVsYXRlZEltYWdlc0NoYXJ0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyaWVzQ291bnQ6IHN0YXRlLmRhdGEucXVlcmllcy5sZW5ndGgsXG4gICAgICBleGFtcGxlczogc3RhdGUuZGF0YS5leGFtcGxlc1xuICAgIH1cbiAgfVxuKShTdW1tYXJ5KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvU3VtbWFyeS9TdW1tYXJ5LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlN1bW1hcnlcIjpcIlN1bW1hcnlfX1N1bW1hcnlfX18ydmJRWVwiLFwiU3VtbWFyeV9faGVhZGVyXCI6XCJTdW1tYXJ5X19TdW1tYXJ5X19oZWFkZXJfX18xV3Z2TVwiLFwiU3VtbWFyeV9fYm9keVwiOlwiU3VtbWFyeV9fU3VtbWFyeV9fYm9keV9fXzNGMy1iXCIsXCJzSGVhZGVyXCI6XCJTdW1tYXJ5X19zSGVhZGVyX19fMy1Mb1dcIixcInNIZWFkZXJfX2NvdW50ZXJcIjpcIlN1bW1hcnlfX3NIZWFkZXJfX2NvdW50ZXJfX18zWmdxblwiLFwic0hlYWRlcl9fYm9keVwiOlwiU3VtbWFyeV9fc0hlYWRlcl9fYm9keV9fXzM2RUVCXCIsXCJzQ2hhcnRcIjpcIlN1bW1hcnlfX3NDaGFydF9fXzNJcFdDXCIsXCJzQ2hhcnRfX3RpdGxlXCI6XCJTdW1tYXJ5X19zQ2hhcnRfX3RpdGxlX19fMkhWNklcIixcInNDaGFydF9fY2FudmFzXCI6XCJTdW1tYXJ5X19zQ2hhcnRfX2NhbnZhc19fXzF3OW5ZXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9TdW1tYXJ5L1N1bW1hcnkuY3NzXG4gKiogbW9kdWxlIGlkID0gNTE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9UaXRsZS5jc3MnXG5cbmNvbnN0IFRpdGxlID0gKHtcbiAgdGl0bGVcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpdGxlfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGl0bGVfX3RleHR9Pnt0aXRsZX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiVGl0bGVcIjpcIlRpdGxlX19UaXRsZV9fXzE3QnVLXCIsXCJUaXRsZV9fdGV4dFwiOlwiVGl0bGVfX1RpdGxlX190ZXh0X19fMVRzSGpcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnXG5cbmNvbnN0IHNvY2tldCA9IGlvKCdodHRwczovL3Zkeml1YmFrLmNvbS8nLCB7cGF0aDogJy9kZXNpZ25GaXhhdGlvblNlcnZlcid9KVxuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXRcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zb2NrZXQuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgUkVDRUlWRV9EQVRBID0gJ1JFQ0VJVkVfREFUQSdcbmV4cG9ydCBjb25zdCBSRUNFSVZFX0VYQU1QTEUgPSAnUkVDRUlWRV9FWEFNUExFJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfUVVFUlkgPSAnUkVDRUlWRV9RVUVSWSdcbmV4cG9ydCBjb25zdCBJTkNfRVhBTVBMRV9DT1VOVEVSID0gJ0lOQ19FWEFNUExFX0NPVU5URVInXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlRXhhbXBsZSA9IChleGFtcGxlKSA9PiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXhhbXBsZSlcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBJTkNfRVhBTVBMRV9DT1VOVEVSLFxuICAgICAgcXVlcnk6IGV4YW1wbGUucXVlcnlcbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9FWEFNUExFLFxuICAgICAgZXhhbXBsZVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfUVVFUlksXG4gICAgICBxdWVyeTogT2JqZWN0LmFzc2lnbih7fSwgcXVlcnksIHtcbiAgICAgICAgZXhhbXBsZXNDb3VudDogMFxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNlaXZlRGF0YSA9IChxdWVyaWVzLCBleGFtcGxlcykgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGVuaGFuY2VkUXVlcmllcyA9IHF1ZXJpZXMubWFwKChxLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbih7fSwgcSwge1xuICAgICAgZXhhbXBsZXNDb3VudDogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5xdWVyeSA9PT0gcS5xdWVyeSkubGVuZ3RoXG4gICAgfSkpXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0RBVEEsXG4gICAgICBxdWVyaWVzOiBlbmhhbmNlZFF1ZXJpZXMsXG4gICAgICBleGFtcGxlc1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9kYXRhQWN0aW9ucy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX1NUVURZID0gJ1JFQ0VJVkVfU1RVRFknXG5leHBvcnQgY29uc3QgS0lMTF9TVFVEWSA9ICdLSUxMX1NUVURZJ1xuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVN0dWR5ID0gKFxuICBwYXJ0aWNpcGFudElkLFxuICBzZXNzaW9uSWQsXG4gIGNvbmRpdGlvbixcbiAgdGFza0FsaWFzXG4pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUNFSVZFX1NUVURZLFxuICAgIHBhcnRpY2lwYW50SWQsXG4gICAgc2Vzc2lvbklkLFxuICAgIGNvbmRpdGlvbixcbiAgICB0YXNrQWxpYXNcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qga2lsbFN0dWR5ID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEtJTExfU1RVRFlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qc1xuICoqLyIsImltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yb290UmVkdWNlcidcblxuY29uc3QgbWlkZGxld2FyZSA9IFt0aHVua01pZGRsZXdhcmVdXG5cbi8vIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuLy8gICBjb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoKVxuLy8gICBtaWRkbGV3YXJlLnB1c2gobG9nZ2VyKVxuLy8gfVxuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChpbml0aWFsU3RhdGUpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIGluaXRpYWxTdGF0ZSxcbiAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVTdG9yZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0b3JlLmpzXG4gKiovIiwiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhUmVkdWNlcidcbmltcG9ydCB1aSBmcm9tICcuL3VpUmVkdWNlcidcbmltcG9ydCBzdHVkeSBmcm9tICcuL3N0dWR5UmVkdWNlcidcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBkYXRhLFxuICB1aSxcbiAgc3R1ZHlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvcm9vdFJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1xuICBSRUNFSVZFX0RBVEEsXG4gIFJFQ0VJVkVfRVhBTVBMRSxcbiAgUkVDRUlWRV9RVUVSWSxcbiAgSU5DX0VYQU1QTEVfQ09VTlRFUlxufSBmcm9tICcuL2RhdGFBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3QgZGF0YSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUuZGF0YSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlWRV9EQVRBOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IGFjdGlvbi5xdWVyaWVzLFxuICAgICAgICBleGFtcGxlczogYWN0aW9uLmV4YW1wbGVzXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9FWEFNUExFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuZXhhbXBsZXMsXG4gICAgICAgICAgYWN0aW9uLmV4YW1wbGVcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIFJFQ0VJVkVfUVVFUlk6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogW1xuICAgICAgICAgIC4uLnN0YXRlLnF1ZXJpZXMsXG4gICAgICAgICAgYWN0aW9uLnF1ZXJ5XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgY2FzZSBJTkNfRVhBTVBMRV9DT1VOVEVSOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IHN0YXRlLnF1ZXJpZXMubWFwKHEgPT4ge1xuICAgICAgICAgIGlmIChxLnF1ZXJ5ID09PSBhY3Rpb24ucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICAgICAgICAgIGV4YW1wbGVzQ291bnQ6IHEuZXhhbXBsZXNDb3VudCArIDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0YVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFSZWR1Y2VyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiB7XG4gICAgcXVlcmllczogW10sXG4gICAgZXhhbXBsZXM6IFtdXG4gIH0sXG4gIHVpOiB7XG4gICAgZm9jdXNlZEdyb3VwUGFnZTogbnVsbCxcbiAgICBmb2N1c2VkR3JvdXBRdWVyeTogbnVsbCxcbiAgICBoaWdobGlnaHRlZEV4YW1wbGVJZDogbnVsbFxuICB9LFxuICBzdHVkeToge1xuICAgIHBhcnRpY2lwYW50SWQ6ICcnLFxuICAgIHNlc3Npb25JZDogbnVsbCxcbiAgICBjb25kaXRpb246ICdiYXNlbGluZScsXG4gICAgdGFza0FsaWFzOiAnJ1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvaW5pdGlhbFN0YXRlLmpzXG4gKiovIiwiaW1wb3J0IHtcbiAgVE9HR0xFX0ZPQ1VTX0VYQU1QTEVfR1JPVVAsXG4gIEhJR0hMSUdIVF9FWEFNUExFXG59IGZyb20gJy4vdWlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3QgdWkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnVpLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUDpcbiAgICAgIGlmIChhY3Rpb24ucGFnZSA9PT0gc3RhdGUuZm9jdXNlZEdyb3VwUGFnZSAmJiBhY3Rpb24ucXVlcnkgPT09IHN0YXRlLmZvY3VzZWRHcm91cFF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IG51bGwsXG4gICAgICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IG51bGxcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IGFjdGlvbi5wYWdlLFxuICAgICAgICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBhY3Rpb24ucXVlcnlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICBjYXNlIEhJR0hMSUdIVF9FWEFNUExFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBhY3Rpb24uaWRcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlSZWR1Y2VyLmpzXG4gKiovIiwiaW1wb3J0IHtSRUNFSVZFX1NUVURZLCBLSUxMX1NUVURZfSBmcm9tICcuL3N0dWR5QWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IHN0dWR5ID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5zdHVkeSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlWRV9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwYXJ0aWNpcGFudElkOiBhY3Rpb24ucGFydGljaXBhbnRJZCxcbiAgICAgICAgc2Vzc2lvbklkOiBhY3Rpb24uc2Vzc2lvbklkLFxuICAgICAgICBjb25kaXRpb246IGFjdGlvbi5jb25kaXRpb24sXG4gICAgICAgIHRhc2tBbGlhczogYWN0aW9uLnRhc2tBbGlhc1xuICAgICAgfSlcbiAgICBjYXNlIEtJTExfU1RVRFk6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2Vzc2lvbklkOiBudWxsXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHVkeVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zdHlsZXMvcmVzZXQuY3NzXG4gKiogbW9kdWxlIGlkID0gNTc5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBYkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBSEE7QUFVQTs7OztBQXJGQTtBQUNBO0FBdUZBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7Ozs7Ozs7QUM1SEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBTUE7Ozs7QUFiQTtBQUNBO0FBZUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7Ozs7Ozs7QUM1QkE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFYQTtBQWlCQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQWxCQTtBQUNBO0FBZUE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFEQTtBQURBO0FBSEE7QUFDQTtBQWlCQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQURBO0FBREE7QUFIQTtBQUNBO0FBaUJBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFEQTtBQURBO0FBWUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQWRBO0FBd0JBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTs7Ozs7OztBQzdHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7QUFGQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7OztBQ25EQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7Ozs7Ozs7QUNuQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7O0FBRkE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7OztBQzFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBR0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQUhBO0FBREE7QUFEQTtBQWlCQTs7OztBQWpDQTtBQUNBO0FBbUNBOzs7Ozs7O0FDekNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBUkE7QUFIQTtBQW1CQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7QUN2REE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFYQTtBQWlCQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQWxCQTtBQUNBO0FBZUE7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFEQTtBQURBO0FBSEE7QUFDQTtBQWlCQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQURBO0FBREE7QUFIQTtBQUNBO0FBaUJBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBVEE7QUFEQTtBQW1CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBcEJBO0FBNEJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7QUNsSEE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFLQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQWpDQTtBQW1DQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBVkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFHQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFsQkE7QUFvQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7Ozs7Ozs7O0FDdkJBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==