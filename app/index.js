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

	var _store = __webpack_require__(566);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(574);

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

	var _Summary = __webpack_require__(611);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Title = __webpack_require__(513);

	var _Title2 = _interopRequireDefault(_Title);

	var _socket = __webpack_require__(515);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(564);

	var _studyActions = __webpack_require__(565);

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


	      if (focusedGroupPage !== this.props.focusedGroupPage && focusedGroupQuery !== this.props.focusedGroupQuery) {
	        if (focusedGroupQuery) {
	          var matchingElements = Array.prototype.slice.call(document.querySelectorAll('.' + focusedGroupQuery.replace(/\s/g, '_').replace(/"/g, '') + '-' + focusedGroupPage));
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

	var _List = __webpack_require__(608);

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

	var _Block = __webpack_require__(610);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Query = function Query(_ref) {
	  var query = _ref.query;
	  var examples = _ref.examples;

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
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
	        _react2.default.createElement(_ExamplesBar2.default, {
	          query: query.query,
	          page: -1,
	          theme: 'accent2',
	          examples: examples.filter(function (e) {
	            return e.relevance === -1;
	          }) })
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

	  var classNames = [_Example2.default.Example, example.query.replace(/\s/g, '_').replace(/"/g, '') + '-' + example.relevance];
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

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(514);

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

/***/ 514:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Title":"Title__Title___17BuK","Title__text":"Title__Title__text___1TsHj"};

/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(516);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 564:
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

/***/ 565:
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

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(567);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(568);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(569);

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

/***/ 569:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(570);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(572);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(573);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 570:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(564);

	var _initialState = __webpack_require__(571);

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

/***/ 571:
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

/***/ 572:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(507);

	var _initialState = __webpack_require__(571);

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

/***/ 573:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(565);

	var _initialState = __webpack_require__(571);

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

/***/ 574:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 608:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _List = __webpack_require__(609);

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

/***/ 609:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"list":"List__list___2Ho-z","list__item":"List__list__item___Kvdr6"};

/***/ },

/***/ 610:
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

/***/ 611:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Summary = __webpack_require__(612);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Media = __webpack_require__(500);

	var _Media2 = _interopRequireDefault(_Media);

	var _Flex = __webpack_require__(502);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _ExamplesBar = __webpack_require__(503);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _Block = __webpack_require__(610);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Summary = function Summary(_ref) {
	  var queriesCount = _ref.queriesCount;
	  var examples = _ref.examples;

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
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
	        _react2.default.createElement(_ExamplesBar2.default, {
	          query: null,
	          page: -1,
	          theme: 'accent2',
	          examples: examples.filter(function (e) {
	            return e.relevance === -1;
	          }) })
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

/***/ 612:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Summary":"Summary__Summary___2vbQY","Summary__header":"Summary__Summary__header___1WvvM","Summary__body":"Summary__Summary__body___3F3-b","sHeader":"Summary__sHeader___3-LoW","sHeader__counter":"Summary__sHeader__counter___3Zgqn","sHeader__body":"Summary__sHeader__body___36EEB","sChart":"Summary__sChart___3IpWC","sChart__title":"Summary__sChart__title___2HV6I","sChart__canvas":"Summary__sChart__canvas___1w9nY"};

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2xheW91dHMvTGlzdC9MaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0cy9MaXN0L0xpc3QuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1N1bW1hcnkvU3VtbWFyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU3VtbWFyeS9TdW1tYXJ5LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBRdWVyeUxpc3QgZnJvbSAnLi4vUXVlcnlMaXN0J1xuaW1wb3J0IENvbGxlY3Rpb25WaWV3IGZyb20gJy4uL0NvbGxlY3Rpb25WaWV3J1xuaW1wb3J0IFN1bW1hcnkgZnJvbSAnLi4vU3VtbWFyeSdcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5LCBraWxsU3R1ZHl9IGZyb20gJy4uLy4uL3N0b3JlL3N0dWR5QWN0aW9ucydcblxuY29uc3Qgc2Nyb2xsVG8gPSAoZWxlbWVudCwgdG8sIGR1cmF0aW9uKSA9PiB7XG4gIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gdG8gLSBlbGVtZW50LnNjcm9sbFRvcFxuICAgIGNvbnN0IHBlclRpY2sgPSBkaWZmZXJlbmNlIC8gZHVyYXRpb24gKiAxMFxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wICsgcGVyVGlja1xuICAgICAgaWYgKChkaWZmZXJlbmNlID4gMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA8IHRvKSB8fFxuICAgICAgICAgIChkaWZmZXJlbmNlIDwgMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA+IHRvKSkge1xuICAgICAgICBzY3JvbGxUbyhlbGVtZW50LCB0bywgZHVyYXRpb24gLSAxMClcbiAgICAgIH1cbiAgICB9LCAxMClcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGNvbnN0IHtmb2N1c2VkR3JvdXBQYWdlLCBmb2N1c2VkR3JvdXBRdWVyeX0gPSBuZXdQcm9wc1xuXG4gICAgaWYgKGZvY3VzZWRHcm91cFBhZ2UgIT09IHRoaXMucHJvcHMuZm9jdXNlZEdyb3VwUGFnZSAmJiBmb2N1c2VkR3JvdXBRdWVyeSAhPT0gdGhpcy5wcm9wcy5mb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgICAgaWYgKGZvY3VzZWRHcm91cFF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtmb2N1c2VkR3JvdXBRdWVyeS5yZXBsYWNlKC9cXHMvZywgJ18nKS5yZXBsYWNlKC9cIi9nLCAnJyl9LSR7Zm9jdXNlZEdyb3VwUGFnZX1gKSlcbiAgICAgICAgY29uc3QgdG9wTWF0Y2hpbmdFbGVtZW50ID0gbWF0Y2hpbmdFbGVtZW50cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGEub2Zmc2V0VG9wIC0gYi5vZmZzZXRUb3BcbiAgICAgICAgfSlbMF1cblxuICAgICAgICBzY3JvbGxUbyh0aGlzLl9tYWluLCB0b3BNYXRjaGluZ0VsZW1lbnQub2Zmc2V0VG9wLCAyMDApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICBjb25zdCB7ZGlzcGF0Y2h9ID0gdGhpcy5wcm9wc1xuXG4gICAgc29ja2V0LmVtaXQoJ2dldCBzdHVkeScpXG5cbiAgICBzb2NrZXQub24oJ3N0dWR5JywgKGRhdGEpID0+IHtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVTdHVkeShkYXRhLnBhcnRpY2lwYW50SWQsIGRhdGEuc2Vzc2lvbklkLCBkYXRhLmNvbmRpdGlvbiwgZGF0YS50YXNrQWxpYXMpKVxuICAgICAgc29ja2V0LmVtaXQoJ2dldCBkYXRhJywge3Nlc3Npb25JZDogZGF0YS50cmFpbmluZyA/ICd0ZXN0JyA6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGtpbGwgc3R1ZHknLCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChraWxsU3R1ZHkoKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjb25kaXRpb259ID0gdGhpcy5wcm9wc1xuXG4gICAgbGV0IHNpZGViYXJFbCA9ICcnXG4gICAgaWYgKGNvbmRpdGlvbiA9PT0gJ3N5c3RlbScpIHtcbiAgICAgIHNpZGViYXJFbCA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRpbmd9PlxuICAgICAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29sbGVjdGlvbiBTdW1tYXJ5XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fc2VjdGlvbn0+XG4gICAgICAgICAgICA8U3VtbWFyeSAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19oZWFkaW5nfT5cbiAgICAgICAgICAgIDxUaXRsZSB0aXRsZT1cIlNlYXJjaCBIaXN0b3J5XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtzdHlsZXMuQXBwU2lkZWJhcl9fc2VjdGlvbn0gJHtzdHlsZXMuQXBwU2lkZWJhcl9fc2VjdGlvbl9mdWxsfWB9PlxuICAgICAgICAgICAgPFF1ZXJ5TGlzdCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHB9PlxuICAgICAgICB7c2lkZWJhckVsfVxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9eyhlbCkgPT4geyB0aGlzLl9tYWluID0gZWwgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5BcHBfX21haW59PlxuICAgICAgICAgIDxDb2xsZWN0aW9uVmlldyAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlc3Npb25JZDogc3RhdGUuc3R1ZHkuc2Vzc2lvbklkLFxuICAgICAgY29uZGl0aW9uOiBzdGF0ZS5zdHVkeS5jb25kaXRpb24sXG4gICAgICBmb2N1c2VkR3JvdXBQYWdlOiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBQYWdlLFxuICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFF1ZXJ5XG4gICAgfVxuICB9XG4pKEFwcClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0FwcC9BcHAuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiQXBwXCI6XCJBcHBfX0FwcF9fX2xCRVhJXCIsXCJBcHBfX21haW5cIjpcIkFwcF9fQXBwX19tYWluX19fMlZaamlcIixcIkFwcFNpZGViYXJcIjpcIkFwcF9fQXBwU2lkZWJhcl9fX3dYdkY0XCIsXCJBcHBTaWRlYmFyX19oZWFkaW5nXCI6XCJBcHBfX0FwcFNpZGViYXJfX2hlYWRpbmdfX19uWjMxbVwiLFwiQXBwU2lkZWJhcl9fc2VjdGlvblwiOlwiQXBwX19BcHBTaWRlYmFyX19zZWN0aW9uX19fUVp1Q0RcIixcIkFwcFNpZGViYXJfX3NlY3Rpb25fZnVsbFwiOlwiQXBwX19BcHBTaWRlYmFyX19zZWN0aW9uX2Z1bGxfX18yLU8tN1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeUxpc3QuY3NzJ1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL1F1ZXJ5J1xuaW1wb3J0IExpc3QgZnJvbSAnLi4vLi4vbGF5b3V0cy9MaXN0J1xuXG5jbGFzcyBRdWVyeUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtxdWVyaWVzfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8TGlzdFxuICAgICAgICBuPXsxLjV9XG4gICAgICAgIGl0ZW1zPXtxdWVyaWVzLm1hcCgocSwgaW5kZXgpID0+XG4gICAgICAgICAgICA8UXVlcnlcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgcXVlcnk9e3F9IC8+XG4gICAgICAgICl9IC8+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcmllczogWy4uLnN0YXRlLmRhdGEucXVlcmllc10uc29ydCgoYSwgYikgPT4gYi5leGFtcGxlc0NvdW50IC0gYS5leGFtcGxlc0NvdW50KVxuICAgIH1cbiAgfVxuKShRdWVyeUxpc3QpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlF1ZXJ5TGlzdFwiOlwiUXVlcnlMaXN0X19RdWVyeUxpc3RfX18ySGNnTFwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnlMaXN0L1F1ZXJ5TGlzdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeS5jc3MnXG5pbXBvcnQgTWVkaWEgZnJvbSAnLi4vLi4vbGF5b3V0cy9NZWRpYSdcbmltcG9ydCBGbGV4IGZyb20gJy4uLy4uL2xheW91dHMvRmxleCdcbmltcG9ydCBFeGFtcGxlc0JhciBmcm9tICcuLi9FeGFtcGxlc0JhcidcbmltcG9ydCBCbG9jayBmcm9tICcuLi8uLi9sYXlvdXRzL0Jsb2NrJ1xuXG5jb25zdCBRdWVyeSA9ICh7XG4gIHF1ZXJ5LFxuICBleGFtcGxlc1xufSkgPT4ge1xuICBsZXQgc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJzEwKycsXG4gICAgICBwYWdlOiAxMCxcbiAgICAgIGV4YW1wbGVzOiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gMTApXG4gICAgfVxuICBdXG4gIGZvciAobGV0IGkgPSA5OyBpID4gMDsgaS0tKSB7XG4gICAgc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IGAke2l9YCxcbiAgICAgICAgcGFnZTogaSxcbiAgICAgICAgZXhhbXBsZXM6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSBpKVxuICAgICAgfSxcbiAgICAgIC4uLnNlYXJjaFJlc3VsdHNDaGFydERhdGFcbiAgICBdXG4gIH1cblxuICBjb25zdCBzZWFyY2hSZXN1bHRzQ2hhcnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xQ2hhcnRfX3RpdGxlfT5TZWFyY2ggUmVzdWx0IFBhZ2VzPC9kaXY+XG5cbiAgICAgIDxCbG9jayBuPXswLjV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fY2FudmFzfT5cbiAgICAgICAgICB7c2VhcmNoUmVzdWx0c0NoYXJ0RGF0YS5tYXAoKHMsIGluZGV4KSA9PlxuICAgICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIHF1ZXJ5PXtxdWVyeS5xdWVyeX1cbiAgICAgICAgICAgICAgcGFnZT17cy5wYWdlfVxuICAgICAgICAgICAgICBsYWJlbD17cy5sYWJlbH1cbiAgICAgICAgICAgICAgZXhhbXBsZXM9e2V4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSBzLnBhZ2UpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9CbG9jaz5cbiAgICA8L2Rpdj5cbiAgKVxuXG4gIGNvbnN0IHJlbGF0ZWRJbWFnZXNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fdGl0bGV9PlJlbGF0ZWQgSW1hZ2VzPC9kaXY+XG5cbiAgICAgIDxCbG9jayBuPXswLjV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fY2FudmFzfT5cbiAgICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICAgIHF1ZXJ5PXtxdWVyeS5xdWVyeX1cbiAgICAgICAgICAgIHBhZ2U9ey0xfVxuICAgICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gLTEpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeV9faGVhZGVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xSGVhZGVyfT5cbiAgICAgICAgICA8RmxleFxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUhlYWRlcl9fcXVlcnl9PntxdWVyeS5xdWVyeX08L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xSGVhZGVyX19leGFtcGxlc0NvdW50fT57cXVlcnkuZXhhbXBsZXNDb3VudH0gZXhhbXBsZShzKTwvZGl2PlxuICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAge3F1ZXJ5LmV4YW1wbGVzQ291bnRcbiAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5X19ib2R5fT5cbiAgICAgICAgICA8TWVkaWFcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJzdHJldGNoXCJcbiAgICAgICAgICAgIGZpZ3VyZT17c2VhcmNoUmVzdWx0c0NoYXJ0fVxuICAgICAgICAgICAgYm9keT17cmVsYXRlZEltYWdlc0NoYXJ0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgOiAnJ1xuICAgICAgfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhhbXBsZXM6IHN0YXRlLmRhdGEuZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5xdWVyeSA9PT0gb3duUHJvcHMucXVlcnkucXVlcnkpXG4gICAgfVxuICB9XG4pKFF1ZXJ5KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlcIjpcIlF1ZXJ5X19RdWVyeV9fXzMyeVZQXCIsXCJRdWVyeV9faGVhZGVyXCI6XCJRdWVyeV9fUXVlcnlfX2hlYWRlcl9fX19DTVJnXCIsXCJRdWVyeV9fYm9keVwiOlwiUXVlcnlfX1F1ZXJ5X19ib2R5X19fM3dqTFhcIixcInFIZWFkZXJcIjpcIlF1ZXJ5X19xSGVhZGVyX19fMXZIOEhcIixcInFIZWFkZXJfX3F1ZXJ5XCI6XCJRdWVyeV9fcUhlYWRlcl9fcXVlcnlfX19BbmVWaFwiLFwicUhlYWRlcl9fZXhhbXBsZXNDb3VudFwiOlwiUXVlcnlfX3FIZWFkZXJfX2V4YW1wbGVzQ291bnRfX18xeF9TWFwiLFwicUNoYXJ0XCI6XCJRdWVyeV9fcUNoYXJ0X19fRWpOVjZcIixcInFDaGFydF9fdGl0bGVcIjpcIlF1ZXJ5X19xQ2hhcnRfX3RpdGxlX19faE5fdG9cIixcInFDaGFydF9fY2FudmFzXCI6XCJRdWVyeV9fcUNoYXJ0X19jYW52YXNfX18xa25JcFwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzXG4gKiogbW9kdWxlIGlkID0gNDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IGJhc2VsaW5lID0gMC43NTBcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9NZWRpYS5jc3MnXG5cbmNvbnN0IE1lZGlhQm9keSA9ICh7XG4gIGNvbnRlbnRcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1lZGlhX19ib2R5fT5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApXG59XG5cbmNvbnN0IE1lZGlhRmlndXJlID0gKHtcbiAgbixcbiAgY29udGVudCxcbiAgcmV2ZXJzZSA9IGZhbHNlXG59KSA9PiB7XG4gIGxldCBzdHlsZSA9IHt9XG4gIGlmIChyZXZlcnNlKSB7XG4gICAgc3R5bGUubWFyZ2luTGVmdCA9IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH0gZWxzZSB7XG4gICAgc3R5bGUubWFyZ2luUmlnaHQgPSBgJHtiYXNlbGluZSAqIG59cmVtYFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubWVkaWFfX2ZpZ3VyZX0+XG4gICAgICB7Y29udGVudH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5jb25zdCBNZWRpYSA9ICh7XG4gIGZpZ3VyZSxcbiAgYm9keSxcbiAgbiA9IDEsXG4gIHJldmVyc2UgPSBmYWxzZSxcbiAgYWxpZ25JdGVtcyA9ICdmbGV4LXN0YXJ0J1xufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBhbGlnbkl0ZW1zXG4gIH1cblxuICBjb25zdCBmaWd1cmVFbGVtZW50ID0gKFxuICAgIDxNZWRpYUZpZ3VyZVxuICAgICAgY29udGVudD17ZmlndXJlfVxuICAgICAgcmV2ZXJzZT17cmV2ZXJzZX1cbiAgICAgIG49e259IC8+XG4gIClcblxuICBjb25zdCBib2R5RWxlbWVudCA9IChcbiAgICA8TWVkaWFCb2R5XG4gICAgICBjb250ZW50PXtib2R5fSAvPlxuICApXG5cbiAgaWYgKHJldmVyc2UpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17c3R5bGVzLm1lZGlhfT5cbiAgICAgICAge2JvZHlFbGVtZW50fVxuICAgICAgICB7ZmlndXJlRWxlbWVudH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17c3R5bGVzLm1lZGlhfT5cbiAgICAgICAge2ZpZ3VyZUVsZW1lbnR9XG4gICAgICAgIHtib2R5RWxlbWVudH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wibWVkaWFcIjpcIk1lZGlhX19tZWRpYV9fXzlFQWloXCIsXCJtZWRpYV9fZmlndXJlXCI6XCJNZWRpYV9fbWVkaWFfX2ZpZ3VyZV9fXzFtc2FHXCIsXCJtZWRpYV9fYm9keVwiOlwiTWVkaWFfX21lZGlhX19ib2R5X19fMVZaZk1cIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9sYXlvdXRzL01lZGlhL01lZGlhLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBGbGV4ID0gKHtcbiAgZmxleERpcmVjdGlvbiA9ICdyb3cnLFxuICBqdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0JyxcbiAgYWxpZ25JdGVtcyA9ICdjZW50ZXInLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBmbGV4RGlyZWN0aW9uLFxuICAgIGFsaWduSXRlbXMsXG4gICAganVzdGlmeUNvbnRlbnQsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJSdcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsZXhcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0ZsZXgvRmxleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZXNCYXIuY3NzJ1xuaW1wb3J0IEV4YW1wbGVzQmFySXRlbSBmcm9tICcuLi9FeGFtcGxlc0Jhckl0ZW0nXG5pbXBvcnQge3RvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwfSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IEV4YW1wbGVzQmFyID0gKHtcbiAgZXhhbXBsZXMsXG4gIHF1ZXJ5LFxuICBwYWdlLFxuICBsYWJlbCA9ICcnLFxuICBmb2N1c2VkR3JvdXBQYWdlLFxuICBmb2N1c2VkR3JvdXBRdWVyeSxcbiAgdG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXBcbn0pID0+IHtcbiAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGVzQmFyXVxuICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkgIT09IHF1ZXJ5IHx8IGZvY3VzZWRHcm91cFBhZ2UgIT09IHBhZ2UpIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZXNCYXJfZGltbWVkKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25DbGljaz17dG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXB9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIHtleGFtcGxlcy5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICA8RXhhbXBsZXNCYXJJdGVtXG4gICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICBleGFtcGxlPXtlfSAvPlxuICAgICAgKX1cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlc0Jhcl9fbGFiZWx9PntsYWJlbH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFBhZ2UsXG4gICAgICBmb2N1c2VkR3JvdXBRdWVyeTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUXVlcnlcbiAgICB9XG4gIH0sXG4gIChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXA6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXAob3duUHJvcHMucXVlcnksIG93blByb3BzLnBhZ2UpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlc0JhcilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGVzQmFyL0V4YW1wbGVzQmFyLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVzQmFyXCI6XCJFeGFtcGxlc0Jhcl9fRXhhbXBsZXNCYXJfX18yQmE4LVwiLFwiRXhhbXBsZXNCYXJfX2xhYmVsXCI6XCJFeGFtcGxlc0Jhcl9fRXhhbXBsZXNCYXJfX2xhYmVsX19fMTRDbDFcIixcIkV4YW1wbGVzQmFyX2RpbW1lZFwiOlwiRXhhbXBsZXNCYXJfX0V4YW1wbGVzQmFyX2RpbW1lZF9fXzFuRkVCXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlc0Jhckl0ZW0uY3NzJ1xuaW1wb3J0IHtoaWdobGlnaHRFeGFtcGxlfSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IEV4YW1wbGVzQmFySXRlbSA9ICh7XG4gIGV4YW1wbGUsXG4gIGhpZ2hsaWdodGVkRXhhbXBsZUlkLFxuICBoaWdobGlnaHRFeGFtcGxlLFxuICBkaW1FeGFtcGxlXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25Nb3VzZUVudGVyPXtoaWdobGlnaHRFeGFtcGxlfVxuICAgICAgb25Nb3VzZUxlYXZlPXtkaW1FeGFtcGxlfVxuICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuRXhhbXBsZXNCYXJJdGVtfSAke2hpZ2hsaWdodGVkRXhhbXBsZUlkID09PSBleGFtcGxlLl9pZCA/IHN0eWxlcy5FeGFtcGxlc0Jhckl0ZW1faGlnaGxpZ2h0ZWQgOiAnJ31gfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IHN0YXRlLnVpLmhpZ2hsaWdodGVkRXhhbXBsZUlkXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZ2hsaWdodEV4YW1wbGU6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goaGlnaGxpZ2h0RXhhbXBsZShvd25Qcm9wcy5leGFtcGxlLl9pZCkpXG4gICAgICB9LFxuICAgICAgZGltRXhhbXBsZTogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChoaWdobGlnaHRFeGFtcGxlKG51bGwpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlc0Jhckl0ZW0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVzQmFySXRlbVwiOlwiRXhhbXBsZXNCYXJJdGVtX19FeGFtcGxlc0Jhckl0ZW1fX19LMEdFY1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXJJdGVtL0V4YW1wbGVzQmFySXRlbS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBjb25zdCBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCA9ICdUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCdcbmV4cG9ydCBjb25zdCBISUdITElHSFRfRVhBTVBMRSA9ICdISUdITElHSFRfRVhBTVBMRSdcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodEV4YW1wbGUgPSAoaWQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBISUdITElHSFRfRVhBTVBMRSxcbiAgICBpZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGb2N1c0V4YW1wbGVHcm91cCA9IChxdWVyeSwgcGFnZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQLFxuICAgIHF1ZXJ5LFxuICAgIHBhZ2VcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3VpQWN0aW9ucy5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcblxuY29uc3QgQ29sbGVjdGlvblZpZXcgPSAoe1xuICBleGFtcGxlc1xufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxFeGFtcGxlTGlzdFxuICAgICAgbkNvbHM9ezV9XG4gICAgICBleGFtcGxlcz17ZXhhbXBsZXN9IC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogWy4uLnN0YXRlLmRhdGEuZXhhbXBsZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGIuY3JlYXRlZEF0ID4gYS5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgfSBlbHNlIGlmIChhLmNyZWF0ZWRBdCA+PSBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4pKENvbGxlY3Rpb25WaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZUxpc3QuY3NzJ1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi4vRXhhbXBsZSdcblxuY2xhc3MgRXhhbXBsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtleGFtcGxlcywgbkNvbHN9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQ29sczsgaSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBleGFtcGxlcy5maWx0ZXIoKGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRleCAlIG5Db2xzID09PSBpXG4gICAgICB9KVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKVxuICAgIH1cblxuICAgIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlTGlzdF1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgICB7Y29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fY29sdW1ufT5cbiAgICAgICAgICAgIHtjb2x1bW4ubWFwKChleGFtcGxlLCBqKSA9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19leGFtcGxlfT5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgY29tcGFjdD17bkNvbHMgPiA1fVxuICAgICAgICAgICAgICAgICAgZXhhbXBsZT17ZXhhbXBsZX0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfTwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlTGlzdFwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19fNzRKYzNcIixcIkV4YW1wbGVMaXN0X19jb2x1bW5cIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fY29sdW1uX19fM0Z6a1dcIixcIkV4YW1wbGVMaXN0X19leGFtcGxlXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2V4YW1wbGVfX18zZWpMX1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZS5jc3MnXG5cbmNvbnN0IEV4YW1wbGUgPSAoe1xuICBleGFtcGxlLFxuICBmb2N1c2VkR3JvdXBQYWdlLFxuICBmb2N1c2VkR3JvdXBRdWVyeSxcbiAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWRcbn0pID0+IHtcbiAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGUsIGAke2V4YW1wbGUucXVlcnkucmVwbGFjZSgvXFxzL2csICdfJykucmVwbGFjZSgvXCIvZywgJycpfS0ke2V4YW1wbGUucmVsZXZhbmNlfWBdXG4gIGlmIChmb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgIGlmIChmb2N1c2VkR3JvdXBRdWVyeSAhPT0gZXhhbXBsZS5xdWVyeSB8fCBmb2N1c2VkR3JvdXBQYWdlICE9PSBleGFtcGxlLnJlbGV2YW5jZSkge1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlX2RpbW1lZClcbiAgICB9XG4gIH1cblxuICBpZiAoaGlnaGxpZ2h0ZWRFeGFtcGxlSWQgPT09IGV4YW1wbGUuX2lkKSB7XG4gICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlX2hpZ2hsaWdodGVkKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBpZD17ZXhhbXBsZS5faWR9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9faW1hZ2VXcmFwcGVyfT5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2ltYWdlfVxuICAgICAgICAgIHNyYz17ZXhhbXBsZS5leGFtcGxlLnNyY30gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2Rlc2NyaXB0aW9uT3ZlcmxheX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9fZGVzY3JpcHRpb259PlxuICAgICAgICAgIHtleGFtcGxlLmltYWdlRGVzY3JpcHRpb259XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkR3JvdXBQYWdlOiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBQYWdlLFxuICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFF1ZXJ5LFxuICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IHN0YXRlLnVpLmhpZ2hsaWdodGVkRXhhbXBsZUlkXG4gICAgfVxuICB9XG4pKEV4YW1wbGUpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZVwiOlwiRXhhbXBsZV9fRXhhbXBsZV9fXzI3UzBpXCIsXCJFeGFtcGxlX19pbWFnZVdyYXBwZXJcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlV3JhcHBlcl9fXzFMLXo1XCIsXCJFeGFtcGxlX19pbWFnZVwiOlwiRXhhbXBsZV9fRXhhbXBsZV9faW1hZ2VfX18zWWQ2MVwiLFwiRXhhbXBsZV9fZGVzY3JpcHRpb25PdmVybGF5XCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbk92ZXJsYXlfX18yVXpDM1wiLFwiRXhhbXBsZV9fZGVzY3JpcHRpb25cIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2Rlc2NyaXB0aW9uX19fMVJXaHJcIixcIkV4YW1wbGVfZGltbWVkXCI6XCJFeGFtcGxlX19FeGFtcGxlX2RpbW1lZF9fXzJzVGZZXCIsXCJFeGFtcGxlX2hpZ2hsaWdodGVkXCI6XCJFeGFtcGxlX19FeGFtcGxlX2hpZ2hsaWdodGVkX19fQktnMldcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1RpdGxlLmNzcydcblxuY29uc3QgVGl0bGUgPSAoe1xuICB0aXRsZVxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGl0bGV9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaXRsZV9fdGV4dH0+e3RpdGxlfTwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJUaXRsZVwiOlwiVGl0bGVfX1RpdGxlX19fMTdCdUtcIixcIlRpdGxlX190ZXh0XCI6XCJUaXRsZV9fVGl0bGVfX3RleHRfX18xVHNIalwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCdcblxuY29uc3Qgc29ja2V0ID0gaW8oJ2h0dHBzOi8vdmR6aXViYWsuY29tLycsIHtwYXRoOiAnL2Rlc2lnbkZpeGF0aW9uU2VydmVyJ30pXG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3NvY2tldC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX0RBVEEgPSAnUkVDRUlWRV9EQVRBJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfRVhBTVBMRSA9ICdSRUNFSVZFX0VYQU1QTEUnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWSA9ICdSRUNFSVZFX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IElOQ19FWEFNUExFX0NPVU5URVIgPSAnSU5DX0VYQU1QTEVfQ09VTlRFUidcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVFeGFtcGxlID0gKGV4YW1wbGUpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhleGFtcGxlKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IElOQ19FWEFNUExFX0NPVU5URVIsXG4gICAgICBxdWVyeTogZXhhbXBsZS5xdWVyeVxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0VYQU1QTEUsXG4gICAgICBleGFtcGxlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVF1ZXJ5ID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWSxcbiAgICAgIHF1ZXJ5OiBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwge1xuICAgICAgICBleGFtcGxlc0NvdW50OiAwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVEYXRhID0gKHF1ZXJpZXMsIGV4YW1wbGVzKSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgZW5oYW5jZWRRdWVyaWVzID0gcXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICBleGFtcGxlc0NvdW50OiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBxLnF1ZXJ5KS5sZW5ndGhcbiAgICB9KSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfREFUQSxcbiAgICAgIHF1ZXJpZXM6IGVuaGFuY2VkUXVlcmllcyxcbiAgICAgIGV4YW1wbGVzXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFBY3Rpb25zLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IFJFQ0VJVkVfU1RVRFkgPSAnUkVDRUlWRV9TVFVEWSdcbmV4cG9ydCBjb25zdCBLSUxMX1NUVURZID0gJ0tJTExfU1RVRFknXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlU3R1ZHkgPSAoXG4gIHBhcnRpY2lwYW50SWQsXG4gIHNlc3Npb25JZCxcbiAgY29uZGl0aW9uLFxuICB0YXNrQWxpYXNcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFJFQ0VJVkVfU1RVRFksXG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBzZXNzaW9uSWQsXG4gICAgY29uZGl0aW9uLFxuICAgIHRhc2tBbGlhc1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBraWxsU3R1ZHkgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogS0lMTF9TVFVEWVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCdcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuL3Jvb3RSZWR1Y2VyJ1xuXG5jb25zdCBtaWRkbGV3YXJlID0gW3RodW5rTWlkZGxld2FyZV1cblxuLy8gaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4vLyAgIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcigpXG4vLyAgIG1pZGRsZXdhcmUucHVzaChsb2dnZXIpXG4vLyB9XG5cbmNvbnN0IGNvbmZpZ3VyZVN0b3JlID0gKGluaXRpYWxTdGF0ZSkgPT4ge1xuICByZXR1cm4gY3JlYXRlU3RvcmUoXG4gICAgcm9vdFJlZHVjZXIsXG4gICAgaW5pdGlhbFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3RvcmUuanNcbiAqKi8iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGFSZWR1Y2VyJ1xuaW1wb3J0IHVpIGZyb20gJy4vdWlSZWR1Y2VyJ1xuaW1wb3J0IHN0dWR5IGZyb20gJy4vc3R1ZHlSZWR1Y2VyJ1xuXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGRhdGEsXG4gIHVpLFxuICBzdHVkeVxufSlcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9yb290UmVkdWNlci5qc1xuICoqLyIsImltcG9ydCB7XG4gIFJFQ0VJVkVfREFUQSxcbiAgUkVDRUlWRV9FWEFNUExFLFxuICBSRUNFSVZFX1FVRVJZLFxuICBJTkNfRVhBTVBMRV9DT1VOVEVSXG59IGZyb20gJy4vZGF0YUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCBkYXRhID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5kYXRhLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX0RBVEE6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogYWN0aW9uLnF1ZXJpZXMsXG4gICAgICAgIGV4YW1wbGVzOiBhY3Rpb24uZXhhbXBsZXNcbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5leGFtcGxlcyxcbiAgICAgICAgICBhY3Rpb24uZXhhbXBsZVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUucXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIElOQ19FWEFNUExFX0NPVU5URVI6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgZXhhbXBsZXNDb3VudDogcS5leGFtcGxlc0NvdW50ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvZGF0YVJlZHVjZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IHtcbiAgICBxdWVyaWVzOiBbXSxcbiAgICBleGFtcGxlczogW11cbiAgfSxcbiAgdWk6IHtcbiAgICBmb2N1c2VkR3JvdXBQYWdlOiBudWxsLFxuICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBudWxsLFxuICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBudWxsXG4gIH0sXG4gIHN0dWR5OiB7XG4gICAgcGFydGljaXBhbnRJZDogJycsXG4gICAgc2Vzc2lvbklkOiBudWxsLFxuICAgIGNvbmRpdGlvbjogJ2Jhc2VsaW5lJyxcbiAgICB0YXNrQWxpYXM6ICcnXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9pbml0aWFsU3RhdGUuanNcbiAqKi8iLCJpbXBvcnQge1xuICBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCxcbiAgSElHSExJR0hUX0VYQU1QTEVcbn0gZnJvbSAnLi91aUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCB1aSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUudWksXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQOlxuICAgICAgaWYgKGFjdGlvbi5wYWdlID09PSBzdGF0ZS5mb2N1c2VkR3JvdXBQYWdlICYmIGFjdGlvbi5xdWVyeSA9PT0gc3RhdGUuZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogbnVsbCxcbiAgICAgICAgICBmb2N1c2VkR3JvdXBRdWVyeTogbnVsbFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogYWN0aW9uLnBhZ2UsXG4gICAgICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IGFjdGlvbi5xdWVyeVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIGNhc2UgSElHSExJR0hUX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IGFjdGlvbi5pZFxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aVJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfU1RVRFksIEtJTExfU1RVRFl9IGZyb20gJy4vc3R1ZHlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3Qgc3R1ZHkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnN0dWR5LFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX1NUVURZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IGFjdGlvbi5wYXJ0aWNpcGFudElkLFxuICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5zZXNzaW9uSWQsXG4gICAgICAgIGNvbmRpdGlvbjogYWN0aW9uLmNvbmRpdGlvbixcbiAgICAgICAgdGFza0FsaWFzOiBhY3Rpb24udGFza0FsaWFzXG4gICAgICB9KVxuICAgIGNhc2UgS0lMTF9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWR5XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlSZWR1Y2VyLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0eWxlcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1NzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYmFzZWxpbmUgPSAwLjc1MFxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0xpc3QuY3NzJ1xuXG5jb25zdCBMaXN0SXRlbSA9ICh7XG4gIG4gPSAxLFxuICBpdGVtXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIG1hcmdpbkJvdHRvbTogYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGxpIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubGlzdF9faXRlbX0+XG4gICAgICB7aXRlbX1cbiAgICA8L2xpPlxuICApXG59XG5cbmNvbnN0IExpc3QgPSAoe1xuICBpdGVtcyxcbiAgbiA9IDEsXG4gIGFsaWduSXRlbXMgPSAnZmxleC1zdGFydCcsXG4gIGp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIG1hcmdpbkJvdHRvbTogYC0ke2Jhc2VsaW5lICogbn1yZW1gLFxuICAgIGFsaWduSXRlbXMsXG4gICAganVzdGlmeUNvbnRlbnRcbiAgfVxuXG4gIGNvbnN0IGxpc3RJdGVtcyA9IGl0ZW1zLm1hcCgoaSwgaW5kZXgpID0+XG4gICAgPExpc3RJdGVtIGtleT17aW5kZXh9IGl0ZW09e2l9IG49e259IC8+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDx1bCBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17c3R5bGVzLmxpc3R9PlxuICAgICAge2xpc3RJdGVtc31cbiAgICA8L3VsPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0xpc3QvTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJsaXN0XCI6XCJMaXN0X19saXN0X19fMkhvLXpcIixcImxpc3RfX2l0ZW1cIjpcIkxpc3RfX2xpc3RfX2l0ZW1fX19LdmRyNlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2xheW91dHMvTGlzdC9MaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDYwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5cbmNvbnN0IEJsb2NrID0gKHtcbiAgbiA9IDEsXG4gIGV4dHJhQ2xhc3NOYW1lcyA9ICcnLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2V4dHJhQ2xhc3NOYW1lc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2tcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9TdW1tYXJ5LmNzcydcbmltcG9ydCBNZWRpYSBmcm9tICcuLi8uLi9sYXlvdXRzL01lZGlhJ1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vLi4vbGF5b3V0cy9GbGV4J1xuaW1wb3J0IEV4YW1wbGVzQmFyIGZyb20gJy4uL0V4YW1wbGVzQmFyJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNvbnN0IFN1bW1hcnkgPSAoe1xuICBxdWVyaWVzQ291bnQsXG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIGxldCBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnMTArJyxcbiAgICAgIHBhZ2U6IDEwLFxuICAgICAgZXhhbXBsZXM6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAxMClcbiAgICB9XG4gIF1cbiAgZm9yIChsZXQgaSA9IDk7IGkgPiAwOyBpLS0pIHtcbiAgICBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgICAge1xuICAgICAgICBsYWJlbDogYCR7aX1gLFxuICAgICAgICBwYWdlOiBpLFxuICAgICAgICBleGFtcGxlczogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IGkpXG4gICAgICB9LFxuICAgICAgLi4uc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFJlc3VsdHNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNDaGFydF9fdGl0bGV9PlNlYXJjaCBSZXN1bHQgUGFnZXM8L2Rpdj5cblxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0NoYXJ0X19jYW52YXN9PlxuICAgICAgICAgIHtzZWFyY2hSZXN1bHRzQ2hhcnREYXRhLm1hcCgocywgaW5kZXgpID0+XG4gICAgICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgcXVlcnk9e251bGx9XG4gICAgICAgICAgICAgIHBhZ2U9e3MucGFnZX1cbiAgICAgICAgICAgICAgbGFiZWw9e3MubGFiZWx9XG4gICAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gcy5wYWdlKX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICBjb25zdCByZWxhdGVkSW1hZ2VzQ2hhcnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnRfX3RpdGxlfT5SZWxhdGVkIEltYWdlczwvZGl2PlxuXG4gICAgICA8QmxvY2sgbj17MC41fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnRfX2NhbnZhc30+XG4gICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICBxdWVyeT17bnVsbH1cbiAgICAgICAgICAgIHBhZ2U9ey0xfVxuICAgICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gLTEpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU3VtbWFyeX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlN1bW1hcnlfX2hlYWRlcn0+XG4gICAgICAgIDxGbGV4XG4gICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJ9PlxuICAgICAgICAgICAgPE1lZGlhXG4gICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICBmaWd1cmU9ezxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0hlYWRlcl9fY291bnRlcn0+e3F1ZXJpZXNDb3VudH08L2Rpdj59XG4gICAgICAgICAgICAgIGJvZHk9ezxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0hlYWRlcl9fYm9keX0+c2VhcmNoIHF1ZXJpZXM8L2Rpdj59IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zSGVhZGVyfT5cbiAgICAgICAgICAgIDxNZWRpYVxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgZmlndXJlPXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2NvdW50ZXJ9PntleGFtcGxlcy5sZW5ndGh9PC9kaXY+fVxuICAgICAgICAgICAgICBib2R5PXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2JvZHl9PmV4YW1wbGVzIGNvbGxlY3RlZDwvZGl2Pn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbGV4PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU3VtbWFyeV9fYm9keX0+XG4gICAgICAgIDxNZWRpYVxuICAgICAgICAgIGFsaWduSXRlbXM9XCJzdHJldGNoXCJcbiAgICAgICAgICBmaWd1cmU9e3NlYXJjaFJlc3VsdHNDaGFydH1cbiAgICAgICAgICBib2R5PXtyZWxhdGVkSW1hZ2VzQ2hhcnR9IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJpZXNDb3VudDogc3RhdGUuZGF0YS5xdWVyaWVzLmxlbmd0aCxcbiAgICAgIGV4YW1wbGVzOiBzdGF0ZS5kYXRhLmV4YW1wbGVzXG4gICAgfVxuICB9XG4pKFN1bW1hcnkpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9TdW1tYXJ5L1N1bW1hcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiU3VtbWFyeVwiOlwiU3VtbWFyeV9fU3VtbWFyeV9fXzJ2YlFZXCIsXCJTdW1tYXJ5X19oZWFkZXJcIjpcIlN1bW1hcnlfX1N1bW1hcnlfX2hlYWRlcl9fXzFXdnZNXCIsXCJTdW1tYXJ5X19ib2R5XCI6XCJTdW1tYXJ5X19TdW1tYXJ5X19ib2R5X19fM0YzLWJcIixcInNIZWFkZXJcIjpcIlN1bW1hcnlfX3NIZWFkZXJfX18zLUxvV1wiLFwic0hlYWRlcl9fY291bnRlclwiOlwiU3VtbWFyeV9fc0hlYWRlcl9fY291bnRlcl9fXzNaZ3FuXCIsXCJzSGVhZGVyX19ib2R5XCI6XCJTdW1tYXJ5X19zSGVhZGVyX19ib2R5X19fMzZFRUJcIixcInNDaGFydFwiOlwiU3VtbWFyeV9fc0NoYXJ0X19fM0lwV0NcIixcInNDaGFydF9fdGl0bGVcIjpcIlN1bW1hcnlfX3NDaGFydF9fdGl0bGVfX18ySFY2SVwiLFwic0NoYXJ0X19jYW52YXNcIjpcIlN1bW1hcnlfX3NDaGFydF9fY2FudmFzX19fMXc5bllcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1N1bW1hcnkvU3VtbWFyeS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2MTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQWJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFIQTtBQUhBO0FBVUE7Ozs7QUFoRkE7QUFDQTtBQWtGQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7Ozs7O0FDdkhBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BOzs7O0FBYkE7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDNUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUhBO0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFWQTtBQUNBO0FBT0E7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFEQTtBQURBO0FBSEE7QUFDQTtBQWlCQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQURBO0FBSEE7QUFDQTtBQWNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFEQTtBQURBO0FBWUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQWRBO0FBd0JBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTs7Ozs7OztBQ2xHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7QUFGQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7OztBQ25EQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7Ozs7Ozs7QUNuQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFHQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBO0FBSEE7QUFEQTtBQURBO0FBaUJBOzs7O0FBakNBO0FBQ0E7QUFtQ0E7Ozs7Ozs7QUN6Q0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFUQTtBQWdCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7QUNoREE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFLQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQWpDQTtBQW1DQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBVkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFHQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFsQkE7QUFvQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7Ozs7Ozs7O0FDdkJBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7QUFGQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7O0FDMUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBSEE7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQVZBO0FBQ0E7QUFPQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFOQTtBQURBO0FBREE7QUFIQTtBQUNBO0FBaUJBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUxBO0FBREE7QUFIQTtBQUNBO0FBY0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFUQTtBQURBO0FBbUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFwQkE7QUE0QkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTs7Ozs7OztBQ3ZHQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==