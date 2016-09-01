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

	var _store = __webpack_require__(564);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(572);

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

	var _CollectionView = __webpack_require__(508);

	var _CollectionView2 = _interopRequireDefault(_CollectionView);

	var _socket = __webpack_require__(513);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(562);

	var _studyActions = __webpack_require__(563);

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
	        if (element.scrollTop === to) {
	          return;
	        }
	        scrollTo(element, to, duration - 10);
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


	      if (focusedGroupPage !== this.props.focusedGroupPage && focusedGroupQuery !== this.props.focusedGroupQuery) {
	        if (focusedGroupQuery) {
	          var matchingElements = Array.prototype.slice.call(document.querySelectorAll('.' + focusedGroupQuery.replace(/\s/g, '_') + '-' + focusedGroupPage));
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
	          { className: _App2.default.App__sidebar },
	          _react2.default.createElement(_QueryList2.default, null)
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
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","App__sidebar":"App__App__sidebar___VThbe"};

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


	      return _react2.default.createElement(
	        'div',
	        { className: _QueryList2.default.QueryList },
	        queries.map(function (q, index) {
	          return _react2.default.createElement(
	            'div',
	            {
	              key: index,
	              className: _QueryList2.default.QueryList__item },
	            _react2.default.createElement(_Query2.default, {
	              query: q })
	          );
	        })
	      );
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
	module.exports = {"QueryList":"QueryList__QueryList___2HcgL","QueryList__item":"QueryList__QueryList__item___2ZKOd"};

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Query = function Query(_ref) {
	  var query = _ref.query;
	  var examples = _ref.examples;

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance >= 10;
	    })
	  }];

	  var _loop = function _loop(i) {
	    searchResultsChartData = [{
	      label: '' + i,
	      page: i,
	      examples: examples.filter(function (e) {
	        return e.relevance === i;
	      })
	    }].concat(_toConsumableArray(searchResultsChartData));
	  };

	  for (var i = 9; i > 0; i--) {
	    _loop(i);
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
	      'div',
	      { className: _Query2.default.qChart__canvas },
	      _react2.default.createElement(_ExamplesBar2.default, {
	        query: query.query,
	        page: -1,
	        theme: 'accent2',
	        examples: examples.filter(function (e) {
	          return e.relevance === -1;
	        }) })
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
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.Query__body },
	      _react2.default.createElement(_Media2.default, {
	        alignItems: 'stretch',
	        figure: searchResultsChart,
	        body: relatedImagesChart })
	    )
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
	  if (focusedGroupQuery) {
	    if (focusedGroupQuery !== query || focusedGroupPage !== page) {
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

	var _reactRedux = __webpack_require__(472);

	var _ExampleList = __webpack_require__(509);

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

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(510);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Example = __webpack_require__(511);

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

/***/ 510:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExampleList":"ExampleList__ExampleList___74Jc3","ExampleList__column":"ExampleList__ExampleList__column___3FzkW","ExampleList__example":"ExampleList__ExampleList__example___3ejL_"};

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

	var _Example = __webpack_require__(512);

	var _Example2 = _interopRequireDefault(_Example);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Example = function Example(_ref) {
	  var example = _ref.example;
	  var focusedGroupPage = _ref.focusedGroupPage;
	  var focusedGroupQuery = _ref.focusedGroupQuery;
	  var highlightedExampleId = _ref.highlightedExampleId;

	  var classNames = [_Example2.default.Example, example.query.replace(/\s/g, '_') + '-' + example.relevance];
	  if (focusedGroupQuery) {
	    if (focusedGroupQuery !== example.query || focusedGroupPage !== example.relevance) {
	      classNames.push(_Example2.default.Example_dimmed);
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
	      'div',
	      { className: _Example2.default.Example__imageWrapper },
	      _react2.default.createElement('img', {
	        className: _Example2.default.Example__image,
	        src: example.example.src })
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _Example2.default.Example__descriptionOverlay },
	      _react2.default.createElement(
	        'div',
	        { className: _Example2.default.Example__description },
	        example.imageDescription
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

/***/ 512:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Example":"Example__Example___27S0i","Example__imageWrapper":"Example__Example__imageWrapper___1L-z5","Example__image":"Example__Example__image___3Yd61","Example__descriptionOverlay":"Example__Example__descriptionOverlay___2UzC3","Example__description":"Example__Example__description___1RWhr","Example_dimmed":"Example__Example_dimmed___2sTfY","Example_highlighted":"Example__Example_highlighted___BKg2W"};

/***/ },

/***/ 513:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(514);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 562:
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

/***/ 563:
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

/***/ 564:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(565);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(566);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(567);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var middleware = [_reduxThunk2.default];

	if (true) {
	  var logger = (0, _reduxLogger2.default)();
	  middleware.push(logger);
	}

	var configureStore = function configureStore(initialState) {
	  return (0, _redux.createStore)(_rootReducer2.default, initialState, _redux.applyMiddleware.apply(undefined, middleware));
	};

	exports.default = configureStore;

/***/ },

/***/ 567:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(568);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(570);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(571);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 568:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(562);

	var _initialState = __webpack_require__(569);

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

/***/ 569:
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

/***/ 570:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(507);

	var _initialState = __webpack_require__(569);

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

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(563);

	var _initialState = __webpack_require__(569);

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

/***/ 572:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBRdWVyeUxpc3QgZnJvbSAnLi4vUXVlcnlMaXN0J1xuaW1wb3J0IENvbGxlY3Rpb25WaWV3IGZyb20gJy4uL0NvbGxlY3Rpb25WaWV3J1xuXG5pbXBvcnQgc29ja2V0IGZyb20gJy4uLy4uL3N0b3JlL3NvY2tldCdcbmltcG9ydCB7cmVjZWl2ZURhdGEsIHJlY2VpdmVFeGFtcGxlLCByZWNlaXZlUXVlcnl9IGZyb20gJy4uLy4uL3N0b3JlL2RhdGFBY3Rpb25zJ1xuaW1wb3J0IHtyZWNlaXZlU3R1ZHksIGtpbGxTdHVkeX0gZnJvbSAnLi4vLi4vc3RvcmUvc3R1ZHlBY3Rpb25zJ1xuXG5jb25zdCBzY3JvbGxUbyA9IChlbGVtZW50LCB0bywgZHVyYXRpb24pID0+IHtcbiAgaWYgKGR1cmF0aW9uID4gMCkge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0byAtIGVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgY29uc3QgcGVyVGljayA9IGRpZmZlcmVuY2UgLyBkdXJhdGlvbiAqIDEwXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gZWxlbWVudC5zY3JvbGxUb3AgKyBwZXJUaWNrXG4gICAgICBpZiAoZWxlbWVudC5zY3JvbGxUb3AgPT09IHRvKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2Nyb2xsVG8oZWxlbWVudCwgdG8sIGR1cmF0aW9uIC0gMTApXG4gICAgfSwgMTApXG4gIH1cbn1cblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBjb25zdCB7Zm9jdXNlZEdyb3VwUGFnZSwgZm9jdXNlZEdyb3VwUXVlcnl9ID0gbmV3UHJvcHNcblxuICAgIGlmIChmb2N1c2VkR3JvdXBQYWdlICE9PSB0aGlzLnByb3BzLmZvY3VzZWRHcm91cFBhZ2UgJiYgZm9jdXNlZEdyb3VwUXVlcnkgIT09IHRoaXMucHJvcHMuZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgIGlmIChmb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgICAgICBjb25zdCBtYXRjaGluZ0VsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Zm9jdXNlZEdyb3VwUXVlcnkucmVwbGFjZSgvXFxzL2csICdfJyl9LSR7Zm9jdXNlZEdyb3VwUGFnZX1gKSlcbiAgICAgICAgY29uc3QgdG9wTWF0Y2hpbmdFbGVtZW50ID0gbWF0Y2hpbmdFbGVtZW50cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGEub2Zmc2V0VG9wIC0gYi5vZmZzZXRUb3BcbiAgICAgICAgfSlbMF1cblxuICAgICAgICBzY3JvbGxUbyh0aGlzLl9tYWluLCB0b3BNYXRjaGluZ0VsZW1lbnQub2Zmc2V0VG9wLCAyMDApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICBjb25zdCB7ZGlzcGF0Y2h9ID0gdGhpcy5wcm9wc1xuXG4gICAgc29ja2V0LmVtaXQoJ2dldCBzdHVkeScpXG5cbiAgICBzb2NrZXQub24oJ3N0dWR5JywgKGRhdGEpID0+IHtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVTdHVkeShkYXRhLnBhcnRpY2lwYW50SWQsIGRhdGEuc2Vzc2lvbklkLCBkYXRhLmNvbmRpdGlvbiwgZGF0YS50YXNrQWxpYXMpKVxuICAgICAgc29ja2V0LmVtaXQoJ2dldCBkYXRhJywge3Nlc3Npb25JZDogZGF0YS50cmFpbmluZyA/ICd0ZXN0JyA6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGtpbGwgc3R1ZHknLCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChraWxsU3R1ZHkoKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjb25kaXRpb259ID0gdGhpcy5wcm9wc1xuXG4gICAgbGV0IHNpZGViYXJFbCA9ICcnXG4gICAgaWYgKGNvbmRpdGlvbiA9PT0gJ3N5c3RlbScpIHtcbiAgICAgIHNpZGViYXJFbCA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBfX3NpZGViYXJ9PlxuICAgICAgICAgIDxRdWVyeUxpc3QgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwfT5cbiAgICAgICAge3NpZGViYXJFbH1cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5fbWFpbiA9IGVsIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuQXBwX19tYWlufT5cbiAgICAgICAgICA8Q29sbGVjdGlvblZpZXcgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXNzaW9uSWQ6IHN0YXRlLnN0dWR5LnNlc3Npb25JZCxcbiAgICAgIGNvbmRpdGlvbjogc3RhdGUuc3R1ZHkuY29uZGl0aW9uLFxuICAgICAgZm9jdXNlZEdyb3VwUGFnZTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUGFnZSxcbiAgICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBRdWVyeVxuICAgIH1cbiAgfVxuKShBcHApXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkFwcFwiOlwiQXBwX19BcHBfX19sQkVYSVwiLFwiQXBwX19tYWluXCI6XCJBcHBfX0FwcF9fbWFpbl9fXzJWWmppXCIsXCJBcHBfX3NpZGViYXJcIjpcIkFwcF9fQXBwX19zaWRlYmFyX19fVlRoYmVcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuY3NzXG4gKiogbW9kdWxlIGlkID0gNDk1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnlMaXN0LmNzcydcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9RdWVyeSdcblxuY2xhc3MgUXVlcnlMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7cXVlcmllc30gPSB0aGlzLnByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeUxpc3R9PlxuICAgICAgICB7cXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeUxpc3RfX2l0ZW19PlxuICAgICAgICAgICAgPFF1ZXJ5XG4gICAgICAgICAgICAgIHF1ZXJ5PXtxfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcmllczogWy4uLnN0YXRlLmRhdGEucXVlcmllc10uc29ydCgoYSwgYikgPT4gYi5leGFtcGxlc0NvdW50IC0gYS5leGFtcGxlc0NvdW50KVxuICAgIH1cbiAgfVxuKShRdWVyeUxpc3QpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlF1ZXJ5TGlzdFwiOlwiUXVlcnlMaXN0X19RdWVyeUxpc3RfX18ySGNnTFwiLFwiUXVlcnlMaXN0X19pdGVtXCI6XCJRdWVyeUxpc3RfX1F1ZXJ5TGlzdF9faXRlbV9fXzJaS09kXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5LmNzcydcbmltcG9ydCBNZWRpYSBmcm9tICcuLi8uLi9sYXlvdXRzL01lZGlhJ1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vLi4vbGF5b3V0cy9GbGV4J1xuaW1wb3J0IEV4YW1wbGVzQmFyIGZyb20gJy4uL0V4YW1wbGVzQmFyJ1xuXG5jb25zdCBRdWVyeSA9ICh7XG4gIHF1ZXJ5LFxuICBleGFtcGxlc1xufSkgPT4ge1xuICBsZXQgc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJzEwKycsXG4gICAgICBwYWdlOiAxMCxcbiAgICAgIGV4YW1wbGVzOiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA+PSAxMClcbiAgICB9XG4gIF1cbiAgZm9yIChsZXQgaSA9IDk7IGkgPiAwOyBpLS0pIHtcbiAgICBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgICAge1xuICAgICAgICBsYWJlbDogYCR7aX1gLFxuICAgICAgICBwYWdlOiBpLFxuICAgICAgICBleGFtcGxlczogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IGkpXG4gICAgICB9LFxuICAgICAgLi4uc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFJlc3VsdHNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fdGl0bGV9PlNlYXJjaCBSZXN1bHQgUGFnZXM8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnRfX2NhbnZhc30+XG4gICAgICAgIHtzZWFyY2hSZXN1bHRzQ2hhcnREYXRhLm1hcCgocywgaW5kZXgpID0+XG4gICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgcXVlcnk9e3F1ZXJ5LnF1ZXJ5fVxuICAgICAgICAgICAgcGFnZT17cy5wYWdlfVxuICAgICAgICAgICAgbGFiZWw9e3MubGFiZWx9XG4gICAgICAgICAgICBleGFtcGxlcz17ZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IHMucGFnZSl9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxuXG4gIGNvbnN0IHJlbGF0ZWRJbWFnZXNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fdGl0bGV9PlJlbGF0ZWQgSW1hZ2VzPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0X19jYW52YXN9PlxuICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICBxdWVyeT17cXVlcnkucXVlcnl9XG4gICAgICAgICAgcGFnZT17LTF9XG4gICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICBleGFtcGxlcz17ZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IC0xKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlfX2hlYWRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUhlYWRlcn0+XG4gICAgICAgICAgPEZsZXhcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFIZWFkZXJfX3F1ZXJ5fT57cXVlcnkucXVlcnl9PC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUhlYWRlcl9fZXhhbXBsZXNDb3VudH0+e3F1ZXJ5LmV4YW1wbGVzQ291bnR9IGV4YW1wbGUocyk8L2Rpdj5cbiAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlfX2JvZHl9PlxuICAgICAgICA8TWVkaWFcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwic3RyZXRjaFwiXG4gICAgICAgICAgZmlndXJlPXtzZWFyY2hSZXN1bHRzQ2hhcnR9XG4gICAgICAgICAgYm9keT17cmVsYXRlZEltYWdlc0NoYXJ0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogc3RhdGUuZGF0YS5leGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBvd25Qcm9wcy5xdWVyeS5xdWVyeSlcbiAgICB9XG4gIH1cbikoUXVlcnkpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeVwiOlwiUXVlcnlfX1F1ZXJ5X19fMzJ5VlBcIixcIlF1ZXJ5X19oZWFkZXJcIjpcIlF1ZXJ5X19RdWVyeV9faGVhZGVyX19fX0NNUmdcIixcIlF1ZXJ5X19ib2R5XCI6XCJRdWVyeV9fUXVlcnlfX2JvZHlfX18zd2pMWFwiLFwicUhlYWRlclwiOlwiUXVlcnlfX3FIZWFkZXJfX18xdkg4SFwiLFwicUhlYWRlcl9fcXVlcnlcIjpcIlF1ZXJ5X19xSGVhZGVyX19xdWVyeV9fX0FuZVZoXCIsXCJxSGVhZGVyX19leGFtcGxlc0NvdW50XCI6XCJRdWVyeV9fcUhlYWRlcl9fZXhhbXBsZXNDb3VudF9fXzF4X1NYXCIsXCJxQ2hhcnRcIjpcIlF1ZXJ5X19xQ2hhcnRfX19Fak5WNlwiLFwicUNoYXJ0X190aXRsZVwiOlwiUXVlcnlfX3FDaGFydF9fdGl0bGVfX19oTl90b1wiLFwicUNoYXJ0X19jYW52YXNcIjpcIlF1ZXJ5X19xQ2hhcnRfX2NhbnZhc19fXzFrbklwXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYmFzZWxpbmUgPSAwLjc1MFxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL01lZGlhLmNzcydcblxuY29uc3QgTWVkaWFCb2R5ID0gKHtcbiAgY29udGVudFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWVkaWFfX2JvZHl9PlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuY29uc3QgTWVkaWFGaWd1cmUgPSAoe1xuICBuLFxuICBjb250ZW50LFxuICByZXZlcnNlID0gZmFsc2Vcbn0pID0+IHtcbiAgbGV0IHN0eWxlID0ge31cbiAgaWYgKHJldmVyc2UpIHtcbiAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5tYXJnaW5SaWdodCA9IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5tZWRpYV9fZmlndXJlfT5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApXG59XG5cbmNvbnN0IE1lZGlhID0gKHtcbiAgZmlndXJlLFxuICBib2R5LFxuICBuID0gMSxcbiAgcmV2ZXJzZSA9IGZhbHNlLFxuICBhbGlnbkl0ZW1zID0gJ2ZsZXgtc3RhcnQnXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGFsaWduSXRlbXNcbiAgfVxuXG4gIGNvbnN0IGZpZ3VyZUVsZW1lbnQgPSAoXG4gICAgPE1lZGlhRmlndXJlXG4gICAgICBjb250ZW50PXtmaWd1cmV9XG4gICAgICByZXZlcnNlPXtyZXZlcnNlfVxuICAgICAgbj17bn0gLz5cbiAgKVxuXG4gIGNvbnN0IGJvZHlFbGVtZW50ID0gKFxuICAgIDxNZWRpYUJvZHlcbiAgICAgIGNvbnRlbnQ9e2JvZHl9IC8+XG4gIClcblxuICBpZiAocmV2ZXJzZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubWVkaWF9PlxuICAgICAgICB7Ym9keUVsZW1lbnR9XG4gICAgICAgIHtmaWd1cmVFbGVtZW50fVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubWVkaWF9PlxuICAgICAgICB7ZmlndXJlRWxlbWVudH1cbiAgICAgICAge2JvZHlFbGVtZW50fVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJtZWRpYVwiOlwiTWVkaWFfX21lZGlhX19fOUVBaWhcIixcIm1lZGlhX19maWd1cmVcIjpcIk1lZGlhX19tZWRpYV9fZmlndXJlX19fMW1zYUdcIixcIm1lZGlhX19ib2R5XCI6XCJNZWRpYV9fbWVkaWFfX2JvZHlfX18xVlpmTVwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzXG4gKiogbW9kdWxlIGlkID0gNTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEZsZXggPSAoe1xuICBmbGV4RGlyZWN0aW9uID0gJ3JvdycsXG4gIGp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnLFxuICBhbGlnbkl0ZW1zID0gJ2NlbnRlcicsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGZsZXhEaXJlY3Rpb24sXG4gICAgYWxpZ25JdGVtcyxcbiAgICBqdXN0aWZ5Q29udGVudCxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJ1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxleFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvRmxleC9GbGV4LmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlc0Jhci5jc3MnXG5pbXBvcnQgRXhhbXBsZXNCYXJJdGVtIGZyb20gJy4uL0V4YW1wbGVzQmFySXRlbSdcbmltcG9ydCB7dG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXB9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgRXhhbXBsZXNCYXIgPSAoe1xuICBleGFtcGxlcyxcbiAgcXVlcnksXG4gIHBhZ2UsXG4gIGxhYmVsID0gJycsXG4gIGZvY3VzZWRHcm91cFBhZ2UsXG4gIGZvY3VzZWRHcm91cFF1ZXJ5LFxuICB0b2dnbGVGb2N1c0V4YW1wbGVHcm91cFxufSkgPT4ge1xuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZXNCYXJdXG4gIGlmIChmb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgIGlmIChmb2N1c2VkR3JvdXBRdWVyeSAhPT0gcXVlcnkgfHwgZm9jdXNlZEdyb3VwUGFnZSAhPT0gcGFnZSkge1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlc0Jhcl9kaW1tZWQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbkNsaWNrPXt0b2dnbGVGb2N1c0V4YW1wbGVHcm91cH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAge2V4YW1wbGVzLm1hcCgoZSwgaW5kZXgpID0+XG4gICAgICAgIDxFeGFtcGxlc0Jhckl0ZW1cbiAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgIGV4YW1wbGU9e2V9IC8+XG4gICAgICApfVxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVzQmFyX19sYWJlbH0+e2xhYmVsfTwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZEdyb3VwUGFnZTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUGFnZSxcbiAgICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBRdWVyeVxuICAgIH1cbiAgfSxcbiAgKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0b2dnbGVGb2N1c0V4YW1wbGVHcm91cDogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaCh0b2dnbGVGb2N1c0V4YW1wbGVHcm91cChvd25Qcm9wcy5xdWVyeSwgb3duUHJvcHMucGFnZSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKEV4YW1wbGVzQmFyKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZXNCYXJcIjpcIkV4YW1wbGVzQmFyX19FeGFtcGxlc0Jhcl9fXzJCYTgtXCIsXCJFeGFtcGxlc0Jhcl9fbGFiZWxcIjpcIkV4YW1wbGVzQmFyX19FeGFtcGxlc0Jhcl9fbGFiZWxfX18xNENsMVwiLFwiRXhhbXBsZXNCYXJfZGltbWVkXCI6XCJFeGFtcGxlc0Jhcl9fRXhhbXBsZXNCYXJfZGltbWVkX19fMW5GRUJcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGVzQmFyL0V4YW1wbGVzQmFyLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGVzQmFySXRlbS5jc3MnXG5pbXBvcnQge2hpZ2hsaWdodEV4YW1wbGV9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgRXhhbXBsZXNCYXJJdGVtID0gKHtcbiAgZXhhbXBsZSxcbiAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQsXG4gIGhpZ2hsaWdodEV4YW1wbGUsXG4gIGRpbUV4YW1wbGVcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbk1vdXNlRW50ZXI9e2hpZ2hsaWdodEV4YW1wbGV9XG4gICAgICBvbk1vdXNlTGVhdmU9e2RpbUV4YW1wbGV9XG4gICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5FeGFtcGxlc0Jhckl0ZW19ICR7aGlnaGxpZ2h0ZWRFeGFtcGxlSWQgPT09IGV4YW1wbGUuX2lkID8gc3R5bGVzLkV4YW1wbGVzQmFySXRlbV9oaWdobGlnaHRlZCA6ICcnfWB9IC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBoaWdobGlnaHRlZEV4YW1wbGVJZDogc3RhdGUudWkuaGlnaGxpZ2h0ZWRFeGFtcGxlSWRcbiAgICB9XG4gIH0sXG4gIChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlnaGxpZ2h0RXhhbXBsZTogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChoaWdobGlnaHRFeGFtcGxlKG93blByb3BzLmV4YW1wbGUuX2lkKSlcbiAgICAgIH0sXG4gICAgICBkaW1FeGFtcGxlOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGhpZ2hsaWdodEV4YW1wbGUobnVsbCkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKEV4YW1wbGVzQmFySXRlbSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGVzQmFySXRlbS9FeGFtcGxlc0Jhckl0ZW0uanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZXNCYXJJdGVtXCI6XCJFeGFtcGxlc0Jhckl0ZW1fX0V4YW1wbGVzQmFySXRlbV9fX0swR0VjXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGNvbnN0IFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQID0gJ1RPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQJ1xuZXhwb3J0IGNvbnN0IEhJR0hMSUdIVF9FWEFNUExFID0gJ0hJR0hMSUdIVF9FWEFNUExFJ1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0RXhhbXBsZSA9IChpZCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEhJR0hMSUdIVF9FWEFNUExFLFxuICAgIGlkXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwID0gKHF1ZXJ5LCBwYWdlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVE9HR0xFX0ZPQ1VTX0VYQU1QTEVfR1JPVVAsXG4gICAgcXVlcnksXG4gICAgcGFnZVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuXG5jb25zdCBDb2xsZWN0aW9uVmlldyA9ICh7XG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEV4YW1wbGVMaXN0XG4gICAgICBuQ29scz17NX1cbiAgICAgIGV4YW1wbGVzPXtleGFtcGxlc30gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGV4YW1wbGVzOiBbLi4uc3RhdGUuZGF0YS5leGFtcGxlc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYi5jcmVhdGVkQXQgPiBhLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9IGVsc2UgaWYgKGEuY3JlYXRlZEF0ID49IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbikoQ29sbGVjdGlvblZpZXcpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlTGlzdC5jc3MnXG5pbXBvcnQgRXhhbXBsZSBmcm9tICcuLi9FeGFtcGxlJ1xuXG5jbGFzcyBFeGFtcGxlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2V4YW1wbGVzLCBuQ29sc30gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgY29sdW1ucyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5Db2xzOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGV4YW1wbGVzLmZpbHRlcigoZSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGluZGV4ICUgbkNvbHMgPT09IGlcbiAgICAgIH0pXG5cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pXG4gICAgfVxuXG4gICAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGVMaXN0XVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgIHtjb2x1bW5zLm1hcCgoY29sdW1uLCBpKSA9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19jb2x1bW59PlxuICAgICAgICAgICAge2NvbHVtbi5tYXAoKGV4YW1wbGUsIGopID0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZUxpc3RfX2V4YW1wbGV9PlxuICAgICAgICAgICAgICAgIDxFeGFtcGxlXG4gICAgICAgICAgICAgICAgICBjb21wYWN0PXtuQ29scyA+IDV9XG4gICAgICAgICAgICAgICAgICBleGFtcGxlPXtleGFtcGxlfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9PC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhhbXBsZUxpc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVMaXN0XCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX183NEpjM1wiLFwiRXhhbXBsZUxpc3RfX2NvbHVtblwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19jb2x1bW5fX18zRnprV1wiLFwiRXhhbXBsZUxpc3RfX2V4YW1wbGVcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fZXhhbXBsZV9fXzNlakxfXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlLmNzcydcblxuY29uc3QgRXhhbXBsZSA9ICh7XG4gIGV4YW1wbGUsXG4gIGZvY3VzZWRHcm91cFBhZ2UsXG4gIGZvY3VzZWRHcm91cFF1ZXJ5LFxuICBoaWdobGlnaHRlZEV4YW1wbGVJZFxufSkgPT4ge1xuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZSwgYCR7ZXhhbXBsZS5xdWVyeS5yZXBsYWNlKC9cXHMvZywgJ18nKX0tJHtleGFtcGxlLnJlbGV2YW5jZX1gXVxuICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkgIT09IGV4YW1wbGUucXVlcnkgfHwgZm9jdXNlZEdyb3VwUGFnZSAhPT0gZXhhbXBsZS5yZWxldmFuY2UpIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9kaW1tZWQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGhpZ2hsaWdodGVkRXhhbXBsZUlkID09PSBleGFtcGxlLl9pZCkge1xuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9oaWdobGlnaHRlZClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgaWQ9e2V4YW1wbGUuX2lkfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2ltYWdlV3JhcHBlcn0+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZX1cbiAgICAgICAgICBzcmM9e2V4YW1wbGUuZXhhbXBsZS5zcmN9IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19kZXNjcmlwdGlvbk92ZXJsYXl9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2Rlc2NyaXB0aW9ufT5cbiAgICAgICAgICB7ZXhhbXBsZS5pbWFnZURlc2NyaXB0aW9ufVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZEdyb3VwUGFnZTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUGFnZSxcbiAgICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBRdWVyeSxcbiAgICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBzdGF0ZS51aS5oaWdobGlnaHRlZEV4YW1wbGVJZFxuICAgIH1cbiAgfVxuKShFeGFtcGxlKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX18yN1MwaVwiLFwiRXhhbXBsZV9faW1hZ2VXcmFwcGVyXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZVdyYXBwZXJfX18xTC16NVwiLFwiRXhhbXBsZV9faW1hZ2VcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlX19fM1lkNjFcIixcIkV4YW1wbGVfX2Rlc2NyaXB0aW9uT3ZlcmxheVwiOlwiRXhhbXBsZV9fRXhhbXBsZV9fZGVzY3JpcHRpb25PdmVybGF5X19fMlV6QzNcIixcIkV4YW1wbGVfX2Rlc2NyaXB0aW9uXCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbl9fXzFSV2hyXCIsXCJFeGFtcGxlX2RpbW1lZFwiOlwiRXhhbXBsZV9fRXhhbXBsZV9kaW1tZWRfX18yc1RmWVwiLFwiRXhhbXBsZV9oaWdobGlnaHRlZFwiOlwiRXhhbXBsZV9fRXhhbXBsZV9oaWdobGlnaHRlZF9fX0JLZzJXXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCdcblxuY29uc3Qgc29ja2V0ID0gaW8oJ2h0dHBzOi8vdmR6aXViYWsuY29tLycsIHtwYXRoOiAnL2Rlc2lnbkZpeGF0aW9uU2VydmVyJ30pXG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3NvY2tldC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX0RBVEEgPSAnUkVDRUlWRV9EQVRBJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfRVhBTVBMRSA9ICdSRUNFSVZFX0VYQU1QTEUnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWSA9ICdSRUNFSVZFX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IElOQ19FWEFNUExFX0NPVU5URVIgPSAnSU5DX0VYQU1QTEVfQ09VTlRFUidcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVFeGFtcGxlID0gKGV4YW1wbGUpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhleGFtcGxlKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IElOQ19FWEFNUExFX0NPVU5URVIsXG4gICAgICBxdWVyeTogZXhhbXBsZS5xdWVyeVxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0VYQU1QTEUsXG4gICAgICBleGFtcGxlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVF1ZXJ5ID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWSxcbiAgICAgIHF1ZXJ5OiBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwge1xuICAgICAgICBleGFtcGxlc0NvdW50OiAwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVEYXRhID0gKHF1ZXJpZXMsIGV4YW1wbGVzKSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgZW5oYW5jZWRRdWVyaWVzID0gcXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICBleGFtcGxlc0NvdW50OiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBxLnF1ZXJ5KS5sZW5ndGhcbiAgICB9KSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfREFUQSxcbiAgICAgIHF1ZXJpZXM6IGVuaGFuY2VkUXVlcmllcyxcbiAgICAgIGV4YW1wbGVzXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFBY3Rpb25zLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IFJFQ0VJVkVfU1RVRFkgPSAnUkVDRUlWRV9TVFVEWSdcbmV4cG9ydCBjb25zdCBLSUxMX1NUVURZID0gJ0tJTExfU1RVRFknXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlU3R1ZHkgPSAoXG4gIHBhcnRpY2lwYW50SWQsXG4gIHNlc3Npb25JZCxcbiAgY29uZGl0aW9uLFxuICB0YXNrQWxpYXNcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFJFQ0VJVkVfU1RVRFksXG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBzZXNzaW9uSWQsXG4gICAgY29uZGl0aW9uLFxuICAgIHRhc2tBbGlhc1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBraWxsU3R1ZHkgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogS0lMTF9TVFVEWVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCdcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuL3Jvb3RSZWR1Y2VyJ1xuXG5jb25zdCBtaWRkbGV3YXJlID0gW3RodW5rTWlkZGxld2FyZV1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcigpXG4gIG1pZGRsZXdhcmUucHVzaChsb2dnZXIpXG59XG5cbmNvbnN0IGNvbmZpZ3VyZVN0b3JlID0gKGluaXRpYWxTdGF0ZSkgPT4ge1xuICByZXR1cm4gY3JlYXRlU3RvcmUoXG4gICAgcm9vdFJlZHVjZXIsXG4gICAgaW5pdGlhbFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3RvcmUuanNcbiAqKi8iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGFSZWR1Y2VyJ1xuaW1wb3J0IHVpIGZyb20gJy4vdWlSZWR1Y2VyJ1xuaW1wb3J0IHN0dWR5IGZyb20gJy4vc3R1ZHlSZWR1Y2VyJ1xuXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGRhdGEsXG4gIHVpLFxuICBzdHVkeVxufSlcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9yb290UmVkdWNlci5qc1xuICoqLyIsImltcG9ydCB7XG4gIFJFQ0VJVkVfREFUQSxcbiAgUkVDRUlWRV9FWEFNUExFLFxuICBSRUNFSVZFX1FVRVJZLFxuICBJTkNfRVhBTVBMRV9DT1VOVEVSXG59IGZyb20gJy4vZGF0YUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCBkYXRhID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5kYXRhLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX0RBVEE6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogYWN0aW9uLnF1ZXJpZXMsXG4gICAgICAgIGV4YW1wbGVzOiBhY3Rpb24uZXhhbXBsZXNcbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5leGFtcGxlcyxcbiAgICAgICAgICBhY3Rpb24uZXhhbXBsZVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUucXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIElOQ19FWEFNUExFX0NPVU5URVI6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgZXhhbXBsZXNDb3VudDogcS5leGFtcGxlc0NvdW50ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvZGF0YVJlZHVjZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IHtcbiAgICBxdWVyaWVzOiBbXSxcbiAgICBleGFtcGxlczogW11cbiAgfSxcbiAgdWk6IHtcbiAgICBmb2N1c2VkR3JvdXBQYWdlOiBudWxsLFxuICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBudWxsLFxuICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBudWxsXG4gIH0sXG4gIHN0dWR5OiB7XG4gICAgcGFydGljaXBhbnRJZDogJycsXG4gICAgc2Vzc2lvbklkOiBudWxsLFxuICAgIGNvbmRpdGlvbjogJ2Jhc2VsaW5lJyxcbiAgICB0YXNrQWxpYXM6ICcnXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9pbml0aWFsU3RhdGUuanNcbiAqKi8iLCJpbXBvcnQge1xuICBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCxcbiAgSElHSExJR0hUX0VYQU1QTEVcbn0gZnJvbSAnLi91aUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCB1aSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUudWksXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQOlxuICAgICAgaWYgKGFjdGlvbi5wYWdlID09PSBzdGF0ZS5mb2N1c2VkR3JvdXBQYWdlICYmIGFjdGlvbi5xdWVyeSA9PT0gc3RhdGUuZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogbnVsbCxcbiAgICAgICAgICBmb2N1c2VkR3JvdXBRdWVyeTogbnVsbFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogYWN0aW9uLnBhZ2UsXG4gICAgICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IGFjdGlvbi5xdWVyeVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIGNhc2UgSElHSExJR0hUX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IGFjdGlvbi5pZFxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aVJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfU1RVRFksIEtJTExfU1RVRFl9IGZyb20gJy4vc3R1ZHlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3Qgc3R1ZHkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnN0dWR5LFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX1NUVURZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IGFjdGlvbi5wYXJ0aWNpcGFudElkLFxuICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5zZXNzaW9uSWQsXG4gICAgICAgIGNvbmRpdGlvbjogYWN0aW9uLmNvbmRpdGlvbixcbiAgICAgICAgdGFza0FsaWFzOiBhY3Rpb24udGFza0FsaWFzXG4gICAgICB9KVxuICAgIGNhc2UgS0lMTF9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWR5XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlSZWR1Y2VyLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0eWxlcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1NzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQVdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBSEE7QUFVQTs7OztBQWxFQTtBQUNBO0FBb0VBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7Ozs7Ozs7QUN2R0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBREE7QUFXQTs7OztBQWhCQTtBQUNBO0FBa0JBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDOUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUhBO0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFWQTtBQUNBO0FBT0E7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFEQTtBQUhBO0FBQ0E7QUFlQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQUhBO0FBQ0E7QUFZQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUxBO0FBREE7QUFEQTtBQVlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFiQTtBQXFCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7Ozs7Ozs7QUMxRkE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7O0FBRkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQVlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7QUNuREE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBOzs7Ozs7O0FDbkNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBR0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQUhBO0FBREE7QUFEQTtBQWlCQTs7OztBQWpDQTtBQUNBO0FBbUNBOzs7Ozs7O0FDekNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBVEE7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDaERBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7Ozs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUtBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBakNBO0FBbUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFWQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUdBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQWxCQTtBQW9CQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQWJBO0FBZUE7QUFDQTs7Ozs7Ozs7QUN2QkE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9